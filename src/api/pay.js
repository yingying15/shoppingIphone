import request from '@/utils/request'
// request是默认导出的
// 得到收货地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}
// 支付方法 分成从购物车和点击立即购买2种途径,mode有2个值 代表2种途径,obj是2种途径下不同的参数
// ...obj剩余参数 传不传都行
// export const getPay = (mode, ...cartIds) => {
//   return request.get('/checkout/order', {
//     params: {
//       mode,
//       delivery: 10, // 配送方式（10快递配送 20上门自提）
//       shopId: 0, // 自提门店ID
//       couponId: 0, // 优惠券ID
//       cartIds: cartIds.join(',')
//     }
//   })
// }
export const getPay = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10, // 配送方式（10快递配送 20上门自提）
      shopId: 0, // 自提门店ID
      couponId: 0, // 优惠券ID
      ...obj
    }
  })
}
// 立即支付接口
// cart=>cartIds
// buyNow=>goodsId,goodsNum,goodsSkuId
export const buySoon = (mode, obj) => {
  return request.post('/checkout/submit', {
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    mode, // 购买方式，buyNow：立即购买， cart: 购物车购买
    payType: 10,
    ...obj
  })
}
// 获得收货地址
export const getAllAddress = () => {
  return request.get('/address/list')
}
// 设置收货地址为默认
export const setAddress = (id) => {
  return request.post('/address/setDefault', {
    addressId: id
  })
}
// 得到默认收货地址
export const getAddress = () => {
  return request.get('/address/defaultId')
}
// 编辑收货地址
export const editAddress = (addressId, name, phone, region, detail) => {
  return request.post('/address/edit', {
    addressId,
    form: {
      name,
      phone,
      region,
      detail
    }
  })
}
// 删除收货地址
export const deleteAddress = (addressId) => {
  return request.post('/address/remove', {
    addressId
  })
}
