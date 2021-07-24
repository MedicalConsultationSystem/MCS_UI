<template>
	<view class="content">
		<image class="bg-set" src="../../static/login/login_bg.jpg"></image>
		<view class="login">
			<button class="loginBtn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权登录</button>
		</view>
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
      // isCanUse: uni.getStorageSync('isCanUse')||true//默认为true
    };
  },
  methods: {
    getPhoneNumber(e){
      if(e.detail.errMsg==="getPhoneNumber:fail user deny"){       //用户决绝授权
        //拒绝授权后弹出一些提示
      }else{      //允许授权
		console.log(e.detail)
        let pc = new WXBizDataCrypt('wx7eec75ebae0ab5c2',this.session_key);  //wxXXXXXXX为你的小程序APPID
        let data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
        
		console.log(data)       //data就是最终解密的用户信息
        this.msg.phone=data.phoneNumber
        console.log(this.msg)
        let reqJSON= JSON.stringify(this.msg)
        this.$axios
        .post('https://api.zghy.xyz/account/login',reqJSON)
        .then(res=>{
            console.log(res.data.data)
			uni.setStorageSync("userInfo", res.data.data);
            console.log("登陆成功！")
            uni.switchTab({
            	url: '../home/index',
            })
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
              appid: 'wx7eec75ebae0ab5c2',
              secret: '3fc5ef882c8dfe0cc7bbcd2c3a1ebb2c',       //你的小程序的secret,
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
