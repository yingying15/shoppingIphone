<template>
    <div class="search">
      <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

      <van-search
        readonly
        shape="round"
        background="#ffffff"
        v-model="serchPro"
        show-action
        @click="$router.push('/search')"
      >
        <template #action>
          <van-icon class="tool" name="apps-o" />
        </template>
      </van-search>

      <!-- 排序选项按钮 -->
      <div class="sort-btns">
        <div class="sort-item">综合</div>
        <div class="sort-item">销量</div>
        <div class="sort-item">价格 </div>
      </div>

      <div class="goods-list">
        <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
      </div>
    </div>
  </template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getPro } from '@/api/pro'
export default {
  name: 'SearchIndex',
  data () {
    return {
      // 路径带过来的参数
      serchPro: this.$route.query.search,
      // 请求后台得到的搜索商品结果
      proList: []
    }
  },
  components: {
    GoodsItem
  },
  // 计算属性
  computed: {
    getSearchPro () {
      return this.serchPro
    }
  },
  // 数据加载钩子
  async created () {
    // 解构出data中的list
    const { data: { list } } = await getPro(this.serchPro, 1)
    this.proList = list.data
  }
}
</script>

  <style lang="less" scoped>
  .search {
    padding-top: 46px;
    ::v-deep .van-icon-arrow-left {
      color: #333;
    }
    .tool {
      font-size: 24px;
      height: 40px;
      line-height: 40px;
    }

    .sort-btns {
      display: flex;
      height: 36px;
      line-height: 36px;
      .sort-item {
        text-align: center;
        flex: 1;
        font-size: 16px;
      }
    }
  }

  // 商品样式
  .goods-list {
    background-color: #f6f6f6;
  }
  </style>
