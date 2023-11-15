<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active">
      <!-- 在标签指定 name 属性的情况下，v-model 的值为当前标签的 name（此时无法通过索引值来匹配标签）。 -->
      <van-tab name="all" title="全部"></van-tab>
      <van-tab name="payment" title="待支付"></van-tab>
      <van-tab name="delivery" title="待发货"></van-tab>
      <van-tab name="received" title="待收货"></van-tab>
      <van-tab name="comment" title="待评价"></van-tab>
    </van-tabs>

    <OrderListItem v-for="item in list" :item="item" :key="item.order_id"></OrderListItem>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getOrder } from '@/api/order'

export default {
  name: 'OrderPage',
  components: {
    OrderListItem
  },
  data () {
    return {
      active: this.$route.query.dataType || 'all',
      list: []
    }
  },
  methods: {
    async getOrderList () {
      const { data: { list } } = await getOrder(this.active)
      this.list = list.data
      // 循环订单
      this.list.forEach(item => {
        // 得到每个订单
        item.total_num = 0
        // 循环每个订单 得到每件商品的数量 加在订单的属性上
        item.goods.forEach(good => {
          item.total_num += good.total_num
        })
      })
    }
  },

  // 监听active当active变化的时候 重新请求数据
  watch: {
    active: {
      immediate: true,
      handler () {
        this.getOrderList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
</style>
