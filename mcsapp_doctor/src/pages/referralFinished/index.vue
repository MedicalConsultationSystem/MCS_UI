<template>
  <view class="back_color">
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
    </view>
    <view>
      <view class="patientBoard" v-for="item in list" :key="item.id" >
        <u-card class="patient" >
          <view class="patient_head" slot="head">
            <view class="head_row">
              <text class="apply_text">申请时间：{{item.apply_time}}</text>
              <text class="status_text">{{item.status}}</text>
            </view>
          </view>
          <view class="patient_body" slot="body" @click="Tab('../patientInfo/index')">
            <view class="bodySet">
              <image :src="patient.src" class="imgSet"></image>
              <view class="divide">
                <view class="name">
                  <text class="name_text">{{item.name}}</text>
                  <text class="sex_text">{{item.sex}}</text>
                  <text class="age_text">{{item.age}}岁</text>
                </view>
                <view class="need">
                  <text class="name_text">药品需求：</text>
                  <text class="need_text">{{item.drugs}}</text>
                </view>
              </view>
              <view class="arrow">
                <u-icon class="change_icon" name="arrow-right" size="30"></u-icon>
              </view>
            </view>
          </view>
          <view class="patient_foot" slot="foot">
            <u-button type="success" size="mini" :plain="true" shape="circle">查看处方</u-button>
          </view>
        </u-card>
      </view>
    </view>

  </view>

</template>

<script>
export default {
  name: "referralFinished",
  onLoad(){
    this.screenHeight=uni.getSystemInfoSync().windowHeight;
    console.log(this.screenHeight)
  },
  data(){
    return{
      title: "配药记录",
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
          status:"已完成",
          avatar:"../../static/touxiang/touxiang6.jpg",
          name:"王大虎",
          sex:"男",
          age:18,
          drugs:"lalalal"},
        {
          id:2,
          apply_time:"2021-7-16 15:41:31",
          status:"已完成",
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
.back_color{
  background-color: #f3f4f6;
  height: 1667rpx;
}
.patientBoard{
  margin-top: 40rpx;
}
.patient{
  display: flex;
  flex-direction: column;
}

.name{
  display: flex;
  flex-direction: row;
  margin-left: 20rpx;
  margin-bottom: 30rpx;
  align-items: center;
}
.bodySet{
  display: flex;
  flex-direction: row;
  justify-content: left;
}
.divide{
  display: flex;
  flex-direction: column;
  align-items: left;
}
.name_text{
  display: flex;
  flex-direction: row;
  margin-left: 20rpx;
  font-weight: bold;
  font-size: 25rpx;
  color: #909399;
}
.need{
  display: flex;
  flex-direction: column;
  margin-left: 20rpx;
}
.sex_text{
  margin-left: 30rpx;
  font-weight: bold;
  font-size: 25rpx;
  color: #909399;
}
.age_text{
  margin-left: 30rpx;
  font-weight: bold;
  font-size: 25rpx;
  color: #909399;
}
.need_text{
  margin-top: 10rpx;
  margin-left: 20rpx;
  font-weight: bold;
  font-size: 24rpx;
  color: #303133;
}

.change{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 260rpx;
}
.apply_text{
  margin-left: 15rpx;
  font-size: 24rpx;
  color: #909399;
}
.change_text{
  margin-left: 15rpx;
  font-size: 29rpx;
  color: #909399;
}
.arrow{
  position: absolute;
  margin-left: 600rpx;
  margin-top: 60rpx;
}
.patient_body{
  display: flex;
  flex-direction: row;
  height: 120rpx;
  justify-content: left;
  align-items: center;
}
.head_row{
  display: flex;
  flex-direction: row;
}
.patient_foot{
  margin-left:520rpx;
  font-size: 20rpx;
  color: #4cd964;
}
.status_text{
  margin-left: 240rpx;
  font-size: 23rpx;
  color: #ff9900;
}
.imgSet{
  align-items: center;
  width: 150rpx;
  height: 150rpx;
  border-radius: 75rpx;
}
</style>
