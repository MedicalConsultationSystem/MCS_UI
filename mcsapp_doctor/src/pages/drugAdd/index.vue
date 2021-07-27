<template>

  <view>
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
    </view>
    <view class="search-wrap" style="padding: 20rpx 10rpx;">
      <!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
      <u-search v-model="keyword" height="65" placeholder="请输入药品拼音缩写" :show-action="showAction" :action-style="{color: '#909399'}" @custom="searchMedicine" @search="searchMedicine"></u-search>
    </view>
    <block v-for="(item,index) in drugInfo" :key="index" class="back_color">
      <view class="drug-information">
        <view class="factory_name">
          <text>{{item.drug_name}}</text>
          <text class="specification">{{item.specification}}</text>
          <view class="icon" @click="jumpToSet(index)">
            <u-icon name="plus" size="35"></u-icon>
          </view>
        </view>
        <view >
          <text class="factory">{{item.factory_name}}</text>
        </view>
      </view>
      <u-line class="line"></u-line>
    </block>
    <view>
      <view class="btn">
        <view class="add_btn">
          <u-button type="primary" u-icon="plus" @click="Tab()">完成添加药物</u-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
name: "drugAdd",
data(){
  return{
    title:"新增药品",
    search:'',
    pinyin:{
      pinyin:"",
    },
    showAction: true,
    keyword: '',
    headers:{
      "x-token":uni.getStorageSync('token'),
    },
    background: {
      backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
    },
    formData:null,
    prescription_id:null,
    drugInfo:[]
  }
},
  onLoad(options){
  this.prescription_id=uni.getStorageSync('prescription_id')
    console.log(this.prescription_id)
  },
  created() {
    this.getDrugList()
  },
  methods:{
  searchMedicine(){
    this.pinyin.pinyin=this.keyword
    console.log(this.pinyin.pinyin)
    let reqJson=JSON.stringify(this.pinyin)
    this.$axios
    .post('https://api.zghy.xyz/drug/findByPinyin',reqJson,{headers:this.headers})
    .then(res=>{
      console.log(res)
      if(res.data.code===0){
        console.log("药品查询成功")
        uni.showToast({
          title:'查询成功',
          duration: 2000
        })
        this.drugInfo=res.data.data
        console.log(this.drugInfo)

      }
    }).catch(errors=>{
      console.log(errors)
    })
  },
  getDrugList(){
    this.$axios
    .get('https://api.zghy.xyz/drug/listAll',{headers:this.headers})
    .then(res=>{
      console.log(res)
      if(res.data.code===0){
        this.drugInfo=res.data.data
      }
    })
  },
    Tab:function() {
      let pages = getCurrentPages(); // 当前页面
      let currPage = pages[pages.length - 1]; //当前页面

      let prevPage = pages[pages.length - 2]; //上一个页面
      prevPage.setData({
        isDoRefresh:true
      })
      uni.navigateBack({
        delta:1,
      })
    },
    jumpToSet(key){
      console.log(this.drugInfo[key])
      let NavData=JSON.stringify(this.drugInfo[key])
      uni.navigateTo({
        url:'../drugSetting/index?drugInfo='+NavData
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
  flex-direction: column;
  margin-left: 40rpx;
  text-align: left;
  padding: 40rpx 0 40rpx 0;
  color: #323233;
  font-size: 28rpx;
}
.factory_name{
  display: flex;
  flex-direction: column;
}
.specification{
  font-size: 22rpx;
  color:#909399;
  margin-left: 460rpx;
  position: absolute;
}
.btn{
  display: flex;
  flex-direction: row;
  margin-top: 700rpx;
  position: fixed;
  bottom: 30rpx;
  .add_btn{
    color: #2979ff;
    margin-left: 240rpx;
  }
}
.back_color{
  background-color: #F5F5F5;
  height: 1667rpx;
}
.line{
  color: #909399;
}
.search-wrap {
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-bottom: 5rpx;
  flex: 1;
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
