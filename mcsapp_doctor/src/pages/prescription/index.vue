<template>
<<<<<<< HEAD
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
=======
    <view class="content">
      <view>
        <!-- 自定义导航栏 -->
        <u-navbar back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
      </view>
      <view class="tabs">
        <view class="tab_item" :class="{cur:index === tabCur}" v-for="(item, index) in ['待提交', '已开方']" :key="index" @click="tabSelect(index)">{{ item }}</view>
      </view>
      <!-- 标签页对应的内容 -->
      <view v-if="tabCur === 0">
        <view class="container">
          <u-sticky>
            <!-- 只能有一个根元素 -->
            <view class="sticky">
              {{description}}
              {{receive.drug_names}}
            </view>
          </u-sticky>
        </view>
        <scroll-view class="answer" :scroll-y="true">
          <view v-for="card in cards" :key="card.prescription_id" >
            <view >
              <u-card class="prescription"  :border="false" :head-border-bottom="false" :foot-border-top="false">
                <view class="prescription_head" slot="head">
                  <view class="body">
                    <text class="xi_text">西药方</text>
                    <view class="add" @click="jumpToDrugAdd(card.prescription_id)">
                      <u-icon name="plus" size="25"  class="icon" ></u-icon>
                      <text class="add_text">新增药品</text>
                    </view>
                  </view>
                </view>
                <view class="prescription_body" slot="body">
                  <block v-for="item in card.drugs" :key="item.prescription_drug_id" class="back_color">
                    <view class="drug-information">
                      <view class="body_left">
                        <view class="factory_name">
                          <text class="drug_name">{{item.drug_name}}</text>
                        </view>
                        <view >
                          <text class="specification">{{item.specification}}</text>
                        </view>
                        <view class="usage_set">
                          <text class="usage">{{usage}}</text>
                          <text class="usage">{{item.usage_name}}</text>
                        </view>
                      </view>
                      <view class="quantity">
                        <text class="text_set">{{item.quantity}}</text>
                        <text class="text_set">{{item.pack_unit}}</text>
                      </view>
                      <view class="trash_body" @click="delDrug(item.prescription_drug_id)">
                        <u-icon name="trash" size="40rpx"></u-icon>
                      </view>
                    </view>
                  </block>
                </view>
                <view class="prescription_foot" slot="foot">
                  <view class="foot_trash" @click="delPrescription(card.prescription_id)" >
                    <u-icon name="trash" size="40rpx"></u-icon>
                  </view>
                </view>
              </u-card>
            </view>
          </view>
        </scroll-view>
        <view>
          <view class="btn">
            <view class="add_btn">
              <u-button type="primary" u-icon="plus" @click="addPrescription">新增处方</u-button>
            </view>
            <view class="submit_btn">
              <u-button type="success" @click="sumPrescription">提交处方</u-button>
            </view>
          </view>
        </view>
      </view>
      <view v-else-if="tabCur === 1">
        <scroll-view class="answer1" :scroll-y="true">
        <view v-for="card in submitedCards" :key="card.prescription_id">
          <view class="prescriptionBoard">
            <u-card class="prescription"  :border="false" :head-border-bottom="false" :foot-border-bottom="false" show-foot="false">
              <view class="prescription_head" slot="head">
                <view class="body">
                  <text class="xi_text">西药方</text>
                </view>
              </view>
              <view class="prescription_body" slot="body">
                <block v-for="item in card.drugs" :key="item.prescription_drug_id" class="back_color">
                  <view class="drug-information">
                    <view class="body_left">
                      <view class="factory_name">
                        <text class="drug_name">{{item.drug_name}}</text>
                      </view>
                      <view >
                        <text class="specification">{{item.specification}}</text>
                      </view>
                      <view class="usage_set">
                        <text class="usage">{{usage}}</text>
                        <text class="usage">{{item.usage_name}}</text>
                      </view>
                    </view>
                    <view class="quantity">
                      <text>{{item.quantity}}</text>
                      <text>{{item.pack_unit}}</text>
                    </view>
                  </view>
                </block>
              </view>
            </u-card>
          </view>
        </view>
        </scroll-view>
>>>>>>> mcsapp_doctor
      </view>
    </view>
</template>

<script>
export default {
name: "prescription",
  data() {
    return {
<<<<<<< HEAD
      description:`患者所需药品`,
      title: "电子处方",
      list: [{
=======
      description:"患者所需药品:",
      title: "电子处方",
      index:0,
      tabCur: 0,
      rev:null,
      receive:null,
      cards:[],
      drugs:[],
      usage:"用法:",
      submitedCards:[],
      headers:{
        "x-token":uni.getStorageSync('token'),
      },
      footShow:false,
      consult_id:null,
      prescription_ids:{
        prescription_ids:[]
      },
      prescription_id: null,
      getPrescriptionParams :{
        consult_id:null
      },
      delPrescriptionDrugId :{
        prescription_drug_id:null
      },
      delPrescriptionId :{
        prescription_id:null,
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
      list: [
          {
>>>>>>> mcsapp_doctor
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
<<<<<<< HEAD
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

=======
  onShow(e){
    let pages = getCurrentPages();
    let currPage = pages[pages.length-1];
    if (currPage.data.isDoRefresh == true){
      currPage.data.isDoRefresh = false;
      this.getPrescription();
    }else{
//不用刷新
    }
  },
  onLoad(options){
    this.getPrescription();
    if(options.patientInfo){
      this.receive=JSON.parse(options.patientInfo)
      console.log(this.receive)
    }
    if(options.form){
      this.rev=JSON.parse(options.form);
      console.log(this.rev);
      this.cards.unshift(this.rev)
      console.log(this.cards)
    }
  },
  methods:{

    tabSelect(index) {
      if (this.tabCur === index) return
      this.tabCur = index
    },
    delPrescription(index){
      this.delPrescriptionId.prescription_id=parseInt(index)
      let reqJSON=JSON.stringify(this.delPrescriptionId);
      console.log(reqJSON);
      this.$axios
      .delete('https://api.zghy.xyz/prescription/delPre',{data:reqJSON,headers:this.headers},)
      .then(res=>{
        console.log(res);
        if(res.data.code===0){
          this.getPrescription();
        }
      })
          .catch(errors=>{
            console.log(errors)
          })

    },
    delDrug(index){
      this.delPrescriptionDrugId.prescription_drug_id=parseInt(index)
      let reqJSON=JSON.stringify(this.delPrescriptionDrugId);
      console.log(reqJSON)
      this.$axios
      .delete('https://api.zghy.xyz/prescription/delDrug',{data:reqJSON,headers:this.headers})
      .then(res=>{
        console.log(res)
        if(res.data.code===0){
          console.log("处方药物删除成功")
          this.getPrescription();
        }
      })
    },
    addPrescription(){
      this.addPrescriptionInfo.consult_id=uni.getStorageSync('consult_id');
      this.addPrescriptionInfo.doctor_id=this.receive.doctor_id;
      this.addPrescriptionInfo.doctor_name=this.receive.doctor_name;
      this.addPrescriptionInfo.org_id=this.receive.org_id;
      this.addPrescriptionInfo.user_id=this.receive.create_user_id;
        let reqJSON=JSON.stringify(this.addPrescriptionInfo);
        console.log(reqJSON)
      this.$axios
      .post('https://api.zghy.xyz/prescription/add',reqJSON,{headers:this.headers})
      .then(res=>{
        console.log(res)
        if(res.data.code===0){
          console.log("处方新增成功！")
          this.getPrescription();
        }
      }).catch(errors=>{
            console.log(errors)
          })
    },
    getPrescription(){
      this.getPrescriptionParams.consult_id=uni.getStorageSync('consult_id');
      let reqJSON=JSON.stringify(this.getPrescriptionParams);
      console.log(reqJSON)
      this.$axios
      .post('https://api.zghy.xyz/prescription/list',reqJSON,{headers:this.headers})
      .then(res=>{
        console.log(res)
        if(res.data.code===0){
          console.log("处方查询成功！")
          console.log(res.data.data)
          this.cards=[]
          this.submitedCards=[]
          for(let item in res.data.data.prescriptions ){
            if(res.data.data.prescriptions[item].prescription_status==="0"){
              this.cards.push(res.data.data.prescriptions[item])
              console.log(this.cards)
            }else {
              this.submitedCards.push(res.data.data.prescriptions[item])
            }
          }


        }
      })
          .catch(errors=>{
        console.log(errors)
      })
    },
    sumPrescription(){
      let prescription_ids=[]
      console.log(this.cards)
        for(let item in this.cards){
          prescription_ids.push(this.cards[item].prescription_id)
        }
        this.prescription_ids.prescription_ids=prescription_ids
        console.log(this.prescription_ids)
        let reqJSON=JSON.stringify(this.prescription_ids)
      this.$axios
      .post('https://api.zghy.xyz/prescription/submit',reqJSON,{headers:this.headers})
      .then(res=>{
        console.log(res)
        if(res.data.code===0){
          console.log("提交处方成功")
          this.getPrescription();
        }
      })
          .catch(errors=>{
            console.log(errors)
          })
    },
    jumpToDrugAdd(params){
      console.log(params)
      uni.setStorage({
        key:'prescription_id',
        data:params
      })
      uni.navigateTo({
        url:'../drugAdd/index'
      })
>>>>>>> mcsapp_doctor
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
<<<<<<< HEAD
.btn{
  margin-top: 1000rpx;
=======

.content{
  background-color: #f3f4f6;
  height: 1667rpx;
}
.back_color{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

}
.usage_set{
  margin-top: 10rpx;
}
.tip{
  width: 100%;
  height: 40rpx;
  display: flex;
  flex-direction: row;
}
.drug_name{
  font-size: 27rpx;
  color: #303133;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  font-size: 32rpx;
  background-color: #FFF;
  color: #A9A9A9;
}
.container {
}

.sticky {
  width: 750rpx;
  background-color: #a0cfff;
  color: #fff;
  padding: 24rpx;
}
.tab_item {
  height: 114rpx;
  line-height: 100rpx;

  &.cur {
    position: relative;
    color: #F62D5C;

    &:after {
      content: '';
      width: 36rpx;
      height: 6rpx;
      position: absolute;
      bottom: 20rpx;
      left: 50%;
      margin-left: -18rpx;
      background-color: #F62D5C;
    }
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
.specification{
  font-size: 27rpx;
  color: #303133;
  margin-top: 20rpx;
}
.drug_name{
  font-size: 28rpx;
}
.usage{
  font-size: 26rpx;
  color: #909399;
  margin-top: 20rpx;
}
.quantity{
  position: absolute;
  display: flex;
  flex-direction: row;
  margin-left: 480rpx;
  margin-top: 10rpx;
}
.text_set{
  font-size: 26rpx;
}
.body_left{
  display: flex;
  flex-direction: column;
}
.factory_name{
  margin-top: 10rpx;
}
.drug-information{
  display: flex;
  flex-direction: row;
  text-align: left;
  padding: 40rpx 0 40rpx 0;
  color: #323233;
  font-size: 24rpx;
}
.answer{
  width: 750rpx;
  height: 1180rpx;
  display: flex;

  flex-direction: column;
}
.answer1{
  width: 750rpx;
  height: 1420rpx;
  display: flex;
  flex-direction: column;
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
  height: 20rpx;
  align-content: center;
}
.prescription{
  display: flex;
  flex-direction: column;
}
.top{
  display: flex;
  flex-direction: row;
  height: 40rpx;
  color: #fdf6ec;
}
.prescriptionBoard{
  //margin-top: 20rpx;
  //height: 1000rpx;
}
.add{
  display: flex;
  flex-direction: row;
  margin-left: 380rpx;
}
.xi_text{
  font-size: 28rpx;
  color: #323233;
}
.name_text{
  font-size: 20rpx;
  color: #323233;
}
.add_text{
  font-size: 28rpx;
  color:#2979ff;
}
.trash_body{
  position: absolute;
  margin-left: 540rpx;
  margin-top: 10rpx;
}
.foot_trash{
  position: absolute;
  color: #dd524d;
  margin-left: 540rpx;
  align-content: center;
}
.body{
  display: flex;
  flex-direction: row;
}
.prescription_head{
  height: 20rpx;
}
.pack{
  margin-left: 240rpx;
}
.trash{
  margin-left: 10rpx;
  size: 30rpx;
}
.pack_text{
  font-size: 20rpx;
>>>>>>> mcsapp_doctor
}
</style>
