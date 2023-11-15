import { getInfo, setInfo } from '@/utils/storage'
export default {
  // 开启命名空间  使user独立
  namespaced: true,
  // 值
  state () {
    return {
      // 个人权证信息 从本地获取
      userInfo: getInfo()
    }
  },
  // 修改值的方法
  mutations: {
    // 修改值 第一个参数默认是state
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      // 修改之后将新值存储到本地
      setInfo(userInfo)
    }
  },
  // 异步操作
  actions: {
    quitlogin (context) {
      // 清空用户权证
      context.commit('setUserInfo', {})
      // 清空购物车商品 当然 是在本地清空,接口没有清空
      context.commit('cart/setCrtList', [], { root: true })
    }
  },
  // 由state派生出来的值
  getters: {}
}
