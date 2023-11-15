// 购物车vuex存储
import { getCrtList, changeNum, delCartApi } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 修改购物车列表为新请求的列表
    setCrtList (state, newList) {
      state.cartList = newList
    },
    // 修改小选的状态
    toggelCheck (state, id) {
      const obj = state.cartList.find(item => item.goods_id === id)
      obj.isChecked = !obj.isChecked
    },
    // 点击全选 将全选取反 并且把每个小选都变成和全选一致的状态
    allCheck (state, newCheck) {
      state.cartList.forEach(item => {
        item.isChecked = newCheck
      })
    },
    // 修改购物车网页中就是vuex中商品的数量
    changeProNum (state, { goodsId, goodsNum }) {
      state.cartList.find(item => item.goods_id === goodsId)
    }
  },
  actions: {
    // 得到购物车列表
    async getCartList (context) {
      const { data } = await getCrtList()
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCrtList', data.list)
      console.log(data.list)
    },

    // 在购物车首页修改购物车数量
    async changeProCount (context, obj) {
      // 将3个参数从传来的对象解构出来
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 修改vuex中的值
      // context.commit('changeProNum', { goodsId, goodsNum })
      // 通过接口修改后台的数据
      await changeNum(goodsId, goodsNum, goodsSkuId)
    },
    // 删除购物车中商品
    async delCart (context) {
      // 得到选中的商品
      const arrId = context.getters.getCheckPro.map(item => item.id)
      // 删除
      await delCartApi(arrId)
      // 重新请求渲染
      context.dispatch('getCartList')
    }
  },
  getters: {
    // 商品数量 从state中得到数据
    getNum (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品
    getCheckPro (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中商品的数量 可以在第二个参数传入getters
    getCheckNum (state, getters) {
      return getters.getCheckPro.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中商品的价格 可以在第二个参数传入getters
    getCheckPri (state, getters) {
      return getters.getCheckPro.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 查询数组中每个元素的状态都是选中状态 才会返回true 由于是从商品派生出来的 所以写在gatters中
    getAllCheck (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
