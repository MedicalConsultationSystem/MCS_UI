<template>
  <view>
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
    </view>
    <view>
      <u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
                     swiperWidth="750"></u-tabs-swiper>
    </view>
    <swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
      <swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
        <scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">
          <view>
            <!-- 自定义导航栏 -->
            <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showAction: true,
      keyword: '',
      list: [{
        name: '待完成'
      },  {
        name: '已完成',
        count: 5
      }],
      // 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
      current: 0, // tabs组件的current值，表示当前活动的tab选项
      swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
      background: {
        // backgroundColor: ''，

        // 导航栏背景图
        // background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
        // 还可以设置背景图size属性
        // backgroundSize: 'cover',

        // 渐变色
        backgroundImage: 'linear-gradient(158deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)47%, rgb(102, 175, 161)80%, rgb(92, 210, 133))'
      }
    }
  },
  onLoad() {
  },
  methods: {
    Tab:function(taburl) {
      uni.navigateTo({
        url: taburl
      })
    },
    // tabs通知swiper切换
    tabsChange(index) {
      this.swiperCurrent = index;
    },
    // swiper-item左右移动，通知tabs的滑块跟随移动
    transition(e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
    // swiper滑动结束，分别设置tabs和swiper的状态
    animationfinish(e) {
      let current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
    // scroll-view到底部加载更多
    onreachBottom() {

    }
  }
}
</script>

<style scoped lang="scss">
.slot-wrap{
  display: flex;
  align-items: center;
  /* 如果您想让slot内容占满整个导航栏的宽度 */
  flex: 1;
  /* 如果您想让slot内容与导航栏左右有空隙 */
  padding: 0 0rpx;
}
.search-wrap {
  margin: 0 20rpx;
  flex: 1;
}
.content {
  margin-top: 20rpx;
}
.menu {
  margin-top: 20rpx;
  display: flex;
  flex-direction: row;
  justify-content:space-around;
}
.menu-item {
  display: flex;
  width: 150rpx;
  height: 100%;
  flex-direction: column;
  align-items: center;
}
.menu-img {
  margin-top: 20rpx;
  width: 80rpx;
  height: 80rpx;
}
.menu-text {
  margin-top: 10rpx;
  font-size: 24rpx;
}
.title{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
}
.text1{
  margin-left: 40rpx;
  margin-top: 40rpx;
  margin-bottom: 20rpx;
  width: 640rpx;
  font-size: 33rpx;
}
.text2{
  width: 60rpx;
  margin-top: 40rpx;
  margin-bottom: 20rpx;
  font-size: 22rpx;
  color: #909399;
}
.into{
  margin-right: 26rpx;
  margin-top: 40rpx;
  margin-bottom: 20rpx;
}
.answer{
  width: 750rpx;
  height: 480rpx;
  display: flex;
  flex-direction: column;
}
.answer-item{
  width: 680rpx;
  height: 120rpx;
  margin-left: 35rpx;
  margin-right: 35rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  // border-bottom:1rpx solid rgba(150,220,270,0.3);
  border-bottom: 1rpx solid rgba(144,147,153,0.3);
}
.answer-item image{
  width: 80rpx;
  height: 80rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
  border-radius: 80rpx;
}
.answer-item text{
  margin-left: 20rpx;
  width: 580rpx;
  text-align: left;
  font-size: 30rpx;
}
</style>
