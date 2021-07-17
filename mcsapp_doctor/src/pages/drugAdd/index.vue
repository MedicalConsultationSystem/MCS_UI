<template>

  <view>
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
    </view>
    <view >
      <u-search placeholder="搜索药品" v-model="keyword"></u-search>
    </view>
    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item title="吉西他滨针" @click="Tab('../drugSetting/index')">lala</u-cell-item>
      </u-cell-group>
    </view>
  </view>
</template>
<script>
export default {
name: "drugAdd",
data(){
  return{
    title:"新增药品",
    background: {
      backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
    },
    drugInfo:[
      {
        drug_name:"吉西他滨针",
        type:"医5",
        type1:"甲",
        dose:"0.2",
        dose_unit:"g",
        factory_name:"哈药集团制药"
      }
    ]
  }
},
  methods:{
    Tab:function(taburl) {
      uni.navigateTo({
        url: taburl
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.apply_text{
  margin-left: 15rpx;
  font-size: 20rpx;
  width: 90rpx;
  color: #323233;
}
</style>
