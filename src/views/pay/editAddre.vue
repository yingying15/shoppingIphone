<template>
    <div class="editAddre">
      <van-nav-bar
        title="编辑收货地址"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div class="box1">收货地址</div>
        <van-form @submit="onSubmit" class="box">
            <van-field v-model="username" type="text" name="姓名" label="姓名" placeholder="姓名"
                :rules="[{ required: true, message: '请填写姓名' }]" />
            <van-field v-model="phone" type="text" name="电话" label="电话" placeholder="电话"
                :rules="[{ required: true, message: '请填写电话' }]" />
                <van-field
                  readonly
                  clickable
                  name="area"
                  :value="value"
                  label="地区选择"
                  placeholder="点击选择省市区"
                  @click="showArea = true"
                />
                <van-popup v-model="showArea" position="bottom">
                  <van-area
                    :area-list="areaList"
                    @confirm="onConfirm"
                    @cancel="showArea = false"
                  />
                </van-popup>
            <van-field v-model="xiAddress" type="text" name="详细地址" label="详细地址" placeholder="详细地址"
                :rules="[{ required: true, message: '请填写详细地址' }]" />
            <div style="margin: 16px;" @click="onSubmit()">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { editAddress } from '@/api/pay'
export default {
  name: 'editAddre',
  data () {
    return {
      obj: {}, // 地址对象
      username: '', // 姓名
      phone: '', // 电话
      xiAddress: '', // 详细地址
      value: '', // 地址
      showArea: false, // 弹出层开关
      areaList, // 数据格式见 Area 组件文档 新的地区
      addressList: []// 修改后的地区
    }
  },
  created () {
    this.obj = this.$route.query.item// 地址对象
    this.addressId = this.obj.address_id// addressId
    this.username = this.obj.name// 姓名
    this.phone = this.obj.phone// 电话
    const { city, province, region } = this.obj.region
    this.value = city + '/' + province + '/' + region// 地区
    this.xiAddress = this.obj.detail// 详细地址
  },
  methods: {
    // 将选中的地区拼接成字符串给地区赋值
    onConfirm (values) {
      // 得到选中的地区 !!item判断对象是否存在
      this.value = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/')
      this.showArea = false
      // values
      values.forEach(item => {
        const { code, name } = item
        const addre = {}
        const c = +code
        addre.label = name
        addre.value = c
        this.addressList.push(addre)
      })
    },
    // 提交方法 修改接口addressId, name, phone, region
    async onSubmit () {
      const res = await editAddress(this.addressId, this.username, this.phone, this.addressList, this.xiAddress)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.editAddre{
  height: 100%;
  .box1{
    margin-top: 10px;
    padding: 0 20px;
    font-size: 20px;
    color: grey;
  }

.box{
  border: 1px solid green;
  border-radius: 10px;
  margin-top: 20px;
  padding: 0 20px;
  margin: 20px;
  background-color:aliceblue;
  .van-cell {
    background-color:transparent
  }
}
}

</style>
