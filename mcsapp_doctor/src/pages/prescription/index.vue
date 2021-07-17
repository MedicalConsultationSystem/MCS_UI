<template>
    <view>
      <view>
        <!-- 自定义导航栏 -->
        <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
      </view>
      <view>
        <view>
          <u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
                         swiperWidth="750"></u-tabs-swiper>
        </view>
        <swiper :current="swiperCurrent" style="height: 1170rpx;width: 100%;"@transition="transition" @animationfinish="animationfinish">
          <swiper-item class="swiper-item">
            <scroll-view scroll-y style="height: 1170rpx;width: 100%;" @scrolltolower="onreachBottom">
              <view style="height: 40px">
                <u-alert-tips type="warning"  :description="description" :show-icon="false"></u-alert-tips>
              </view>
              <view class="prescriptionBoard">
                <u-card class="prescription" box-shadow="2px 3px 8px #888888">
                  <view class="prescription_head" slot="head">
                    <u-row class="head_row">
                      <span gutter="3">
                          <text class="xi_text">西药方</text>
                      </span>
                      <span gutter="3">
                        <view class="add" @click="Tab('../drugAdd/index')">
                          <u-icon name="plus" size="15"></u-icon>
                          <text class="add_text">新增药品</text>
                        </view>
                      </span>
                    </u-row>
                  </view>
                  <view class="prescription_body" slot="body">
                    <u-row class="head_row">
                      <span gutter="3">
                          <text class="name_text">{{drugInfo[0].drug_name}}({{drugInfo[0].nickname}})({{drugInfo[0].type}})</text>
                      </span>
                      <span gutter="3">
                        <view class="pack">
                          <text class="pack_text">{{drugInfo[0].pack}}{{drugInfo[0].pack_unit}}</text>
                        </view>
                      </span>
                      <span gutter="3">
                        <view class="trash">
                          <u-icon name="trash" ></u-icon>
                        </view>
                      </span>
                    </u-row>
                    <view>
                      <text class="xi_text">{{drugInfo[0].specification}}</text>
                    </view>
                    <view>
                      <text class="xi_text">{{drugInfo[0].usage}}</text>
                    </view>
                  </view>
                </u-card>
              </view>
              <view>
                <u-row class="btn">
                  <u-button type="primary" u-icon="plus" @click="Tab('../drugSetting/index')">新增处方</u-button>
                  <u-button type="success">提交处方</u-button>
                </u-row>
              </view>
            </scroll-view>
          </swiper-item>
          <swiper-item class="swiper-item">
            <scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">
              ...
            </scroll-view>
          </swiper-item>
        </swiper>
      </view>
    </view>
</template>

<script>
export default {
name: "prescription",
  data() {
    return {
      description:`患者所需药品`,
      title: "电子处方",
      drugInfo:[
        {
          drug_name:"阿莫西林胶囊",
          nickname:"阿莫仙",
          type:"医,农",
          specification:"10g*9袋",
          usage:"bid(口服)",
          pack:1,
          pack_unit:"盒"
        }
      ],
      list: [{
        name: '待提交'
      }, {
        name: '已开方'
      }],
      current:0,
      swiperCurrent:0,
      background: {
        backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
      }
    }
  },
  methods:{
    tabsChange(index) {
      this.swiperCurrent = index;
    },
    transition(e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    animationfinish(e) {
      let current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
    onreachBottom() {

    },
    Tab:function(taburl) {
      uni.navigateTo({
        url: taburl
      })
    }
  }

}
</script>

<style scoped lang="scss">
.btn{
  margin-top: 700rpx;
}
.prescription{
  display: flex;
  flex-direction: column;
}
.prescriptionBoard{
  margin-top: 40rpx;
}
.xi_text{
  font-size: 20rpx;
  color: #323233;
}
.name_text{
  font-size: 20rpx;
  color: #323233;
}
.add_text{
  font-size: 20rpx;
}
.icon_size{
  size: 10;
}
.prescription_head{
  height: 20rpx;
}
.add{
  margin-left: 440rpx;
}
.pack{
  margin-left: 240rpx;
}
.trash{
  margin-left: 45rpx;
}
.pack_text{
  font-size: 20rpx;
}
</style>
