// 支付 provider 接缝 —— Phase 2「先搭框架不接真渠道」的核心。
//
// 现有 provider：MockProvider（开发）、StripeProvider（海外）、
// XunhuPayProvider / XorPayProvider（国内聚合，接支付宝/微信，二选一）。
// 再接新渠道时：
//   1) 新建一个实现 PaymentProvider 的 class，createCharge 调真下单接口返回收银台 url/二维码，
//      verifyCallback 做签名校验；
//   2) 在 getPaymentProvider() 的 switch 里加一个 case；
//   3) 配环境变量（PAYMENT_PROVIDER=<渠道> + 该渠道的 APPID/SECRET/GATEWAY + NEXT_PUBLIC_SITE_URL）。
// 下单/回调/开通的业务代码完全不用动。

import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import Stripe from 'stripe';
import type { Tier } from '@/lib/membership-benefits';

export interface CreateChargeInput {
  orderId: string;
  outTradeNo: string;
  tier: Tier;
  amount: number;   // 分
  userId: string;
  subject: string;  // 如「兔莉年度会员」
  recurring?: { interval: 'month' | 'year' };  // 海外站月/年付订阅模式
}

export interface CreateChargeResult {
  checkoutUrl: string;  // 跳转的收银台地址（mock=内部页；真渠道=网关二维码页）
  qrData?: string;      // 可选二维码内容
}

export interface VerifyResult {
  ok: boolean;
  outTradeNo: string;
  orderId?: string;     // mock 直接带 orderId；真渠道用 outTradeNo 反查
  amount?: number;      // 分，真渠道回传的实付金额（用于校验）
  rawPayload: string;   // 原始回调内容，落 orders.raw_callback 备查
  // 订阅事件字段
  eventType?: string;            // 'checkout.session.completed' | 'invoice.paid' | 'customer.subscription.deleted' | 'invoice.payment_failed'
  subscriptionId?: string;       // Stripe subscription ID
  stripeCustomerId?: string;     // Stripe customer ID
  currentPeriodEnd?: number;     // 当前订阅周期结束时间戳（ms）
}

export interface PaymentProvider {
  readonly channel: string;   // 'mock' | 'hupijiao' | 'wechat' | ...
  createCharge(input: CreateChargeInput): Promise<CreateChargeResult>;
  verifyCallback(req: Request): Promise<VerifyResult>;
  successResponse(): Response;  // 回给网关的 ACK（mock 用 json ok）
}

// ── MockProvider：内部收银台页 + 恒成功回调 ──
class MockProvider implements PaymentProvider {
  readonly channel = 'mock';

  async createCharge(input: CreateChargeInput): Promise<CreateChargeResult> {
    // 跳到内部模拟收银台页，页面上点「我已支付」再打回调
    return { checkoutUrl: `/membership/checkout/${input.orderId}` };
  }

  async verifyCallback(req: Request): Promise<VerifyResult> {
    // mock 回调由收银台页发起，body 带 { orderId }。恒判成功。
    let body: { orderId?: unknown; outTradeNo?: unknown } = {};
    try { body = await req.json(); } catch { /* 空 body */ }
    const orderId = typeof body.orderId === 'string' ? body.orderId : undefined;
    const outTradeNo = typeof body.outTradeNo === 'string' ? body.outTradeNo : '';
    return {
      ok: true,
      orderId,
      outTradeNo,
      rawPayload: JSON.stringify({ mock: true, orderId, outTradeNo, at: Date.now() }),
    };
  }

  successResponse(): Response {
    return NextResponse.json({ ok: true });
  }
}

// ── StripeProvider：海外站一次性买断（mode: 'payment'）──
// 月/年/永久都按买断计费，到期回落 free（续费=再买一次），不用 Stripe 订阅。
// createCharge 用 price_data 动态传金额，不依赖后台预建产品。
// verifyCallback 验 webhook 签名，只认 checkout.session.completed。
class StripeProvider implements PaymentProvider {
  readonly channel = 'stripe';
  private stripe: Stripe;
  private webhookSecret: string;

  constructor() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY 未配置');
    this.stripe = new Stripe(key);
    this.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  }

  async createCharge(input: CreateChargeInput): Promise<CreateChargeResult> {
    const base = process.env.NEXT_PUBLIC_SITE_URL || '';
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      quantity: 1,
      price_data: {
        currency: 'usd',
        unit_amount: input.amount,
        product_data: { name: input.subject },
        ...(input.recurring ? { recurring: { interval: input.recurring.interval } } : {}),
      },
    };
    const session = await this.stripe.checkout.sessions.create({
      mode: input.recurring ? 'subscription' : 'payment',
      managed_payments: { enabled: false },
      line_items: [lineItem],
      metadata: { outTradeNo: input.outTradeNo, orderId: input.orderId, userId: input.userId },
      success_url: `${base}/membership/success?order=${input.orderId}`,
      cancel_url: `${base}/membership`,
      ...(input.recurring ? { subscription_data: { metadata: { outTradeNo: input.outTradeNo, orderId: input.orderId, userId: input.userId } } } : {}),
    });
    if (!session.url) throw new Error('Stripe 未返回 checkout url');
    return { checkoutUrl: session.url };
  }

  async verifyCallback(req: Request): Promise<VerifyResult> {
    const sig = req.headers.get('stripe-signature') || '';
    const raw = await req.text();
    let event: Stripe.Event;
    try {
      event = await this.stripe.webhooks.constructEventAsync(raw, sig, this.webhookSecret);
    } catch {
      return { ok: false, outTradeNo: '', rawPayload: raw };
    }

    // checkout.session.completed — 首次购买（无论 payment 还是 subscription 模式）
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const outTradeNo = (session.metadata?.outTradeNo as string) || '';
      // 首次订阅需拿到 current_period_end：session.subscription 是 ID 字符串，
      // 需要展开 subscription 对象才能拿到。不走额外 API 调用，用 lines 回退。
      let periodEnd: number | undefined;
      if (session.mode === 'subscription' && session.subscription) {
        // 用 Stripe API 取订阅的 current_period_end（一次额外调用保证数据正确）
        try {
          const sub = await this.stripe.subscriptions.retrieve(
            typeof session.subscription === 'string' ? session.subscription : session.subscription.id,
          );
          periodEnd = (sub as any).current_period_end ? (sub as any).current_period_end * 1000 : undefined;
        } catch { /* 获取失败不影响主流程 */ }
      }
      return {
        ok: session.payment_status === 'paid' && !!outTradeNo,
        outTradeNo,
        amount: session.amount_total ?? undefined,
        rawPayload: raw,
        eventType: event.type,
        subscriptionId: typeof session.subscription === 'string' ? session.subscription : undefined,
        stripeCustomerId: typeof session.customer === 'string' ? session.customer : undefined,
        currentPeriodEnd: periodEnd,
      };
    }

    // invoice.paid — 订阅续费（跳过首次订阅的 subscription_create 账单，避免与 checkout.session.completed 重复激活）
    if (event.type === 'invoice.paid') {
      const invoice = event.data.object as Stripe.Invoice;
      // billing_reason === 'subscription_create' 是首次订阅的账单，由 checkout.session.completed 处理
      if ((invoice as any).billing_reason === 'subscription_create') {
        return { ok: true, outTradeNo: '', rawPayload: raw, eventType: event.type };
      }
      const subId = typeof (invoice as any).subscription === 'string' ? (invoice as any).subscription as string : '';
      const customerId = typeof invoice.customer === 'string' ? invoice.customer : '';
      const periodEnd = invoice.lines.data[0]?.period?.end;
      return {
        ok: true,
        outTradeNo: '',
        rawPayload: raw,
        eventType: event.type,
        subscriptionId: subId,
        stripeCustomerId: customerId,
        currentPeriodEnd: periodEnd ? periodEnd * 1000 : undefined,
      };
    }

    // customer.subscription.deleted — 订阅取消（用户主动或 Stripe 重试失败后自动取消）
    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as Stripe.Subscription;
      return {
        ok: true,
        outTradeNo: '',
        rawPayload: raw,
        eventType: event.type,
        subscriptionId: sub.id,
        stripeCustomerId: typeof sub.customer === 'string' ? sub.customer : '',
      };
    }

    // invoice.payment_failed — 自动续费扣款失败（只记日志，不降级）
    if (event.type === 'invoice.payment_failed') {
      return {
        ok: true,
        outTradeNo: '',
        rawPayload: raw,
        eventType: event.type,
      };
    }

    // 其他事件 ACK 但不开通
    return { ok: false, outTradeNo: '', rawPayload: raw };
  }

  successResponse(): Response {
    return NextResponse.json({ received: true });
  }
}

// ── XunhuPayProvider：国内站聚合支付（虎皮椒），后台只绑支付宝 ──
// 扫码/唤起支付宝一次性付款，无订阅。下单不传支付方式（由后台绑定的支付方式决定）。
// 下单/回调均为 key 排序拼接 + 末尾追加 secret 的 MD5 签名（无 HMAC/时间戳容错，算法固定）。
// 回调是 form-urlencoded、成功 status='OD'、处理完必须返回纯字符串 'success'（否则重复通知）。
class XunhuPayProvider implements PaymentProvider {
  readonly channel = 'xunhupay';
  private appid: string;
  private secret: string;
  private gateway: string;

  constructor() {
    const appid = process.env.XUNHUPAY_APPID;
    const secret = process.env.XUNHUPAY_SECRET;
    if (!appid || !secret) throw new Error('XUNHUPAY_APPID / XUNHUPAY_SECRET 未配置');
    this.appid = appid;
    this.secret = secret;
    this.gateway = (process.env.XUNHUPAY_GATEWAY || 'https://api.xunhupay.com').replace(/\/$/, '');
  }

  // 签名：滤空值('',null,undefined)+滤 hash → key ASCII 字典序 → k=v&k=v 拼接 → 末尾直接追加 secret → MD5 小写
  private sign(params: Record<string, string>): string {
    const keys = Object.keys(params)
      .filter((k) => k !== 'hash' && params[k] !== '' && params[k] != null)
      .sort();
    const query = keys.map((k) => `${k}=${params[k]}`).join('&');
    return createHash('md5').update(query + this.secret, 'utf8').digest('hex');
  }

  private nonceStr(): string {
    let s = '';
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 32; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  }

  async createCharge(input: CreateChargeInput): Promise<CreateChargeResult> {
    const base = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
    const params: Record<string, string> = {
      version: '1.1',
      appid: this.appid,
      trade_order_id: input.outTradeNo,             // 商户唯一订单号（复用 out_trade_no）
      total_fee: (input.amount / 100).toFixed(2),   // 分 → 元，两位小数字符串
      title: input.subject,
      notify_url: `${base}/api/membership/callback`, // 异步回调（复用单入口）
      return_url: `${base}/membership/success?order=${input.orderId}`,
      callback_url: `${base}/membership`,            // 用户取消跳回定价页
      time: String(Math.floor(Date.now() / 1000)),
      nonce_str: this.nonceStr(),
    };
    params.hash = this.sign(params);

    const resp = await fetch(`${this.gateway}/payment/do.html`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify(params),
    });
    const result = await resp.json().catch(() => null) as
      | { errcode?: number; errmsg?: string; data?: { url?: string; url_qrcode?: string } }
      | null;
    if (!result || result.errcode !== 0 || !result.data?.url) {
      throw new Error(`虎皮椒下单失败：${result?.errmsg || 'unknown'} (code=${result?.errcode ?? ''})`);
    }
    return { checkoutUrl: result.data.url, qrData: result.data.url_qrcode };
  }

  async verifyCallback(req: Request): Promise<VerifyResult> {
    let fields: Record<string, string> = {};
    try {
      const form = await req.formData();
      for (const [k, v] of form.entries()) fields[k] = typeof v === 'string' ? v : '';
    } catch {
      fields = {};
    }
    const raw = JSON.stringify(fields);

    // 验签
    if (!fields.hash || this.sign(fields) !== fields.hash) {
      return { ok: false, outTradeNo: '', rawPayload: raw };
    }
    // 防配错商户
    if (fields.appid !== this.appid) {
      return { ok: false, outTradeNo: '', rawPayload: raw };
    }
    // 仅支付成功（OD）才开通；WP/CD 等状态不开通
    if (fields.status !== 'OD') {
      return { ok: false, outTradeNo: fields.trade_order_id || '', rawPayload: raw };
    }

    // 不设 orderId / eventType：让单入口走 out_trade_no 反查主流程，跳过 Stripe 订阅分支
    return {
      ok: true,
      outTradeNo: fields.trade_order_id || '',
      amount: Math.round(parseFloat(fields.total_fee || '0') * 100), // 元 → 分（四舍五入避浮点）
      rawPayload: raw,
    };
  }

  successResponse(): Response {
    // 虎皮椒要求纯字符串 'success'（非 JSON），否则会重复通知
    return new Response('success');
  }
}

// ── XorPayProvider：国内站聚合支付（XorPay），微信 + 支付宝 ──
// 资金由微信/支付宝官方 T+1 直结算到商户银行卡，XorPay 不做资金托管（非二清）。
// 用「收银台 cashier」模式：createCharge 返回 XorPay 收银台 GET 地址，用户整页跳过去，
// 由 XorPay 页面唤起支付宝 App / 微信内支付（比自己拿 openid 走 JSAPI 简单）。
// 签名 = 固定顺序值拼接 + app_secret 的 MD5 小写（不是 key 排序）。
// 回调 form-urlencoded，字段 aoid/order_id/pay_price/pay_time/more/sign，
// 验签顺序 aoid+order_id+pay_price+pay_time+app_secret；能收到 notify 即已支付成功；返回正文含 'success'。
class XorPayProvider implements PaymentProvider {
  readonly channel = 'xorpay';
  private aid: string;
  private secret: string;
  private gateway: string;

  constructor() {
    const aid = process.env.XORPAY_AID;
    const secret = process.env.XORPAY_APP_SECRET;
    if (!aid || !secret) throw new Error('XORPAY_AID / XORPAY_APP_SECRET 未配置');
    this.aid = aid;
    this.secret = secret;
    this.gateway = (process.env.XORPAY_GATEWAY || 'https://xorpay.com').replace(/\/$/, '');
  }

  // 签名：按固定顺序把值纯拼接（无分隔符、无 key）→ 末尾接 app_secret → MD5 小写 32 位
  private sign(...parts: string[]): string {
    return createHash('md5').update(parts.join('') + this.secret, 'utf8').digest('hex');
  }

  async createCharge(input: CreateChargeInput): Promise<CreateChargeResult> {
    const base = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
    // 收银台默认走支付宝当面付（手机浏览器可唤起支付宝 App）；用户在微信内打开时 XorPay 收银台会自适应微信支付。
    const payType = process.env.XORPAY_PAY_TYPE || 'alipay';
    const name = input.subject;
    const price = (input.amount / 100).toFixed(2);   // 分 → 元，字符串 "50.00"
    const orderId = input.outTradeNo;                 // 商户订单号（复用 out_trade_no，唯一）
    const notifyUrl = `${base}/api/membership/callback`;
    // 下单/收银台签名顺序：name + pay_type + price + order_id + notify_url + app_secret
    const sign = this.sign(name, payType, price, orderId, notifyUrl);

    // 收银台 GET 跳转地址：用户整页跳过去，由 XorPay 页面完成支付并唤起 App。
    // 付款成功后 XorPay 异步打 notify_url；同步回跳用 return（可选，XorPay 收银台支持带回跳）。
    const qs = new URLSearchParams({
      name,
      pay_type: payType,
      price,
      order_id: orderId,
      notify_url: notifyUrl,
      sign,
      return: `${base}/membership/success?order=${input.orderId}`,
    });
    return { checkoutUrl: `${this.gateway}/api/cashier/${this.aid}?${qs.toString()}` };
  }

  async verifyCallback(req: Request): Promise<VerifyResult> {
    let f: Record<string, string> = {};
    try {
      const form = await req.formData();
      for (const [k, v] of form.entries()) f[k] = typeof v === 'string' ? v : '';
    } catch {
      f = {};
    }
    const raw = JSON.stringify(f);

    // 验签：aoid + order_id + pay_price + pay_time + app_secret
    const expect = this.sign(f.aoid || '', f.order_id || '', f.pay_price || '', f.pay_time || '');
    if (!f.sign || expect !== f.sign) {
      return { ok: false, outTradeNo: '', rawPayload: raw };
    }

    // 能收到 notify 即已支付成功（XorPay 只在成功时回调）。
    // 不设 orderId / eventType：让单入口走 out_trade_no 反查主流程，跳过 Stripe 订阅分支。
    return {
      ok: true,
      outTradeNo: f.order_id || '',
      amount: Math.round(parseFloat(f.pay_price || '0') * 100), // 元 → 分（四舍五入避浮点）
      rawPayload: raw,
    };
  }

  successResponse(): Response {
    // XorPay 要求返回正文含 'success'（否则按 1/2/4/16/64/300 分钟重试 6 次）
    return new Response('success');
  }
}

// 真渠道 provider 在这里加 case（见文件头注释）
export function getPaymentProvider(): PaymentProvider {
  const name = process.env.PAYMENT_PROVIDER || 'mock';
  // 生产环境禁止 mock：mock 回调恒成功，未配真渠道会导致任何人免费开通会员。
  if (name === 'mock' && process.env.NODE_ENV === 'production') {
    throw new Error('生产环境必须配置真实支付渠道（PAYMENT_PROVIDER=stripe|xunhupay|xorpay），禁止使用 mock');
  }
  switch (name) {
    case 'stripe': return new StripeProvider();
    case 'xunhupay': return new XunhuPayProvider();
    case 'xorpay': return new XorPayProvider();
    case 'mock':
    default:
      return new MockProvider();
  }
}
