<template>
  <view class="content">
    <view class="userboard">
      <u-card class="user" :head-border-bottom="false" :foot-border-top="false">
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
        src: "../../static/mine/user_male.png"
      },
      serviceList:[
        {id:1,src:"../../static/mine",text:"我的报告",url:"../diagnosis/index"},
        {id:2,src:"../../static/home/menu2.png",text:"我的药物",url:""},
        {id:3,src:"../../static/home/menu3.png",text:"我的邦卡",url:""}
      ]
    }
  },
  onLoad() {

  },
  methods: {

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
</style>
