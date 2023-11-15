// 导入请求
import request from '@/utils/request'
//   获取验证图片方法
export const getCode = () => {
  return request.get('/captcha/image')
}
// 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode: captchaCode,
      captchaKey: captchaKey,
      mobile: mobile
    }
  })
}
// 手机验证码登录
export const login = (mobile, smsCode) => {
  console.log(mobile, smsCode)
  return request.post('/passport/login', {
    form: {
      mobile: mobile,
      smsCode: smsCode,
      isParty: false,
      partyData: {}
    }

  })
}
