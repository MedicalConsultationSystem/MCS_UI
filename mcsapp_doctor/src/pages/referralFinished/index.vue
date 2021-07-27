<template>
  <view class="back_color">
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
    </view>
    <view>
      <scroll-view class="answer" :scroll-y="true">
      <view class="patientBoard" v-for="(item,index) in dataList" :key="index" >
        <u-card class="patient" :border="false" :head-border-bottom="false" :foot-border-top="false">
          <view class="patient_head" slot="head">
            <view class="head_row">
              <text class="apply">{{apply}}</text>
              <text class="apply_text">{{item.create_time}}</text>
              <text class="status_text">{{status}}</text>
            </view>
          </view>
          <view class="patient_body" slot="body">
            <view class="bodySet">
              <image :src="patient.src" class="imgSet"></image>
              <view class="divide">
                <view class="name">
                  <text class="name_text">{{item.person_name}}</text>
                  <text class="sex_text">{{item.person_gender_name}}</text>
                  <text class="age_text">{{item.person_age}}岁</text>
                </view>
                <view class="need">
                  <text class="name_text">药品需求：</text>
                  <text class="need_text">{{item.drug_names}}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="patient_foot" slot="foot">
            <u-button type="success" size="mini" :plain="true" shape="circle" @click="Tab(index)">查看处方</u-button>
          </view>
        </u-card>
      </view>
      </scroll-view>
    </view>

  </view>

</template>

<script>

export default {
  name: "referral",
  created() {
    this.doctor_id.doctor_id=uni.getStorageSync('doctor_id')
    this.getReferralList();
  },
  data(){
    return{
      title: "配药记录",
      status: "已完成",
      apply:"申请时间",
      headers:{
        "x-token":uni.getStorageSync('token'),
      },
      consult_id:{
        consult_id:null
      },
      background: {
        backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
      },
      doctor_id:{
        doctor_id:"",
      },
      patient: {
        src:"../../static/touxiang/touxiang6.jpg"
      },
      dataList:[],
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
  onLoad(){

  },
  methods:{
    getReferralList(){
      console.log(this.doctor_id)
      let reqJson=this.doctor_id
      reqJson=JSON.stringify(reqJson);
      console.log(reqJson)
      this.$axios
          .post('https://api.zghy.xyz/consult/findByDoctor',reqJson,{headers:this.headers})
          .then(res=>{
            console.log(res)
            if(res.data.code===0){
              // this.$refs.uToast.show({
              //   title: '问诊信息获取成功！',
              //   type: 'success',
              // })
              console.log(res.data.data[0].consult_status)
              for(let item in res.data.data){
                if(res.data.data[item].consult_status===3){
                  console.log(res.data.data[item].create_time)
                  let date = new Date(res.data.data[item].create_time).toJSON();
                  res.data.data[item].create_time=new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
                  console.log(res.data.data[item])
                  this.dataList.push(res.data.data[item])
                  console.log(this.dataList)
                }
              }
            }
          })
          .catch(error=>{
            console.log(error)
          })
    },
    Tab:function(index) {
      let navData= JSON.stringify(this.dataList[index])
      uni.navigateTo({
        url: '../check/index?dataList='+navData
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.back_color{
  background-color: #f3f4f6;
  height: 1667rpx;
}
.patientBoard{
  //margin-top: 20rpx;
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
.answer{
  width: 750rpx;
  height: 1520rpx;
  display: flex;
  flex-direction: column;
}
.name_text{
  display: flex;
  flex-direction: row;
  margin-left: 20rpx;
  font-weight: bold;
  font-size: 25rpx;
  color: #909399;
}
.apply_time{
  display: flex;
  flex-direction: row;
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
  color: #606266;
}

.change{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 260rpx;
}
.apply{
  font-size: 24rpx;
  color: #909399;
  width: 150rpx;
}
.apply_text{
  margin-left: 15rpx;
  font-size: 24rpx;
  color: #909399;
  width: 480rpx;
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
  margin-left: 140rpx;
  font-size: 23rpx;
  color: #ff9900;
  width: 120rpx;
}
.imgSet{
  align-items: center;
  width: 150rpx;
  height: 150rpx;
  border-radius: 75rpx;
}
</style>
