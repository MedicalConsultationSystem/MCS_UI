<template>
	<view class="content">
		<view class="nav">
			<!-- 自定义导航栏 -->
			<u-navbar :is-back="false" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
		</view>
		<view class="search-wrap" style="padding: 20rpx 10rpx;">
			<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
			<u-search v-model="keyword" height="65" placeholder="可搜索医生姓名" :show-action="showAction" :action-style="{color: '#909399'}"></u-search>
		</view>
		<view class="doctorInfo" v-for="(item,index) in doctorList" :key="index" @click="chooseDoctor(index)">
			<view class="doctor">
				<image :src="item.avatar_url"></image>
				<view class="name_text">
					<text class="name_text1">{{item.doctor_name}}</text>
					<view v-if="item.level_name!==''">
						<text class="name_text2">{{item.level_name}}</text>
					</view>
					
				</view>
			</view>
			<view class="department">
				<text>{{item.dept_name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "搜索医生",
				showAction: true,
				keyword: '',
				background: {
					backgroundImage: 'linear-gradient(156deg, rgb(79, 107, 208), rgb(98, 141, 185)70%, rgb(102, 175, 161)110%);'
				},
				doctorList: [],
				doctor:{
					name:"",
					level:"",
					department:"",
					src:"../../static/touxiang/touxiang5.jpg"
				}
			}
		},
		created() {
			this.loadDoctor();
		},
		onLoad() {
	
		},
		methods: {
			loadDoctor(){	
				this.$axios.get('https://api.zghy.xyz/doctor/listAll')
					.then(res=>{
						let list=res.data.data;
						console.log(res);
						if(res.data.code===0){
							this.doctorList=res.data.data;
						}
					})
			},
			chooseDoctor(key){
				this.doctor.name=this.doctorList[key].doctor_name;
				this.doctor.level=this.doctorList[key].level_name;
				this.doctor.department=this.doctorList[key].dept_name;
				// this.doctor.src=this.doctorList[key].avatar_url;
				console.log(this.doctor);
				uni.$emit('doctorData',this.doctor);
				uni.navigateBack();
			}
			
		},
	}
</script>

<style>
	.content{
		display: flex;
		flex-direction: column;
	}
	.search-wrap {
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 5rpx;
		flex: 1;
	}
	.doctorInfo{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid rgba(144,147,153,0.3);
		margin-left: 30rpx;
		margin-right: 30rpx;
	}
	.doctor{
		display: flex;
		flex-direction: row;
	}
	.doctor image{
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
	}
	.name_text{
		display: flex;
		flex-direction: column;
		height: 85rpx;
		align-content: center;
		margin-left: 20rpx;
		font-size: 35rpx;
	}
	.name_text text{
		margin-top: 5rpx;
		margin-bottom: 5rpx;
	}
	.name_text1{
		margin-left: 5rpx;
		font-size: 27rpx;
	}
	.name_text2{
		border: 1rpx solid #ff9900;
		border-radius: 30rpx;
		font-size: 20rpx;
		color: #ff9900;
		padding-left: 10rpx;
		padding-right: 10rpx;
		padding-bottom: 2rpx;
	}
	.department{
		margin-right: 10rpx;
		font-size: 25rpx;
		color: #909399;
	}
</style>
