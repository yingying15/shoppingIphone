<template>
    <div class="addressItem">
        <div class="headers">
            <div class="info-content">
                <span class="name">{{item.name}}</span>
                <span class="mobile">{{item.phone}}</span>
            </div>
            <div class="info-address">
                <span>{{item.region.province}}</span>
                <span>&nbsp;&nbsp;&nbsp;{{item.region.city}}</span>
                <span>&nbsp;&nbsp;&nbsp;{{item.region.region}}</span>
                <span>&nbsp;&nbsp;&nbsp;{{item.detail}}</span>
            </div>
        </div>
        <div class="footer">
            <div class="box" @click="backPath()">
                <van-radio-group v-model="radio">
                <van-radio :name="item.address_id">默认</van-radio>
            </van-radio-group>
            </div>
            <div class="right">
                <button type="button" @click="editAddre(item)"><van-icon name="records-o"/>编辑</button>
                <button type="button"><van-icon name="delete-o" @click="deleteAddre(item)" />删除</button>
            </div>
        </div>
    </div>
</template>

<script>
import { setAddress, getAddress, deleteAddress } from '@/api/pay'
//, editAddress
export default {
  name: 'addressItem',
  props: {
    item: Object
  },
  data () {
    return {
      radio: ''
    }
  },
  computed: {
  },
  methods: {
    // 设置默认地址请求
    async setDefaultAddre (id) {
      await setAddress(id)
    },
    // 得到默认收货odizhi
    async getAddre () {
      const { data: { defaultId } } = await getAddress()
      this.radio = defaultId
    },
    // 返回上一页
    backPath () {
      window.history.back()
    },
    // 编辑地址
    editAddre (obj) {
      // 跳转到编辑地址页面,带着地址对象
      this.$router.push({
        path: '/editAddre',
        query: {
          item: this.item
        }
      })
    },
    // 删除地址
    async deleteAddre (obj) {
      const res = await deleteAddress(obj.address_id)
      console.log(res)
      window.history.back()
    }
  },
  created () {
    this.getAddre()
  },
  watch: {
    radio: {
      handler (value) {
        // 设置默认地址
        const id = +value// 将字符串转成数字类型
        this.setDefaultAddre(id)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.addressItem{
    background-color: gainsboro;
    border-radius: 10px;
    padding: 12px 10px;
    margin-top: 20px;
    //头部样式
    .headers{
        border-bottom: 1px solid rgb(161, 165, 161);
        padding-bottom: 15px;
        .info-content{
            display: flex;
            justify-content: left;
        }
        .info-address{
            margin-top: 5px;
        }
    }
    //底部样式
    .footer{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button{
            border: none;
            margin-left: 7px;
            background-color: transparent;
        }
    }
}

// .address {
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   padding: 20px;
//   font-size: 14px;
//   color: #666;
//   position: relative;
//   background-size: 60px auto;
//   .left-icon {
//     margin-right: 20px;
//   }
//   .right-icon {
//     position: absolute;
//     right: 20px;
//     top: 50%;
//     transform: translateY(-7px);
//   }
// }
</style>
