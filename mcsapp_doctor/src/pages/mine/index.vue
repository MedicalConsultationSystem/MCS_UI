<template>
  <view class="content">
<<<<<<< HEAD
    <view class="userboard">
      <u-card class="user">
        <view class="head" slot="head">
          <u-image width="95rpx" height="95rpx" :src="user.src" shape="circle"></u-image>
          <text>{{user.name}}</text>
          <text>{{user.title}}</text>
          <u-icon name="more-dot-fill" color="black" size="35"></u-icon>
        </view>
        <view class="body" slot="body">
          <text>所属机构：{{user.organization}}</text>
        </view>
        <view class="foot" slot="foot">
          <text>所属科室：{{user.department}}</text>
=======
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar back-icon-color="white" :title="title" title-color="white" :background="background" height="45" ></u-navbar>
    </view>
    <view class="userboard">
      <u-card class="user" :border="false" :head-border-bottom="false" :foot-border-top="false">
        <view class="head" slot="head">
          <image :src="user.src"></image>
          <text>{{doctor_info.doctor_name}}</text>
          <text>{{doctor_info.level_name}}</text>
          <u-icon name="more-dot-fill" color="black" size="35"></u-icon>
        </view>
        <view class="body" slot="body">
          <text>所属机构：{{doctor_info.org_name}}</text>
        </view>
        <view class="foot" slot="foot">
          <text>所属科室：{{doctor_info.dept_name}}</text>
>>>>>>> mcsapp_doctor
        </view>
      </u-card>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "王小虎",
        title:"主任医师",
        organization:"杭州市第三人民医院",
        department:"内科",
<<<<<<< HEAD
        src: "../../static/mine/user_male.png"
      },
=======

        src: "../../static/mine/user_male.png"
      },
      doctor_id:null,
      headers:{
        "x-token":uni.getStorageSync('token'),
      },
      doctor_info:{
        doctor_name: "",
        level_name:"",
        org_name:"",
        dept_name:"",
      },
      background: {
        backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
      },
>>>>>>> mcsapp_doctor
      serviceList:[
        {id:1,src:"../../static/mine",text:"我的报告",url:"../diagnosis/index"},
        {id:2,src:"../../static/home/menu2.png",text:"我的药物",url:""},
        {id:3,src:"../../static/home/menu3.png",text:"我的邦卡",url:""}
      ]
    }
  },
<<<<<<< HEAD
  onLoad() {

  },
  methods: {

=======
  created() {
    this.getDoctorInfo()
  },
  methods: {
    getDoctorInfo(){
      this.doctor_id=uni.getStorageSync('doctor_id')
      this.$axios
      .get('https://api.zghy.xyz/doctor/listAll',{headers:this.headers})
      .then(res=>{
        console.log(res)
        if(res.data.code===0){
          for(let item in res.data.data){
            if(res.data.data[item].doctor_id===this.doctor_id){
              console.log(res.data.data[item])
              this.doctor_info=res.data.data[item]
            }
          }
        }
      })
    }
>>>>>>> mcsapp_doctor
  }
}
</script>

<style lang="scss">
.content{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 1215rpx;
  background: linear-gradient(165deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)33%, rgb(102, 175, 161)43%,rgba(92, 210, 133,0.3)73%,white 90%);
}
.user{
  background: rgba($color: #ffffff, $alpha: 0.4);
}
.head{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
<<<<<<< HEAD
=======
.head image{
  width: 150rpx;
  height: 150rpx;
  margin-left: 35rpx;
  border-radius: 75rpx;
}
>>>>>>> mcsapp_doctor
</style>
