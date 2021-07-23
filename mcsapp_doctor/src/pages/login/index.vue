<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" style="margin-top: 160rpx">授权登录</button>
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
        uni.setStorage({
          key:'doctor_id',
          data:this.doctor_id
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
.header {
  margin: 90rpx 0 90rpx 50rpx;
  border-bottom: 1px solid #ccc;
  text-align: center;
  width: 650rpx;
  height: 300rpx;
  line-height: 450rpx;
}

.header image {
  width: 200rpx;
  height: 200rpx;
}

.content {
  margin-left: 50rpx;
  margin-bottom: 90rpx;
}

.content text {
  display: block;
  color: #9d9d9d;
  margin-top: 40rpx;
}

.bottom {
  border-radius: 80rpx;
  margin: 70rpx 50rpx;
  font-size: 35rpx;
}
</style>
