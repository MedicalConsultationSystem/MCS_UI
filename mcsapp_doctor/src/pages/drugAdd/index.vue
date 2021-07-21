<template>

  <view>
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
    </view>
    <view >
      <u-search placeholder="搜索药品" v-model="keyword"></u-search>
    </view>
    <block v-for="(item,index) in drugInfo" :key="index" class="back_color">
      <view class="drug-information">
        <view class="factory_name">
          <text>{{item.drug_name}}</text>
          <text class="factory">{{item.factory_name}}</text>
        </view>
        <view >
          <text class="specification">{{item.specification}}</text>
        </view>
        <view class="icon" @click="jumpToSet(index)">
          <u-icon name="plus"></u-icon>
        </view>
      </view>
      <u-line class="line"></u-line>
    </block>
  </view>
</template>
<script>
export default {
name: "drugAdd",
data(){
  return{
    title:"新增药品",
    background: {
      backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
    },
    formData:null,
    prescription_id:null,
    drugInfo:[]
  }
},
  onLoad(options){
  if(options.prescription_id){
    console.log(options.prescription_id)
    this.prescription_id=options.prescription_id;
    console.log(this.prescription_id)
  }
  },
  created() {
    this.getDrugList()
  },
  methods:{
  getDrugList(){
    this.$axios
    .get('https://api.zghy.xyz/drug/listAll')
    .then(res=>{
      console.log(res)
      if(res.data.code===0){
        this.drugInfo=res.data.data
      }
    })
  },
    Tab:function(taburl) {
      uni.navigateTo({
        url: taburl
      })
    },
    jumpToSet(key){
      console.log(key);
      this.formData=this.drugInfo[key];
      console.log(this.formData)
      let name="prescription_id";
      let value=parseInt(this.prescription_id)
      console.log(typeof (value))
      this.formData[name]=value
      console.log(this.formData)
      let navData=JSON.stringify(this.formData);
      console.log(navData);
      uni.navigateTo({
        url:'../drugSetting/index?info='+navData
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.factory{
  color:#909399;
  margin-top: 10rpx;
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
.factory_name{
  display: flex;

  flex-direction: column;
}
.specification{
  font-size: 22rpx;
  color:#909399;
  margin-left: 40rpx;
  position: absolute;
}
.back_color{
  background-color: #F5F5F5;
  height: 1667rpx;
}
.line{
  color: #909399;
}
.icon{
  position: absolute;
  margin-left: 620rpx;
  color: #007aff;
}
.apply_text{
  margin-left: 15rpx;
  font-size: 20rpx;
  width: 90rpx;
  color: #323233;
}
</style>
