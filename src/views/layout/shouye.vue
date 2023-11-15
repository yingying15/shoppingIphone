<template>
  <div class="shouye">

    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" v-model="mobile" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picStr" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <!-- 如果图片存在 再渲染 -->
          <img v-if="picUrl" :src="picUrl"  alt="" @click="getData">
        </div>
        <div class="form-item">
          <input class="inp" v-model="msgCode" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">
            {{second === totalSecond ? '获取验证码' :  second+'秒后发送验证码'}}
          </button>
        </div>
        <div  class="form-item">
        <button class="login-btn" @click="login">登录</button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, getMsgCode, login } from '@/api/login'
import { setInfo } from '@/utils/storage'
export default {
  name: 'shouYe',
  data () {
    return {
      // 返回的图片
      picUrl: '',
      picKey: '', // 图形验证码key
      picStr: '', // 图形验证码
      totalSecond: 5, // 归位的秒数
      second: 5, // 变化的秒数
      timer: null, // 定时器
      mobile: '', // 手机号
      msgCode: ''// 短信验证码

    }
  },
  methods: {
    // 获取图片验证码
    async getData () {
      // 对象解构base64是返回的图片，key是图片的唯一标识，为了登录的时候验证图片用的
      const { data: { base64, key } } = await getCode()
      this.picUrl = base64
      this.picKey = key
    },
    // 点击获取短信验证码
    async getCode () {
      await getMsgCode(this.picStr, this.picKey, this.mobile)
      if (this.validFn()) {
        // 如果定时器是空的 并且显示的秒数是60秒的时候 点击之后才减掉秒数
        if (!this.timer && this.second === this.totalSecond) {
          this.timer = setInterval(() => {
          // 如果秒数大于0
            if (this.second >= 1) {
              this.second--
              // 如果倒计时到了0秒 则显示60秒 清除定时器
              if (this.second === 0) {
                this.second = this.totalSecond
                clearInterval(this.timer)
              }
            }
          }, 1000)
        }
      }
    },
    // 登录方法
    async login () {
      // 调用验证手机号和图形验证码
      if (!this.validFn()) { return }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast.fail('短信验证码错误')
        return
      }
      const data = await login(this.mobile, this.msgCode)
      // 将返回的数据存储到vuex中
      this.$store.commit('user/setUserInfo', data)
      // 将返回的数据存储到本地
      setInfo(data)
      // 跳转页面,如果地址栏中有回跳地址,baseUrl 有的话就跳回到回跳地址 没有的话 正常跳转到首页
      const url = this.$route.query.backUrl || '/login'
      this.$router.replace(url)
    },
    // 验证手机号和图形验证码
    validFn () {
      if (!/^1[1-9]\d{9}$/.test(this.mobile)) {
        this.$toast.fail('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picStr)) {
        this.$toast.fail('请输入正确的图形验证码')
        return false
      }
      return true
    }
  },
  // 在页面数据加载完就请求图形验证码
  created () {
    this.getData()
  },
  mounted () {

  },
  // 页面销毁的时候 清除定时器
  destroyed () {
    clearInterval(this.timer)
  }

}
</script>

<style scoped lang="less">
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
