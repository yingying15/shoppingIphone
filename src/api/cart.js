import request from '@/utils/request'
// 加入购物车接口
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId, // 商品id
    goodsNum, // 商品数量
    goodsSkuId// 商品规格id
  })
}
// 获取购物车列表
export const getCrtList = () => {
  return request.get('/cart/list')
}
// 修改商品数量
export const changeNum = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 删除购物车接口
export const delCartApi = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
