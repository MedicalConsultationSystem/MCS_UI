<template>
  <view>
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
    </view>
    <view>
      <u-card :title="title" :show-head="false" :show-foot="false">
        <view class="" slot="body">
          <u-row class="head_row">
            <span gutter="3">
            <text class="apply_text">申请时间：{{applyData.apply_time}}</text>
          </span>
            <spn gutter="6">
              <text class="status_text">{{applyData.status}}</text>
            </spn>
          </u-row>
        </view>
      </u-card>
      <u-card :title="title" :show-head="false" :show-foot="false">
        <view class="" slot="body">
          <u-row class="head_row">
            <span gutter="3">
            <text class="apply_text">问诊人</text>
          </span>
            <spn gutter="6">
              <text class="name_text">{{applyData.name}}</text>
              <text class="sex_text">{{applyData.sex}}</text>
              <text class="age_text">{{applyData.age}}岁</text>
            </spn>
          </u-row>
        </view>
      </u-card>
      <u-card :title="title" :show-head="false">
        <view class="" slot="body">
          <u-row class="head_row">
            <text class="apply_text">所需药品</text>
          </u-row>
        </view>
        <view class="" slot="foot">
            <text class="drug_text2">感冒颗粒</text>
        </view>
      </u-card>
      <u-card :title="title" :show-head="false">
        <view class="" slot="body">
          <u-row class="head_row">
            <span gutter="3">
            <text class="apply_text">历史诊断</text>
          </span>
            <spn gutter="6">
              <text class="name_text">{{applyData.historicalDiagnosis}}</text>
            </spn>
          </u-row>
        </view>
        <view class="" slot="foot">
          <view>
            <text class="apply_text">病情描述:</text>
          </view>
          <view>
            <text class="illnessInfo_text">{{applyData.illnessInfo}}</text>
          </view>
        </view>
      </u-card>
      <u-card :title="title" :show-head="false" :show-foot="false">
        <view class="" slot="body">
        <view>
          <text class="apply_text">病情图片:</text>
        </view>
        <view>
        </view>
        </view>
      </u-card>
      <view>
        <u-row>
          <u-button type="primary" @click="Tab('../prescription/index')">处方</u-button>
          <u-button type="success" @click="Tab('../referral/index')">完成接诊</u-button>
        </u-row>

      </view>
    </view>
  </view>
</template>

<script>
export default {
name: "patientInfo",
  data(){
  return{
    title: "患者详情",
    background: {
      backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
    },
    applyData: {
      apply_time:"2021-7-16 15:41:31",
      status:"待完成",
      avatar:"../../static/touxiang/touxiang6.jpg",
      name:"王大虎",
      sex:"男",
      age:18,
      drugs:"lalalal",
      historicalDiagnosis:"感冒",
      illnessInfo:"从昨天晚上开始腹泻，头晕眼花，伴有呕吐症状，体温39摄氏度"
    }
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
.u-card-wrap {
  background-color: #999999;
  padding: 1px;
}
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
.status_text{
  margin-left: 220rpx;
  font-size: 18rpx;
  color: #4cd964;
  padding: 20rpx;
}

.name_text{
  margin-left: 280rpx;
  font-size: 18rpx;
  color: #323233;
  padding: 20rpx;
}
.illnessInfo_text{
  font-size: 18rpx;
  color: #323233;
  padding: 20rpx;
}
.sex_text{
  font-size: 18rpx;
  color: #323233;
  padding: 20rpx;
}
.age_text{
  font-size: 18rpx;
  color: #323233;
  padding: 20rpx;
}
.drug_text2{
  border: 1rpx solid #4cd964;
  border-radius: 30rpx;
  font-size: 15rpx;
  color: #4cd964;
  padding-left: 10rpx;
  padding-right: 10rpx;
  padding-bottom: 4rpx;
}
.apply_text{
  margin-left: 15rpx;
  font-size: 20rpx;
  width: 90rpx;
  color: #909399;
}
</style>
