<template>
<div class="countBox">
    <button class="sub" @click="subCount">-</button>
    <input :value="value" @change="handleChange" type="text" class="inp">
    <button class="add"  @click="addCount">+</button>
</div>
</template>

<script>
export default {
  // v-model默认儿子用value接 是:value和@input的简写
  props: {
    value: {
      typeof: Number,
      default: 1
    }
  },
  methods: {
    subCount () {
      if (this.value < 2) { return }
      this.$emit('input', this.value - 1)
    },
    addCount () {
      this.$emit('input', this.value + 1)
    },
    // 输入内容触发的方法
    handleChange (e) {
      // 得到输入的值
      const num = +e.target.value
      // 如果不是number类型 则将值改成原来的数据 直接结束
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      // 不然修改值
      this.$emit('input', num)
    }

  }
}

</script>

<style lang="less" scoped>
.countBox{
    display: flex;
    width: 110px;
    height: 30px;
    line-height: 30px;
    .sub{
        width: 30px;
        background-color: pink;
        text-align: center;
        border: none;
    }
    .add{
        width: 30px;
        background-color: pink;
        text-align: center;
        border: none;
    }
    .inp{
        width: 40px;
        margin: 0 5px;
        background-color: pink;
        text-align: center;
        border: none;
    }
}
</style>
