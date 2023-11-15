import Vue from 'vue'
import VueRouter from 'vue-router'
// 最初的首页 包含
import layout from '@/views/layout'
// 首页
import login from '@/views/login'
// 登录页
import shouye from '@/views/layout/shouye.vue'
// 分类
import cate from '@/views/layout/cate.vue'
// 我的
import user from '@/views/layout/user.vue'
// 购物车
import cart from '@/views/layout/cart.vue'
import store from '@/store'
// 异步组件需要写在正常路由的下面  二级路由
const goodsDetails = () => import('@/views/goodsDetails')
const pay = () => import('@/views/pay')
const myOrder = () => import('@/views/myOrder')
const search = () => import('@/views/search')
const searchItem = () => import('@/views/search/searchItem.vue')
// 收货地址页面
const address = () => import('@/views/pay/address.vue')
// 编辑收货地址
const editAddre = () => import('@/views/pay/editAddre.vue')
Vue.use(VueRouter)

const routes = [
// 一级路由
  {
    path: '/',
    component: layout,
    redirect: '/login',
    children: [
      // 登录页
      { path: '/shouye', component: shouye },
      { path: '/cate', component: cate },
      { path: '/user', component: user },
      { path: '/cart', component: cart },
      // 首页
      { path: '/login', component: login }
    ]
  },

  { path: '/myOrder', component: myOrder },
  { path: '/pay', component: pay },
  { path: '/search', component: search },
  { path: '/goodsDetails/:id', component: goodsDetails },
  { path: '/searchlist', component: searchItem },
  { path: '/address', component: address },
  { path: '/editAddre', component: editAddre }
]

const router = new VueRouter({
  routes
})

// 定义一个数组 里面放置需要权限才能访问的页面
const urlArr = ['/pay', '/myOrder']
// 全局前置守卫
// to是访问的页面  from是从哪个页面来的 next是 是否放行 next()是直接放行，next(路径)代表拦截页面至路径
router.beforeEach((to, from, next) => {
  // 如果to中的path路径（就是当前访问的路径）不包含在数组中 则直接放行
  if (!urlArr.includes(to.path)) {
    next()
  // 此时发现 '/pay', '/myOrder'页面被拦截了 如果有token就放行
  } else if (store.getters.getInfo) {
    next()
  } else { // 否则拦截到登录页面
    next('/shouye')
  }
})

export default router
