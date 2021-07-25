<template>
  <view class="content">
<!--    <image class="bg-set" :src="@/static/logo_bg.jpg"></image>-->
    <!-- #ifdef MP-WEIXIN -->
    <view class="login">
      <button class="loginBtn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" style="margin-top: 160rpx">授权登录</button>
    </view>
    <!-- #endif -->
  </view>
</template>
<script>
import WXBizDataCrypt from "@/common/WXBizDataCrypt"

export default {
  data() {
    return {
      session_key: '',
      unionid:'',
      openid: '',
      msg:{
        open_id:"",
        phone:""
      },
      jsCode:'',
      nickName: null,
      avatarUrl: null,
      phone:null,
      doctor_id:{
        doctor_id:null
      }
      // isCanUse: uni.getStorageSync('isCanUse')||true//默认为true
    };
  },
  methods: {
    getPhoneNumber(e){
      if(e.detail.errMsg==="getPhoneNumber:fail user deny"){       //用户决绝授权
        //拒绝授权后弹出一些提示
      }else{      //允许授权
        let pc = new WXBizDataCrypt('wxf6a3675168d24265',this.session_key);  //wxXXXXXXX为你的小程序APPID
        let data = pc.decryptData(e.detail.encryptedData , e.detail.iv);
        console.log(data)       //data就是最终解密的用户信息
        this.msg.phone=data.phoneNumber
        this.doctor_id.doctor_id=data.phoneNumber
        console.log(this.doctor_id.doctor_id)
        uni.setStorage({
          key:'doctor_id',
          data:this.doctor_id.doctor_id
        })

        console.log(this.msg)
        let reqJSON= JSON.stringify(this.msg)
        this.$axios
        .post('https://api.zghy.xyz/account/login',reqJSON)
        .then(res=>{
          console.log(res)
          if(res.data.data.user_type==="2"){
            console.log("登陆成功！")
            uni.switchTab({
              url: '../home/index'
            })
            uni.setStorage({
              key:'token',
              data:res.data.data.token
            })
          }else if(res.data.data.user_type==="1"){
            console.log("您还不是医生，如是请联系管理员")
          }
        })
      }
    },

  },
  onLoad(){
    uni.login({
      success: (res) => {
        console.log(res)
        if (res.code) {         //微信登录成功 已拿到code
          this.jsCode=res.code        //保存获取到的code
          uni.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            method:'GET',
            data: {
              appid: 'wxf6a3675168d24265',
              secret: '305958934645553afc5ac9244f610e7e',       //你的小程序的secret,
              js_code: this.jsCode              //wx.login 登录成功后的code
            },
            success: (cts) => {
              console.log(cts)
              // 换取成功后 暂存这些数据 留作后续操作
              this.msg.open_id=cts.data.openid
              this.openid=cts.data.openid     //openid 用户唯一标识
              this.unionid=cts.data.unionid     //unionid 开放平台唯一标识
              this.session_key=cts.data.session_key     //session_key  会话密钥
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
}
</script>

<style>
.content{
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.bg-set{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
.login{
  display: flex;
  flex-direction: row;
  width: auto;
  height: 80rpx;
  align-items: center;
  margin-top: 1050rpx;
}
.loginBtn{
  width: 400rpx;
  color: white;
  font-weight: bold;
  background: rgba(230,230,240,0.4);
  border-radius: 50rpx;
  font-size: 35rpx;
}
</style>
