<template>
  <view class="back_color">
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
    </view>
    <view>
      <view class="patientBoard" v-for="item in list" :key="item.id" >
        <u-card class="patient" :head-border-bottom="false" :foot-border-top="false">
          <view class="patient_head" slot="head">
            <u-row class="head_row">
            <span gutter="3">
            <text class="apply_text" :v-if="item.apply_time">申请时间：{{item.apply_time}}</text>
          </span>
              <spn gutter="6">
                <text class="status_text">{{item.status}}</text>
              </spn>
            </u-row>
          </view>
          <view class="patient_body" slot="body" @click="Tab('../patientInfo/index')">
            <u-image width="90rpx" height="90rpx" :src="patient.src" shape="circle"></u-image>
            <view class="name_text">
              <u-row>
                <text class="name_text">{{item.name}}</text>
                <text class="sex_text">{{item.sex}}</text>
                <text class="age_text">{{item.age}}岁</text>
              </u-row>
              <u-row>
                <text class="name_text">药品需求：</text>
                <text class="need_text">{{item.drugs}}</text>
              </u-row>
            </view>
            <view class="change">
              <u-icon class="change_icon" name="arrow-right" size="30"></u-icon>
            </view>
          </view>
          <view class="patient_foot" slot="foot">
            <u-button size="mini">完成接诊</u-button>
          </view>

        </u-card>
      </view>
    </view>

  </view>

</template>

<script>
export default {
name: "referral",
  onLoad(){
    this.screenHeight=uni.getSystemInfoSync().windowHeight;
    console.log(this.screenHeight)
  },
  data(){
  return{
    title: "复诊配药",
    screenHeight:null,
    background: {
      backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
    },
    patient: {
      src:"../../static/touxiang/touxiang6.jpg"
    },
    applyData: {
        apply_time:"",
        status:"",
        avatar:"",
        name:"",
        sex:"",
        age:null,
        drugs:""},
    list:[
      {
        id:1,
        apply_time:"2021-7-16 15:41:31",
        status:"待完成",
        avatar:"../../static/touxiang/touxiang6.jpg",
        name:"王大虎",
        sex:"男",
        age:18,
        drugs:"lalalal"},
      {
        id:2,
        apply_time:"2021-7-16 15:41:31",
        status:"待完成",
        avatar:"../../static/touxiang/touxiang6.jpg",
        name:"王大虎",
        sex:"男",
        age:18,
        drugs:"lalalal"},
    ],
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
.btn{
  marginTop: 20rpx;
  color:'red';
  height: 15rpx;
}
.back_color{
  background-color: #F5F5F5;
  height: 1667rpx;
}
.patientBoard{
  margin-top: 40rpx;
}
.patient{
  display: flex;
  flex-direction: column;
}
.patient_head{

}
.name_text text{
  margin-top: 10rpx;
  margin-bottom: 12rpx;
}
.name_text{
  margin-left: 20rpx;
  font-weight: bold;
  font-size: 21rpx;
  color: #909399;
}
.sex_text{
  margin-left: 30rpx;
  font-weight: bold;
  font-size: 18rpx;
  color: #909399;
}
.age_text{
  margin-left: 30rpx;
  font-weight: bold;
  font-size: 18rpx;
  color: #909399;
}
.need_text{
  margin-left: 20rpx;
  font-weight: bold;
  font-size: 18rpx;
  color: #323233;
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
  position: absolute;
  margin-left: 15rpx;
  font-size: 24rpx;
  width: 360rpx;
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
  height: 120rpx;
  justify-content: left;
  align-items: center;
}
.head_row{
  width: 640rpx;
}
.patient_foot{
  height: 28rpx;
  margin-left:520rpx;
  font-size: 20rpx;
  color: #4cd964;
}
.status_text{
  position:fixed;
  margin-left: 540rpx;
  font-size: 23rpx;
  color: #FFD700;
}

</style>
