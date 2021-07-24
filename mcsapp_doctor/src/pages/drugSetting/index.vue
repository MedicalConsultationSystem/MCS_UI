<template>
  <view>
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
    </view>
    <view>
      <u-form :model="form" ref="uForm">
        <view class="">
          <u-field @click="Tab('../drugAdd/index')" v-model="form.drug_name"
                   :disabled="true" label="药品" placeholder="请选择药品"
                   right-icon="arrow-down-fill"
          >
          </u-field>
        </view>
        <view class="dose">
          <u-form-item label="剂量" class="item_margin"><u-number-box v-model="value1" index="1" @change="doseChange" class="nb"></u-number-box></u-form-item>
        </view>
        <view class="">
          <u-field @click="showFrequency" v-model="frequency_name"
                   label="频次" placeholder="请选择频次"
                   :disabled="true"
                   right-icon="arrow-down-fill"
          >
          </u-field>
          <u-action-sheet @click="clickFrequency" :list="frequency_nameList" v-model="showF"></u-action-sheet>
        </view>
        <view class="">
          <u-field @click="showUsage" v-model="usage_name"
                   label="用法" placeholder="请选择用法"
                   :disabled="true"
                   right-icon="arrow-down-fill"
          >
          </u-field>
          <u-action-sheet @click="clickUsage" :list="usageList" v-model="showU"></u-action-sheet>
        </view>
        <view class="take_days">
          <u-form-item label="用药天数(天)"><u-number-box v-model="value2" @change="take_daysChange" index="2" class="nb"></u-number-box></u-form-item>
        </view>
        <view class="quantity">
          <u-form-item label="总量(盒)"><u-number-box v-model="value3" class="nb" index="3" @change="quantityChange"></u-number-box></u-form-item>
        </view>
        <view class="remark">
          <u-input placeholder="请输入备注(选填)" v-model="this.form.remark" :type="type" :border="true" :auto-height=true />
        </view>
      </u-form>
    </view>
    <view>
      <view class="btn">
        <view class="add_btn">
          <u-button type="primary" u-icon="plus" @click="Tab('../drugAdd/index')">取消</u-button>
        </view>
        <view class="submit_btn">
          <u-button type="success" @click="addDrug">确定</u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
name: "drugSetting",
  data(){
  return{
    title:"药品设置",
    usage_name: '',
    usageList:[
      {
        text: '口服',
      },
      {
        text: '外用'
      },
      {
        text: '皮下注射'
      },
      {
        text: '静脉注射'
      }
    ],
    frequency_name:'',
    frequency_nameList:[
      {
        text: 'qd(每日一次)',
      },
      {
        text: 'bid(每日两次)'
      },
      {

        text: 'tiw(每周三次)'
      },
      {
        text: '2w(每两周一次)'
      }
    ],
    showU: false,
    showF: false,
    receive:null,
    form: {
      prescription_id:null,
      drug_id:null,
      drug_name: null,
      dose:null,
      org_id: 1,
      dose_unit:null,
      frequency_name:"",
      frequency_code:1,
      pack_unit: null,
      specification:null,
      usage_name:"",
      usage_code:1,
      group_number:1,
      take_days:"",
      quantity:"",
      remark:"",
      price:null,
    },
    value1: 0,
    value2: 0,
    value3: 0,
    background: {
      backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
    }
  }
  },
  onLoad(options){
    this.receive=JSON.parse(options.drugInfo)
    console.log(this.receive)
    console.log(this.form.prescription_id)
    this.form.drug_id=this.receive.drug_id
    this.form.drug_name=this.receive.drug_name
    console.log(this.form.drug_name)
    this.form.dose_unit = this.receive.dose_unit
    this.form.dose=this.receive.dose
    this.form.pack_unit=this.receive.pack_unit
    this.form.specification=this.receive.specification
    this.form.prescription_id=uni.getStorageSync('prescription_id')
    this.form.price=this.receive.price
  },
  methods:{
  jumpToPrescription(){
    console.log(this.form)
    let navData=JSON.stringify(this.form);
    uni.navigateTo({
      url:'../prescription/index?form='+navData
    })
  },
    take_daysChange(e){
      console.log(e)
      if(e.index==="2")
      {
        this.form.take_days=e.value
        console.log(this.form.take_days)
      }
    },
    quantityChange(e){
      if(e.index==="3"){
        this.form.quantity=e.value
        console.log(this.form.quantity)
      }
    },
    doseChange(e){
      if(e.index==="1"){
        this.form.dose=e.value
        console.log(this.form.dose)
      }
    },
    confirm(e) {
      console.log(e);
      this.form.frequency_name=e[0].label
      console.log(this.form.frequency_name)
    },
    Tab:function() {
      uni.navigateBack({
        delta:1
      })
    },
    addDrug(){
      console.log(this.form.prescription_id)
      let reqJSON=JSON.stringify(this.form)
      console.log(reqJSON)
      this.$axios
      .post('https://api.zghy.xyz/prescription/addDrug',reqJSON)
      .then(res=>{
        console.log(res)
        if(res.data.code===0){
          console.log("药物添加成功")
          this.Tab()
        }

      })
    },
    showFrequency() {
      this.showF = true;
    },
    showUsage() {
      this.showU = true;
    },
    clickUsage(index) {
      this.usage_name = this.usageList[index].text;
      this.form.usage_name=this.usage_name
    },
    clickFrequency(index) {
      this.frequency_name = this.frequency_nameList[index].text;
      this.form.frequency_name=this.frequency_name
  }
  }

}
</script>

<style lang="scss" scoped>
.btn{
  display: flex;
  flex-direction: row;
  margin-top: 700rpx;
  position: fixed;
  bottom: 30rpx;
  .add_btn{
    color: #2979ff;
    margin-left: 140rpx;
  }
  .submit_btn{
    margin-left: 150rpx;
  }
}
.dose{
  margin-left: 30rpx;
}
.quantity{
  margin-left: 30rpx;
}
.take_days{
  margin-left: 30rpx;
}

.nb{
  margin-left: 400rpx;
}
.btn_cancel{
  margin-left: 80rpx;
}
.btn_confirm{
  margin-left: 320rpx;
}
.item_margin{
  margin-left: 30rpx;
}
.remark{
  margin-left: 30rpx;
}
.remark_input{
  height: 120rpx;
}
.btn{
  position: fixed;
  margin-top: 230rpx;
}
</style>
