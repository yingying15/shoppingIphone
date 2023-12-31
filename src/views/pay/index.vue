<template>
    <div class="pay">
      <van-nav-bar fixed title="订单结算台" left-arrow @click-left="$router.go(-1)" />

      <!-- 地址相关 -->
      <div class="address" @click="toAddress()">
        <div class="left-icon">
          <van-icon name="logistics" />
        </div>
        <div class="info" v-if="true">
          <div class="info-content">
            <span class="name">{{addressObj?.name}}</span>
            <span class="mobile">{{addressObj?.phone}}</span>
          </div>
          <div class="info-address">
            {{ConcatAddress}}
          </div>
        </div>

        <!-- <div class="info" v-else>
          请选择配送地址
        </div> -->

        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>

      <!-- 订单明细 -->
      <div class="pay-list">
        <div class="list">
          <div class="goods-item" v-for="item in order.goodsList" :key="item.goods_id">
              <div class="left">
                <img :src="item.goods_image" alt="图片" />
              </div>
              <div class="right">
                <p class="tit text-ellipsis-2">
                   {{item.goods_name}}
                </p>
                <p class="info">
                  <span class="count">x{{item.total_num}}</span>
                  <span class="price">¥{{item.goods_price_min}}</span>
                </p>
              </div>
          </div>
        </div>

        <div class="flow-num-box">
          <span>共 {{order.orderTotalNum}} 件商品，合计：</span>
          <span class="money">￥ {{order.orderTotalPrice}}</span>
        </div>

        <div class="pay-detail">
          <div class="pay-cell">
            <span>订单总金额：</span>
            <span class="red">￥ {{order.orderTotalPrice}}</span>
          </div>

          <div class="pay-cell">
            <span>优惠券：</span>
            <span>无优惠券可用</span>
          </div>

          <div class="pay-cell">
            <span>配送费用：</span>
            <span v-if="!ConcatAddress">请先选择配送地址</span>
            <span v-else class="red">+￥0.00</span>
          </div>
        </div>

        <!-- 支付方式 -->
        <div class="pay-way">
          <span class="tit">支付方式</span>
          <div class="pay-cell">
            <span><van-icon name="balance-o" />余额支付（可用 ¥ {{ personal.balance }} 元）</span>
            <!-- <span>请先选择配送地址</span> -->
            <span class="red"><van-icon name="passed" /></span>
          </div>
        </div>

        <!-- 买家留言 -->
        <div class="buytips">
          <textarea placeholder="选填：买家留言（50字内）" name="" id="" cols="30" rows="10"></textarea>
        </div>
      </div>

      <!-- 底部提交 -->
      <div class="footer-fixed">
        <div class="left">实付款：<span>￥{{order.orderTotalPrice}}</span></div>
        <div class="tipsbtn" @click="submitOrder">提交订单</div>
      </div>
    </div>
  </template>

<script>
import { mapState } from 'vuex'
import { getPay, buySoon } from '@/api/pay'
export default {
  name: 'PayIndex',
  data () {
    return {
      address: '',
      order: {}, // 返回的订单信息
      personal: {}// 返回的个人信息
    }
  },
  computed: {
    ...mapState('pay', ['addressObj']),
    // 拼接地址
    ConcatAddress () {
      const addr = this.addressObj?.region
      if (addr) {
        return addr.city + ' ' + addr.province + ' ' + addr.region + ' ' + this.addressObj.detail
      }
      return ''
    }
  },
  methods: {
    // 请求后台订单信息
    async getOrder () {
      const mode = this.$route.query.mode
      if (mode === 'cart') {
        let cartIds
        // 如果只有一件商品 则是字符串 不需要拼接
        if (typeof (this.$route.query.cartIds) === 'string') {
          cartIds = this.$route.query.cartIds
        } else {
          cartIds = this.$route.query.cartIds.join(',')
        }
        const { data: { order, personal } } = await getPay(mode, { cartIds: cartIds })
        this.order = order
        this.personal = personal
      }
      if (mode === 'buyNow') {
        const goodsId = this.$route.query.goodsId
        const goodsNum = this.$route.query.goodsNum
        const goodsSkuId = this.$route.query.goodsSkuId
        const { data: { order, personal } } = await getPay(mode, { goodsId, goodsNum, goodsSkuId })
        this.order = order
        this.personal = personal
      }
    },
    // 提交订单按钮
    async submitOrder () {
      // 得到传过来的mode
      const mode = this.$route.query.mode
      if (mode === 'cart') {
        const cartIds = this.$route.query.cartIds.join(',')
        await buySoon(mode, { cartIds })
      }
      if (mode === 'buyNow') {
        await buySoon(mode, {
          goodsId: this.$route.query.goodsId,
          goodsNum: this.$route.query.goodsNum,
          goodsSkuId: this.$route.query.goodsSkuId
        })
      }
      this.$toast.success('支付成功')
      this.$router.replace('/myOrder')
    },
    // 去到收货地址
    toAddress () {
      this.$router.push('/address')
    }

  },
  created () {
    // 如果vuex中token存在的话 直接从vuex中获取异步请求
    if (this.$store.getters.getInfo) {
      // 调用vuex仓库中的异步请求
      this.$store.dispatch('pay/getAddress')
      // 调用请求后台订单信息的方法
      this.getOrder()
    }
  }

}
</script>

<style lang="less" scoped>
.pay {
  padding-top: 46px;
  padding-bottom: 46px;
  ::v-deep {
    .van-nav-bar__arrow {
      color: #333;
    }
  }
}
.address {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-size: 14px;
  color: #666;
  position: relative;
  background: url(@/assets/border-line.png) bottom repeat-x;
  background-size: 60px auto;
  .left-icon {
    margin-right: 20px;
  }
  .right-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-7px);
  }
}
.goods-item {
  height: 100px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 100px;
    img {
      display: block;
      width: 80px;
      margin: 10px auto;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    padding-right: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: #333;
    .info {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      .price {
        color: #fa2209;
      }
    }
  }
}

.flow-num-box {
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px;
  font-size: 14px;
  border-bottom: 1px solid #efefef;
  .money {
    color: #fa2209;
  }
}

.pay-cell {
  font-size: 14px;
  padding: 10px 12px;
  color: #333;
  display: flex;
  justify-content: space-between;
  .red {
    color: #fa2209;
  }
}
.pay-detail {
  border-bottom: 1px solid #efefef;
}

.pay-way {
  font-size: 14px;
  padding: 10px 12px;
  border-bottom: 1px solid #efefef;
  color: #333;
  .tit {
    line-height: 30px;
  }
  .pay-cell {
    padding: 10px 0;
  }
  .van-icon {
    font-size: 20px;
    margin-right: 5px;
  }
}

.buytips {
  display: block;
  textarea {
    display: block;
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 12px;
    height: 100px;
  }
}

.footer-fixed {
  position: fixed;
  background-color: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  border-top: 1px solid #efefef;
  font-size: 14px;
  display: flex;
  .left {
    flex: 1;
    padding-left: 12px;
    color: #666;
    span {
      color:#fa2209;
    }
  }
  .tipsbtn {
    width: 121px;
    background: linear-gradient(90deg,#f9211c,#ff6335);
    color: #fff;
    text-align: center;
    line-height: 46px;
    display: block;
    font-size: 14px;
  }
}
</style>
