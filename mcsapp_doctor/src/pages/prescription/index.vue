<template>
    <view class="back_color">
      <view>
        <!-- 自定义导航栏 -->
        <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
      </view>
      <view>
        <view>
          <u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
                         swiperWidth="750"></u-tabs-swiper>
        </view>
        <swiper :current="swiperCurrent" style="height: 1440rpx;width: 100%;"@transition="transition" @animationfinish="animationfinish">
          <swiper-item class="swiper-item">
            <scroll-view scroll-y style="height: 1440rpx;width: 100%;" @scrolltolower="onreachBottom">
              <view style="height: 40px">
                <u-alert-tips type="warning"  :description="description" :show-icon="false"></u-alert-tips>
              </view>
              <view v-for="card in cards" :key="card.id">
                <view class="prescriptionBoard">
                  <u-card class="prescription" :show-foot=card.footShow :show-head="false" :head-border-bottom="false" :foot-border-bottom="false">
                    <view class="prescription_body" slot="body">
                      <view class="body">
                        <text class="xi_text">西药方</text>
                        <view class="add" @click="addPrescription">
                          <u-icon name="plus" size="20"  class="icon" ></u-icon>
                          <text class="add_text">新增药品</text>
                        </view>
                      </view>
                    </view>
                    <view class="prescription_foot" slot="foot">
                      <view class="foot">
                          <view class="foot_left">
                            <text class="drug_name">{{card.drug_name}}</text>
                            <text class="specification">{{card.specification}}</text>
                            <text class="frequency_name">{{card.frequency_name}}</text>
                          </view>
                          <view class="foot_right">
                            <view>
                              <text>{{card.quantity}}</text>
                              <text>{{card.pack_unit}}</text>
                            </view>
                            <view class="trash_icon">
                              <u-icon name="trash"></u-icon>
                            </view>
                          </view>
                      </view>
                    </view>
                  </u-card>
                </view>
              </view>
              <view>
                <view class="btn">
                  <view class="add_btn">
                    <u-button type="primary" u-icon="plus" @click="addPrescription">新增处方</u-button>
                  </view>
                  <view class="submit_btn">
                    <u-button type="success">提交处方</u-button>
                  </view>
                </view>
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
      index:0,
      rev:null,
      receive:null,
      cards:[],
      footShow:false,
      getPrescriptionParams :{
        consult_id: null
      },
      addPrescriptionInfo:{
        consult_id:null,
        doctor_id:"",
        doctor_name:"",
        org_id:"",
        prescription_type:"1",
        user_id:""
      },
      drugInfo: {
          id:null,
          drug_name:"",
          specification:"10g*9袋",
          usage_name:"",
          quantity:null,
          pack_unit:"盒",
          footShow:false,
        },
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
  created() {
    this.getPrescription();
  },
  onLoad(options){
    if(options.form){
      this.rev=JSON.parse(options.form);
      console.log(this.rev);
      this.cards.unshift(this.rev)
      console.log(this.cards)
    }
    if(options.Info){
      this.receive=JSON.parse(options.Info)
      console.log(this.receive)
    }

  },
  methods:{
    addPrescription(){
      this.addPrescriptionInfo.consult_id=this.receive.consult_id;
      this.addPrescriptionInfo.doctor_id=this.receive.doctor_id;
      this.addPrescriptionInfo.doctor_name=this.receive.doctor_name;
      this.addPrescriptionInfo.org_id=this.receive.org_id;
      this.addPrescriptionInfo.user_id=this.receive.create_user_id;
        let reqJSON=JSON.stringify(this.addPrescriptionInfo);
        console.log(reqJSON)
      this.$axios
      .post('https://api.zghy.xyz/prescription/add',reqJSON)
      .then(res=>{
        console.log(res)
        if(res.data.code===200){
          console.log("处方新增成功！")
        }
      })
    },
    getPrescription(){
      this.getPrescriptionParams.consult_id=this.receive.consult_id;
      let reqJSON=JSON.stringify(this.getPrescriptionParams);
      console.log(reqJSON)
      this.$axios
      .post('https://api.zghy.xyz/prescription/list',reqJSON)
      .then(res=>{
        console.log(res)
        if(res.data.code===0){
          console.log("处方查询成功！")
          console.log(res.data.data)
          this.cards=res.data.data.prescriptions;
        }
      })
    },
    tabsChange(index) {
      this.swiperCurrent = index;
    },
    transition(e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    addInner(e) {
      this.index += 1;
      this.cards.push({
        id: this.index,
      });
      this.drugInfo.footShow=false
      console.log(this.cards);
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
.back_color{
  background-color: #f3f4f6;
  height: 1667rpx;
}
.drug_name{
  font-size: 27rpx;
  color: #303133;
}

.specification{
  font-size: 24rpx;
  color: #303133;
  margin-top: 10rpx;
}
.frequency_name{
  font-size: 22rpx;
  color: #909399;
  margin-top: 20rpx;
}
.btn{
  display: flex;
  flex-direction: row;
  margin-top: 700rpx;
  position: fixed;
  bottom: 50rpx;
  .add_btn{
    color: #2979ff;
    margin-left: 100rpx;
  }
  .submit_btn{
    margin-left: 150rpx;
  }
}
.trash_icon{
  position: absolute;
  margin-left: 50rpx;
}
.foot{
  display: flex;
  flex-direction: row;
}
.foot_left{
  display: flex;
  flex-direction: column;
}
.foot_right{
  position: absolute;
  display: flex;
  flex-direction: row;
  margin-left: 560rpx;
}
.icon{
  color: #2979ff;
}
.prescription_foot{

}
.prescription{
  display: flex;
  flex-direction: column;
}

.prescriptionBoard{
  margin-top: 40rpx;
}
.add{
  display: flex;
  flex-direction: row;
  margin-left: 430rpx;
}
.xi_text{
  font-size: 25rpx;
  color: #323233;
}
.name_text{
  font-size: 20rpx;
  color: #323233;
}
.add_text{
  font-size: 25rpx;
  color:#2979ff;
}
.body{
  display: flex;
  flex-direction: row;
}
.prescription_body{
  height: 20rpx;
}
.pack{
  margin-left: 240rpx;
}
.trash{
  margin-left: 10rpx;
}
.pack_text{
  font-size: 20rpx;
}
</style>
