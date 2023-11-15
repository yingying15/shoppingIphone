<template>
<div class="address">
  <van-nav-bar
        title="收货地址"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
        />
    <div class="box" v-if="list.length!==0">
    <addressItem v-for="(item,index) in list" :item="item" :key="index"   /></div>

    <div class="empty-cart" v-else>
      <img src="@/assets/empty.png" alt="">
      <div class="tips">
        您的收货地址是空的
      </div>
    </div>
</div>
</template>

<script>
import addressItem from '@/components/AddressItem.vue'
import { getAllAddress } from '@/api/pay'
export default {
  name: 'myAddress',
  data () {
    return {
      list: []
    }
  },
  components: {
    addressItem
  },
  created () {
    this.getAll()
  },
  methods: {
    // 获取收货地址 取得成功的对象
    async getAll () {
      const { data: { list } } = await getAllAddress()
      this.list = list
      console.log(this.list)
    }
  }
}
</script>

<style lang="less" scoped>
.address{
  padding: 0 20px;
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

}
}
</style>
