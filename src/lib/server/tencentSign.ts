// 腾讯云 TC3-HMAC-SHA256 签名 + fetch 调用（无 SDK，用 Node 内置 crypto）。
// SMS 与 SES 共用。凭证由调用方从各自 env 传入。

import crypto from 'crypto';

function sha256hex(data: string): string {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

function hmac(key: string | Buffer, data: string): Buffer {
  return crypto.createHmac('sha256', key).update(data, 'utf8').digest();
}

export interface Tc3Options {
  service: string;   // 'sms' | 'ses'
  host: string;      // 'sms.tencentcloudapi.com' | 'ses.tencentcloudapi.com'
  action: string;    // 'SendSms' | 'SendEmail'
  version: string;   // '2021-01-11' | '2020-10-02'
  region: string;    // 'ap-guangzhou'
  secretId: string;
  secretKey: string;
  payload: unknown;
}

// 返回腾讯云响应的 Response 对象。业务错误（Response.Error 存在）时抛出。
export async function tc3Post(opts: Tc3Options): Promise<Record<string, unknown>> {
  const { service, host, action, version, region, secretId, secretKey, payload } = opts;
  const body = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000);
  const date = new Date(timestamp * 1000).toISOString().slice(0, 10); // UTC yyyy-mm-dd

  // 1. CanonicalRequest
  const signedHeaders = 'content-type;host;x-tc-action';
  const canonicalHeaders =
    `content-type:application/json; charset=utf-8\n` +
    `host:${host}\n` +
    `x-tc-action:${action.toLowerCase()}\n`;
  const canonicalRequest = [
    'POST',
    '/',
    '',
    canonicalHeaders,
    signedHeaders,
    sha256hex(body),
  ].join('\n');

  // 2. StringToSign
  const credentialScope = `${date}/${service}/tc3_request`;
  const stringToSign = [
    'TC3-HMAC-SHA256',
    String(timestamp),
    credentialScope,
    sha256hex(canonicalRequest),
  ].join('\n');

  // 3. 逐层派生签名密钥
  const secretDate = hmac('TC3' + secretKey, date);
  const secretService = hmac(secretDate, service);
  const secretSigning = hmac(secretService, 'tc3_request');
  const signature = crypto.createHmac('sha256', secretSigning).update(stringToSign, 'utf8').digest('hex');

  // 4. Authorization 头
  const authorization =
    `TC3-HMAC-SHA256 Credential=${secretId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(`https://${host}`, {
    method: 'POST',
    headers: {
      'Authorization': authorization,
      'Content-Type': 'application/json; charset=utf-8',
      'Host': host,
      'X-TC-Action': action,
      'X-TC-Timestamp': String(timestamp),
      'X-TC-Version': version,
      'X-TC-Region': region,
    },
    body,
  });

  const json = await res.json().catch(() => ({}));
  const response = (json as { Response?: Record<string, unknown> }).Response;
  if (!response) {
    throw new Error(`Tencent ${action} bad response (${res.status})`);
  }
  const error = response.Error as { Code?: string; Message?: string } | undefined;
  if (error) {
    throw new Error(`Tencent ${action} error: ${error.Code} ${error.Message}`);
  }
  return response;
}
