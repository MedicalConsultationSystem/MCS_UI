<template>
    <view class="back_color">
      <view>
        <!-- 自定义导航栏 -->
        <u-navbar back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
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
              <view v-for="card in cards" :key="card.prescription_id">
                <view class="prescriptionBoard">
                  <u-card class="prescription"  :head-border-bottom="false" :foot-border-bottom="false">
                    <view class="prescription_head" slot="head">
                      <view class="body">
                        <text class="xi_text">西药方</text>
                        <view class="add" @click="jumpToDrugAdd(card.prescription_id)">
                          <u-icon name="plus" size="20"  class="icon" ></u-icon>
                          <text class="add_text">新增药品</text>
                        </view>
                      </view>
                    </view>
                    <view class="prescription_body" slot="body">
                      <block v-for="item in card.drugs" :key="item.prescription_drug_id" class="back_color">
                        <view class="drug-information">
                          <view class="body_left">
                            <view class="factory_name">
                              <text>{{item.drug_name}}</text>
                              <text class="factory">{{item.factory_name}}</text>
                            </view>
                            <view >
                              <text class="specification">{{item.specification}}</text>
                            </view>
                          </view>
                          <view class="trash_body" @click="delDrug(item.prescription_drug_id)">
                            <u-icon name="trash" size="40rpx"></u-icon>
                          </view>
                        </view>
                        <u-line class="line"></u-line>
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
            </scroll-view>
          </swiper-item>
          <swiper-item class="swiper-item">
            <scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">
              <view v-for="card in submitedCards" :key="card.prescription_id">
                <view class="prescriptionBoard">
                  <u-card class="prescription"  :head-border-bottom="false" :foot-border-bottom="false" show-foot="false">
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
                              <text>{{item.drug_name}}</text>
                              <text class="factory">{{item.factory_name}}</text>
                            </view>
                            <view >
                              <text class="specification">{{item.specification}}</text>
                            </view>
                          </view>
                        </view>
                        <u-line class="line"></u-line>
                      </block>
                    </view>
                  </u-card>
                </view>
              </view>
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
      drugs:[],
      submitedCards:[],
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
    delPrescription(index){
      this.delPrescriptionId.prescription_id=parseInt(index)
      let reqJSON=JSON.stringify(this.delPrescriptionId);
      console.log(reqJSON);
      this.$axios
      .delete('https://api.zghy.xyz/prescription/delPre',{data:reqJSON})
      .then(res=>{
        console.log(res);
        if(res.data.code===0){
          this.getPrescription();
        }
      })

    },
    delDrug(index){
      this.delPrescriptionDrugId.prescription_drug_id=parseInt(index)
      let reqJSON=JSON.stringify(this.delPrescriptionDrugId);
      console.log(reqJSON)
      this.$axios
      .delete('https://api.zghy.xyz/prescription/delDrug',{data:reqJSON})
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
      .post('https://api.zghy.xyz/prescription/add',reqJSON)
      .then(res=>{
        console.log(res)
        if(res.data.code===0){
          console.log("处方新增成功！")
          this.getPrescription();
        }
      })
    },
    getPrescription(){
      this.getPrescriptionParams.consult_id=uni.getStorageSync('consult_id');
      let reqJSON=JSON.stringify(this.getPrescriptionParams);
      console.log(reqJSON)
      this.$axios
      .post('https://api.zghy.xyz/prescription/list',reqJSON)
      .then(res=>{
        console.log(res)
        if(res.data.code===0){
          console.log("处方查询成功！")
          console.log(res.data.data)
          for(let item in res.data.data.prescriptions ){
            if(res.data.data.prescriptions[item].prescription_status==="0"){
              this.cards.push(res.data.data.prescriptions[item])
            }else {
              this.submitedCards.push(res.data.data.prescriptions[item])
            }
          }


        }
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
      .post('https://api.zghy.xyz/prescription/submit',reqJSON)
      .then(res=>{
        console.log(res)
        if(res.data.code===0){
          console.log("提交处方成功")
          this.getPrescription();
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
    animationfinish(e) {
      let current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
    onreachBottom() {

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
  font-size: 24rpx;
  color: #303133;
  margin-top: 10rpx;
}
.body_left{
  display: flex;
  flex-direction: column;
}
.drug-information{
  display: flex;
  flex-direction: row;
  margin-left: 40rpx;
  text-align: left;
  padding: 40rpx 0 40rpx 0;
  color: #323233;
  font-size: 24rpx;
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
  height: 10rpx;
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
.trash_body{
  position: absolute;
  margin-left: 540rpx;
  margin-top: 10rpx;
}
.foot_trash{
  position: absolute;
  color: #dd524d;
  margin-left: 580rpx;
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
}
</style>
