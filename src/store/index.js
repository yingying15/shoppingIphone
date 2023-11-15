import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
import pay from './modules/pay'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    getInfo (state) {
      // return state.user.userInfo.data.token || null
      return state.user.userInfo.data ? state.user.userInfo.data.token : null
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // 将user挂载到总vuex上
    user,
    cart,
    pay
  }
})
