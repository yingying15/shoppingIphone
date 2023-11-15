<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <div class="cart-box" v-if="cartList.length>0">
      <!-- 购物车开头 -->
      <div class="cart-title">
        <span class="all">共<i>{{ getNum }}</i>件商品</span>
        <span class="edit"  @click="changeFlag">
          <van-icon name="edit" />
          编辑
        </span>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <!-- 绑定是否多选 因为用的是组件 所以不可以用双向绑定-->
          <van-checkbox :value="item.isChecked"  @click="changeCheck(item.goods_id)"></van-checkbox>
          <div class="show">
            <img :src="item.goods.goods_image" alt="图片">
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{item.goods.goods_name}}</span>
            <span class="bottom">
              <div class="price">¥ <span>{{item.goods.goods_price_min}}</span></div>
              <CountBox v-model="item.goods_num" @input="(value)=>changeCount(value,item.goods_id,item.goods_sku_id)"></CountBox>
            </span>
          </div>
        </div>
      </div>

      <div class="footer-fixed">
        <div @click="AllCheck()"  class="all-check">
          <van-checkbox  :value="getAllCheck" icon-size="18"></van-checkbox>
          全选
        </div>

        <div class="all-total">
          <div class="price">
            <span>合计：</span>
            <span>¥ <i class="totalPrice">{{getCheckPri}}</i></span>
          </div>
          <div v-if="!flag" class="goPay" @click="toPay()">结算({{getCheckNum}})</div>
          <div v-else class="delete" @click="delCartFn">删除({{getCheckNum}})</div>
        </div>
      </div>
    </div>

    <div class="empty-cart" v-else>
      <img src="@/assets/empty.png" alt="">
      <div class="tips">
        您的购物车是空的, 快去逛逛吧
      </div>
      <div class="btn" @click="$router.push('/login')">去逛逛</div>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CartPage',
  data () {
    return {
      flag: false // 点击编辑的时候变成true 不显示结算,显示删除

    }
  },
  components: {
    CountBox
  },
  computed: {
    // 获取vuex中存储的数据
    ...mapState('cart', ['cartList']), // 获取state中的
    ...mapGetters('cart', ['getNum', 'getCheckNum', 'getCheckPri', 'getAllCheck', 'getCheckPro'])// 获取getters中的
  },
  created () {
    // 如果vuex中token存在的话 直接从vuex中获取异步请求
    if (this.$store.getters.getInfo) {
      // 调用vuex仓库中的异步请求 就是请求后台
      this.$store.dispatch('cart/getCartList')
    }
  },
  methods: {
    changeCheck (id) {
      // 提交到vuex中的mutations中修改
      this.$store.commit('cart/toggelCheck', id)
    },
    // 点击全选的时候 将全选取反 并且将需要修改的数据传给mutations
    AllCheck () {
      this.$store.commit('cart/allCheck', !this.getAllCheck)
    },
    // 修改数量
    changeCount (goodsNum, goodsId, goodsSkuId) {
      // 将3个参数拼成一个对象传给actions修改
      this.$store.dispatch('cart/changeProCount', { goodsNum, goodsId, goodsSkuId })
    },
    // 修改编辑标识符
    changeFlag () {
      this.flag = !this.flag
    },
    // 删除购物车商品
    async delCartFn () {
      if (this.getCheckNum === 0) return
      this.$store.dispatch('cart/delCart')
      this.$toast('删除成功')
      this.flag = false
    },
    // 结算
    async toPay () {
      // 如果选中的商品大于0的话
      if (this.getCheckNum > 0) {
        // 调用订单请求 获取购物车id
        const arr = this.getCheckPro.map(item => item.id)
        // 把订单和个人信息传给订单支付页
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            cartIds: arr || ''
          }
        })
      }
    }

  },
  // 监听
  watch: {
    // 监听开关  true的时候证明是删除,则取消全选
    flag (value) {
      if (value) {
        this.$store.commit('cart/allCheck', false)
      } else {
        this.$store.commit('cart/allCheck', true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay, .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }
}
  //空购物车样式
  .empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}

</style>
