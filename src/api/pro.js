import request from '@/utils/request'

// 根据商品获取商品列表
export const getPro = (goodsName, page) => {
  return request.get('/goods/list', {
    params: {
      categoryId: 0,
      goodsName: goodsName,
      page: page
    }

  })
}
// 获取商品详情
export const proMess = (goodsId) => {
  return request.get('/goods/detail', { params: { goodsId: goodsId } })
}
// 获取商品评价
export const proAssess = (goodsId, limit) => {
  return request.get('/comment/listRows', { params: { goodsId, limit } })
}
