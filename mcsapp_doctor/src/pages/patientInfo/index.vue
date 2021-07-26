<template>
  <view>
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
    </view>
    <view class="container">
      <view class="header ">
        <view class="box">
          <label>申请时间</label>
          <text class="color">*</text>
        </view>
        <view class="u-input">
          <text class="common_text">{{receive.create_time}}</text>
        </view>
      </view>
      <view class="header ">
        <view class="box">
          <label>申请状态</label>
          <text class="color">*</text>
        </view>
        <view class="u-input">
          <text class="common_text">{{applyData.status}}</text>
        </view>
      </view>
      <view class="header ">
        <view class="box">
          <label>问诊人</label>
          <text class="color">*</text>
        </view>
        <view class="u-input">
          <text class="common_text">{{receive.person_name}}</text>
        </view>
      </view>

      <view class="header ">
        <view class="box">
          <label>年龄</label>
          <text class="color">*</text>
        </view>
        <view class="u-input">
          <text class="common_text">{{receive.person_age}}</text>
        </view>
      </view>
      <view class="header ">
        <view class="box">
          <label>性别</label>
          <text class="color">*</text>
        </view>
        <view class="u-input">
          <text class="common_text">{{receive.person_gender_name}}</text>
        </view>
      </view>
      <view class="header ">
        <view class="box">
          <label>所需药品</label>
          <text class="color">*</text>
        </view>
        <view class="u-input">
            <text class="drug_text" >{{receive.drug_names}}</text>
          </view>
        </view>
      <view class="header ">
        <view class="box">
          <label>历史诊断</label>
          <text class="color">*</text>
        </view>
        <view class="u-input">
          <text class="common_text">{{receive.diagnosis}}</text>
        </view>
      </view>
      <view class="header_illnessInfo">
        <view class="box">
          <label>病情描述</label>
          <text class="color">*</text>
        </view>
        <view class="u-input">
          <text class="common_text">{{receive.question}}</text>
        </view>
      </view>
      <view class="header_illnessInfo">
        <view class="box">
          <label>病情图片</label>
        </view>
        <view class="u-input">
          <text class="common_text"></text>
        </view>
        </view>
      </view>
      <view class="btn">
        <view class="add_btn">
          <u-button type="primary" u-icon="plus" @click="jumpToPrescription">开设处方</u-button>
        </view>
        <view class="submit_btn">
          <u-button type="success" @click="finishReferral">完成接诊</u-button>
        </view>
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
    receive:null,
    drugs:[],
    headers:{
      "x-token":uni.getStorageSync('token'),
    },
    background: {
      backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
    },
    doctor_id:{
      doctor_id:null
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
  created() {
    this.doctor_id.doctor_id=uni.getStorageSync('doctor_id')
  },
  methods:{

    Tab:function() {
      let pages = getCurrentPages(); // 当前页面
      let currPage = pages[pages.length - 1]; //当前页面

      let prevPage = pages[pages.length - 2]; //上一个页面
      prevPage.setData({
        isDoRefresh:true
      })
      uni.navigateBack({
        delta:1
      })
    },
    startReferral(){
      let reqJson={
        consult_id: null
      }
      reqJson.consult_id=this.receive.consult_id
      reqJson=JSON.stringify(reqJson);
      console.log(reqJson)
      this.$axios
          .post('https://api.zghy.xyz/consult/accept',reqJson,{headers:this.headers})
          .then(res=>{
            console.log(res)
            if(res.data.code===0){
              console.log("接诊成功")
            }
          })
    },
    finishReferral(){
      let reqJson={
        consult_id: null
      }
      reqJson.consult_id=this.receive.consult_id
      reqJson=JSON.stringify(reqJson);
      console.log(reqJson)
      this.$axios
          .post('https://api.zghy.xyz/consult/finish',reqJson,{headers:this.headers})
          .then(res=>{
            console.log(res)
            if(res.data.code===0){
              console.log("问诊结束成功")
              this.Tab();
            }
          })
    },
    jumpToPrescription(){
      this.startReferral();
      let NavData=JSON.stringify(this.receive)
      uni.navigateTo({
        url:'../prescription/index?patientInfo='+NavData
      })
    }
  },
  onLoad(options){
    console.log(options.patientInfo)
    this.receive=JSON.parse(options.patientInfo)
    this.drugs=this.receive.drug_names.split(",")
    console.log(this.receive.drug_names)
    console.log(this.drugs[0])
  },

}
</script>

<style lang="scss" scoped>
.drug_text{
  color: #909399;
}

.common_text{
  color: #909399;
}
.btn{
  display: flex;
  flex-direction: row;
  margin-top: 700rpx;
  position: fixed;
  bottom: 30rpx;
  .add_btn{
    color: #2979ff;
    margin-left: 100rpx;
  }
  .submit_btn{
    margin-left: 150rpx;
  }
}
.header {
  width: 100%;
  height: 120rpx;
  padding: 0 32rpx;
  display: flex;
  flex-direction: row;

  .row {
    position: relative;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 24rpx;
    height: 24rpx;
    font-size: 0;
  }

  .box {
    width: 180rpx;
    height: 100%;
    border-bottom: 1rpx solid #E4E4E4;
    line-height: 120rpx;

    label {
      font-size: 30rpx;
      font-weight: 400;
      color: #333333;
      line-height: 42px;
    }

    .color {
      color: #FC5C56;
    }
  }
  .u-input {
    border-bottom: 1rpx solid #E4E4E4;
    color: #333333;
    flex: 1;
    line-height: 120rpx;
    text-align: right;

    input {
      width: 100%;
      height: 100%;
    }

  }
}
.btn{
  position: fixed;
  margin-top: 30rpx;
}
.header_illnessInfo {
  width: 100%;
  height: 180rpx;
  padding: 0 32rpx;
  display: flex;
  flex-direction: row;

  .row {
    position: relative;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 24rpx;
    height: 24rpx;
    font-size: 0;
  }

  .box {
    width: 180rpx;
    height: 100%;
    border-bottom: 1rpx solid #E4E4E4;
    line-height: 120rpx;

    label {
      font-size: 30rpx;
      font-weight: 400;
      color: #333333;
      line-height: 42px;
    }

    .color {
      color: #FC5C56;
    }
  }
  .u-input {
    border-bottom: 1rpx solid #E4E4E4;
    color: #333333;
    flex: 1;
    line-height: 120rpx;
    text-align: right;

    input {
      width: 100%;
      height: 100%;
    }

  }
}
.apply {
  position: absolute;
  width: 50%;
  margin-top: 180rpx;
  height: 90rpx;
  padding: 0 33rpx;
  text-align: center;

  .toapply1 {
    width: 100%;
    height: 100%;
    background-color: green;
    line-height: 90rpx;
    background-color: #337DFF;
    font-size: 36prx;
    border-radius: 45rpx;
    font-weight: 400;
    color: #FFFFFF;
  }

  .toapply2 {
    width: 100%;
    height: 100%;
    background-color: green;
    line-height: 90rpx;
    background-color: #ff9900;
    font-size: 36prx;
    border-radius: 45rpx;
    font-weight: 400;
    color: #FFFFFF;
    margin-left: 360rpx;
  }
}
</style>
