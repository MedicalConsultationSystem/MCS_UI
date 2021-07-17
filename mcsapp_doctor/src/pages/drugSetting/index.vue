<template>
  <view>
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
    </view>
    <view>
      <u-form :model="form" ref="uForm">
        <u-form-item label="药品"><u-input v-model="form.sex" type="select" /></u-form-item>
        <u-form-item label="剂量"><u-number-box v-model="value"></u-number-box></u-form-item>
      </u-form>
    </view>
  </view>
</template>

<script>
export default {
name: "drugSetting",
  data(){
  return{
    form: {
      name: '',
      intro: '',
      sex: ''
    },
    value: 0,
    background: {
      backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
    }
  }
  }
}
</script>

<style scoped>

</style>
