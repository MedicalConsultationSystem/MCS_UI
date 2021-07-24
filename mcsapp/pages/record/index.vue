<template>
	<view class="content" style="height: 1667rpx; background-color: #f5f5f5;">
		<view class="nav">
			<!-- 自定义导航栏 -->
			<u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
		</view>
		<!-- 配药记录面板 -->
		<view class="recordboard" v-for="(item,index) in consult" :key="index">
			<u-card class="record" >
				<view class="record_head" slot="head">
					<view class="time">
						<text>问诊时间：{{item.create_time}}</text>
					</view>
					<view class="status" v-if="item.consult_status===3">
						<text style="color: #ff9900">已完成</text>
					</view>
					<view class="status" v-else-if="item.consult_status===2">
						<text style="color: #ff9900">进行中</text>
					</view>
					<view class="status" v-else>
						<text style="color: #ff9900">待处理</text>
					</view>
				</view>
				<view class="record_body" slot="body">
					<image :src="record.docsrc"></u-image>
					<view class="record_body_text">
						<view style="margin-bottom: 8rpx;">
							<text class="record_text1">{{item.doctor_name}}</text>
							<text class="record_text2">在线云诊室</text>
						</view>
						<text class="record_text2">就诊人：{{item.person_name}}</text>
						<text class="record_text2">病情：{{item.diagnosis}}</text>
					</view>
				</view>
				<view class="record_foot" slot="foot">
					<text>复诊配药</text>
					<view v-if="item.consult_status===3">
						<u-button type="success" size="mini" :plain="true" shape="circle" @click="checkPrescription(checkUrl,index)">查看处方</u-button>
					</view>
				</view>
			</u-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkUrl: "../record/check",
				title: "配药记录",
				background: {
					backgroundImage: 'linear-gradient(156deg, rgb(79, 107, 208), rgb(98, 141, 185)70%, rgb(102, 175, 161)110%);'
				},
				record: {
					docsrc: "../../static/touxiang/touxiang4.jpg",
					docname: "林玉娇",
					patientname: "张伟",
					description: "哮喘",
					asktime: "2021-05-24 11:26",
					iscomplete: true
				},
				user:{
					create_user_id:"",
					user_type:"",
					phone_no:""
				},
				consult:[]
			}
		},
		onLoad() {
			var user = getApp().globalData.userInfo;
			console.log(user);
			this.user.create_user_id=user.user_id;
			this.user.user_type=user.user_type;
			this.user.phone_no=user.phone_no;
			let temp={};
			temp.create_user_id=this.user.create_user_id
			let reqJson= JSON.stringify(temp);
			console.log(reqJson);
			this.$axios.post('https://api.zghy.xyz/consult/findByUser',reqJson)
				.then(res =>{
					console.log(res);
					//问诊时间RFC3339格式转标准格式			
					this.consult=res.data.data;
					for(let item in this.consult){
						var str = this.consult[item].create_time;
						var date = new Date(str).toJSON();
						var newDate=new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
						this.consult[item].create_time=newDate;
						console.log(this.consult[item].create_time);
					}
					getApp().globalData.consult=this.consult;
					console.log(this.consult);
				})
		},
		methods: {
			checkPrescription:function(taburl,key) {
				// let temp2={};
				// temp2.consult_id=this.consult[key].consult_id;
				// let reqJson2= JSON.stringify(temp2);
				// this.$axios.post('https://api.zghy.xyz/prescription/list',reqJson2)
				// 	.then(res2 =>{
				// 		console.log(res2);
				// 		getApp().globalData.prescriptions = res2.data.data.prescriptions[0];
				// 		console.log(12);
				// 		console.log(getApp().globalData.prescriptions);
				// 	})
				getApp().globalData.consult_id=this.consult[key].consult_id;
				getApp().globalData.consult_index=key;
				console.log(getApp().globalData.consult_id);
				uni.navigateTo({
					url: taburl
				})
			}
		},
	}
</script>

<style>
	.record_head{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.time{
		width: 500rpx;
	}
	.status{
		width: 105rpx;
	}
	.record_head text{
		font-size: 32rpx;
	}
	.record_body{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: left;
	}
	.record_body_text{
		display: flex;
		flex-direction: column;
		margin-left: 35rpx;
	}
	.record_text1{
		font-size: 36rpx;
		margin-right: 15rpx;
		font-weight: bold;
	}
	.record_text2{
		color: #909399;
		font-size: 32rpx;
		margin-bottom: 8rpx;
	}
	.record_body image{
		width: 150rpx;
		height: 150rpx;
		border-radius: 75rpx;
	}
	.record_foot{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.record_foot text{
		font-size: 32rpx;
	}
</style>
