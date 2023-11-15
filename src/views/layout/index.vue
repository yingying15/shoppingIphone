<template>
  <div class="layout">
    <router-view></router-view>
    <van-tabbar  route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/login" icon="wap-home-o">首页</van-tabbar-item>
      <!-- <van-tabbar-item to="/cate" icon="apps-o">分类页</van-tabbar-item> -->
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayOut'
}
</script>

<style></style>
