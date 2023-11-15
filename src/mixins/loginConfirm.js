
export default {
  methods: {
    getToast () {
      // 获取vuex中的token
      if (!this.$store.getters.getInfo) {
        // 弹窗
        this.$dialog.confirm({
          title: '温馨提示',
          message: '你还没有登录账号',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'

        }).then(() => {
          // 去登录replace跳转不会将路径加入到历史信息中
          // 如果希望跳转到登录页面 在跳转回来,跳转的时候需要写带参数,参数是当前的路径地址:this.$route.path(不带参数)或者this.$route.fullPath(带查询参数,常用)
          this.$router.replace({
            path: '/shouye',
            // 带参数
            query: {
              backUrl: this.$route.fullPath// 当前的路径地址
            }
          })
        }).catch(() => {})
        // 弹出窗了 返回true
        return true
      }
      return false
    }
  }
}
