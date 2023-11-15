import request from '@/utils/request'

// 得到用户信息
export const getUserInfo = () => {
  return request.get('/user/info')
}
