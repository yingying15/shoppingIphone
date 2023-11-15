import { getAddressList } from '@/api/pay'
export default {
  namespaced: true,
  state () {
    return {
      addressObj: {}
    }
  },
  mutations: {
    setList (state, obj) {
      state.addressObj = obj
    }
  },
  actions: {
    // 获取收货地址
    async getAddress (context) {
      const { data: { list } } = await getAddressList()
      context.commit('setList', list[0])
    }
  },
  getters: {}
}
