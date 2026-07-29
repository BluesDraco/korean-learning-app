// 腾讯云短信（SendSms，TC3 签名），用于手机验证码。
// 凭证从 env 读：TENCENT_SMS_SECRET_ID / TENCENT_SMS_SECRET_KEY /
//   TENCENT_SMS_SDK_APP_ID / TENCENT_SMS_SIGN_NAME / TENCENT_SMS_TEMPLATE_ID

import { tc3Post } from '@/lib/server/tencentSign';

export async function sendVerificationCodeSms(phone: string, code: string): Promise<void> {
  const secretId = process.env.TENCENT_SMS_SECRET_ID;
  const secretKey = process.env.TENCENT_SMS_SECRET_KEY;
  const sdkAppId = process.env.TENCENT_SMS_SDK_APP_ID;
  const signName = process.env.TENCENT_SMS_SIGN_NAME;
  const templateId = process.env.TENCENT_SMS_TEMPLATE_ID;
  if (!secretId || !secretKey || !sdkAppId || !signName || !templateId) {
    throw new Error('TENCENT_SMS_* not configured');
  }

  const response = await tc3Post({
    service: 'sms',
    host: 'sms.tencentcloudapi.com',
    action: 'SendSms',
    version: '2021-01-11',
    region: 'ap-guangzhou',
    secretId,
    secretKey,
    payload: {
      PhoneNumberSet: ['+86' + phone],
      SmsSdkAppId: sdkAppId,
      SignName: signName,
      TemplateId: templateId,
      TemplateParamSet: [code, '10'], // {1}=验证码 {2}=有效期（分钟），与 CODE_TTL_MS 一致
    },
  });

  const statusSet = response.SendStatusSet as Array<{ Code?: string; Message?: string }> | undefined;
  const status = statusSet?.[0];
  if (!status || status.Code !== 'Ok') {
    throw new Error(`SendSms failed: ${status?.Code} ${status?.Message}`);
  }
}
