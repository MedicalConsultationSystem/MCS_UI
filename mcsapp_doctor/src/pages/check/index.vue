<template>
  <view class="content">
    <view>
      <!-- 自定义导航栏 -->
      <u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
    </view>
    <view>
      <u-tabs :list="list" :is-scroll="false" :current="current" active-color="rgb(79, 107, 208)" inactive-color="#909399" font-size="32" height="100" bar-width="95" @change="change"></u-tabs>
    </view>
    <view class="prescription">
      <view class="head">
        <view>
          <text>创业慧康医院处方笺</text>
        </view>
        <view>
          <text>普通药品处方</text>
        </view>
      </view>
      <view class="body">
        <view>
          <text>姓名：{{consult.person_name}}</text>
          <text>性别：{{consult.person_gender_name}}</text>
          <text>年龄：{{consult.person_age}}</text>
          <text>日期：{{prescription.create_time}}</text>
        </view>
        <view>
          <text>身份证号：{{consult.person_card_id}}</text>
          <text>手机号：{{consult.person_phone_no}}</text>
        </view>
        <view class="gap">
          <u-gap bg-color="#c0c4cc" height="30" margin-left="40"></u-gap>
        </view>
        <text>Rp</text>
        <view class="drugList" v-for="(item,index) in drugList" :key="index">
          <view>
            <view>
              <text>{{drugList[index].drug_name}}</text>
              <text>用法：{{drugList[index].dose+drugList[index].dose_unit+"/次 "+drugList[index].frequency_name+""+drugList[index].usage_name}}</text>
            </view>
            <view>
              <text>1.00{{drugList[index].pack_unit}}</text>
            </view>
          </view>
          <view class="price">
            <text>药费：{{drugList[index].price}}元</text>
          </view>
        </view>

      </view>
      <view class="footer">
        <view>
          <text>处方医师：{{consult.doctor_name}}</text>
          <text>审核医师：</text>
          <text>发药医师：</text>
        </view>
        <view>
          <text>盖章：</text>
        </view>
      </view>
      <view class="attention">
        *药品温馨提示：请遵医嘱服药！处方当日有效！
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "问诊处方",
      background: {
        backgroundImage: 'linear-gradient(156deg, rgb(79, 107, 208), rgb(98, 141, 185)70%, rgb(102, 175, 161)110%);'
      },
      list: [],
      headers:{
        "x-token":uni.getStorageSync('token'),
      },
      current: 0,
      consult_id: null,
      consult_index: getApp().globalData.consult_index,
      prescriptions: [],
      prescription:[],
      consult: [],
      drugList: []
    }
  },
  onLoad(options) {
    console.log(options.dataList)
    this.consult=JSON.parse(options.dataList)
    this.consult_id=this.consult.consult_id
    let temp={};
    temp.consult_id=parseInt(this.consult_id);
    let reqJson= JSON.stringify(temp);
    this.$axios.post('https://api.zghy.xyz/prescription/list',reqJson,{headers:this.headers})
        .then(res =>{
          console.log(res);
          this.prescriptions = res.data.data.prescriptions;
          //时间格式处理
          for(let index in this.prescriptions){
            //rfc3339转标准时间
            var str = this.prescriptions[index].create_time;
            var date = new Date(str).toJSON();
            var newDate=new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
            //string转成中国标准时间格式取年月日
            var str2 = newDate.toString();
            str2 = str2.replace("/-/g", "/");
            var oDate1 = new Date(str2); //Sat Jul 24 2021 10:07:38 GMT+0800 (中国标准时间)
            console.log(oDate1);
            this.prescriptions[index].create_time=oDate1.getFullYear()+"-"+oDate1.getMonth()+"-"+oDate1.getDate();
            console.log(this.prescriptions[index].create_time);
          }
          this.prescription = this.prescriptions[0];
          this.drugList = this.prescription.drugs;
          console.log(this.prescription);
          console.log(this.drugList);
          for(let item in this.prescriptions){
            console.log(item);
            let title={};
            if(item==="0"){
              title.name="处方一";
            }else if(item==="1"){
              title.name="处方二";
            }else if(item==="2"){
              title.name="处方三";
            }else if(item==="3"){
              title.name="处方四";
            }else if(item==="4"){
              title.name="处方五";
            }else if(item==="5"){
              title.name="处方六";
            }else if(item==="6"){
              title.name="处方七";
            }else if(item==="7"){
              title.name="处方八";
            }else if(item==="8"){
              title.name="处方九";
            }else if(item==="9"){
              title.name="处方十";
            }
            this.list.push(title);
            console.log(this.list);
          }
        })
  },
  methods: {
    change(index) {
      this.current = index;
      this.prescription=this.prescriptions[index];
      this.drugList = this.prescription.drugs;
      console.log(this.prescription);
    }
  },
}
</script>

<style>
</style>
