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
          <u-action-sheet @click="clickFrequency" :list="frequency_nameList" v-model="showF"></u-action-sheet>
        </view>        <u-form-item label="剂量" class="item_margin"><u-number-box v-model="form.dose" class="nb"></u-number-box></u-form-item>
        <view class="">
          <u-field @click="showFrequency" v-model="form.frequency_name"
                   :disabled="true" label="频次" placeholder="请选择频次"
                   right-icon="arrow-down-fill"
          >
          </u-field>
          <u-action-sheet @click="clickFrequency" :list="frequency_nameList" v-model="showF"></u-action-sheet>
        </view>
        <view class="">
          <u-field @click="showUsage" v-model="form.usage_name"
                   :disabled="true" label="用法" placeholder="请选择用法"
                   right-icon="arrow-down-fill"
          >
          </u-field>
          <u-action-sheet @click="clickUsage" :list="usageList" v-model="showU"></u-action-sheet>
        </view>
        <u-form-item label="用药天数(天)" class="item_margin"><u-number-box v-model="form.take_days" class="nb"></u-number-box></u-form-item>
        <u-form-item class="item_margin" label="总量(盒)"><u-number-box v-model="form.quantity" class="nb"></u-number-box></u-form-item>
        <u-input placeholder="请输入备注(选填)" v-model="form.remark" :type="type" :border="true" class="remark_input" :auto-height=true />
      </u-form>
    </view>
    <view>
      <u-row class="btn">
        <u-button type="primary" u-icon="plus" @click="Tab('../drugAdd/index')" class="btn_cancel">取消</u-button>
        <u-button type="success" @click="jumpToPrescription" class="btn_confirm">确定</u-button>
      </u-row>
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
    form: {
      id:2,
      drug_name: "",
      dose:"",
      frequency_name:"",
      specification:"10g*9袋",
      usage_name:"",
      take_days:"",
      quantity:"",
      sex: '',
      remark:"",
      footShow: true
    },
    value: 0,
    background: {
      backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
    }
  }
  },
  onLoad(options){
    this.form.drug_name=JSON.parse(options.name)
    console.log(data)
  },
  methods:{
  jumpToPrescription(){
    console.log(this.form)
    let navData=JSON.stringify(this.form);
    uni.navigateTo({
      url:'../prescription/index?form='+navData
    })
  },
    Tab:function(taburl) {
      uni.navigateTo({
        url: taburl
      })
    },

    showFrequency() {
      this.showF = true;
    },
    showUsage() {
      this.showU = true;
    },
    clickUsage(index) {
      this.form.usage_name = this.usageList[index].text;
    },
    clickFrequency(index) {
      this.form.frequency_name = this.frequency_nameList[index].text;
    }
  }

}
</script>

<style lang="scss" scoped>
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
.remark_input{
  height: 120rpx;
}
.btn{
  position: fixed;
  margin-top: 230rpx;
}
</style>
