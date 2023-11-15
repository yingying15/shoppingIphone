import request from '@/utils/request'
// 获取订单 因为订单只能在订单页看见 所以不需要组件之间共享
export const getOrder = (dataType) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page: 1
    }
  })
}
