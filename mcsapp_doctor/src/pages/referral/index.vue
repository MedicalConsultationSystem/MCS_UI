<template>
  <view>
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
    </view>
    <view class="patientboard" >
      <u-card class="patient" box-shadow="2px 3px 8px #888888">
        <view class="patient_head" slot="head">
          <u-row class="head_row">
            <span gutter="3">
            <text class="apply_text">申请时间：{{applyData.apply_time}}</text>
          </span>
            <spn gutter="6">
              <text class="status_text">{{applyData.status}}</text>
            </spn>
          </u-row>
        </view>
        <view class="patient_body" slot="body" @click="Tab('../patientInfo/index')">
          <u-image width="90rpx" height="90rpx" :src="patient.src" shape="circle"></u-image>
          <view class="name_text">
            <u-row>
              <text class="name_text1">{{applyData.name}}</text>
              <text class="name_text1">{{applyData.sex}}</text>
              <text class="name_text1">{{applyData.age}}岁</text>
            </u-row>
            <text class="name_text1">药品需求：{{applyData.drugs}}</text>
          </view>
          <view class="change">
            <u-icon class="change_icon" name="arrow-right" size="30"></u-icon>
          </view>
        </view>
        <view class="patient_foot" slot="foot">
          <u-button size="default" >完成接诊</u-button>
        </view>

      </u-card>
    </view>
  </view>

</template>

<script>
export default {
name: "index",
  data(){
  return{
    title: "复诊配药",
    background: {
      backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
    },
    patient: {
      src:"../../static/touxiang/touxiang6.jpg"
    },
    applyData: {
        apply_time:"2021-7-16 15:41:31",
        status:"待完成",
        avatar:"../../static/touxiang/touxiang6.jpg",
        name:"王大虎",
        sex:"男",
        age:18,
        drugs:"lalalal"}
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

.patientboard{
  margin-top: 40rpx;
}
.patient{
  display: flex;
  flex-direction: column;
}
.patient_head{

}
.name_text{
  display: flex;
  flex-direction: column;
  align-content: space-between;
  margin-left: 40rpx;
  font-size: 35rpx;
}
.name_text text{
  margin-top: 8rpx;
  margin-bottom: 8rpx;
}
.name_text1{
  margin-left: 5rpx;
  font-weight: bold;
  font-size: 16rpx;
}
.name_text2{
  border: 1rpx solid #ff9900;
  border-radius: 30rpx;
  font-size: 25rpx;
  color: #ff9900;
  padding-left: 10rpx;
  padding-right: 10rpx;
  padding-bottom: 4rpx;
}
.change{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 260rpx;
}
.apply_text{
  margin-left: 15rpx;
  font-size: 20rpx;
  width: 90rpx;
  color: #909399;
}
.change_text{
  margin-left: 15rpx;
  font-size: 29rpx;
  color: #909399;
}
.change_icon{
  margin-left: 20rpx;
  color: #909399;
}
.patient_body{
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}
.head_row{
  width: 640rpx;
}
.patient_foot{
  margin-left:520rpx;
  font-size: 20rpx;
  color: #4cd964;
}
.status_text{
  margin-left: 249rpx;
  font-size: 18rpx;
  color: #ff9900;
  padding: 20rpx;
}

</style>
