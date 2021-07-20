<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<view class="nav1" v-if="navShow1">
			<u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
		</view>
		<view class="nav2" v-if="navShow2">
			<u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
		</view>
		<!-- 选择医生面板 -->
		<view class="doctorboard">
			<u-card class="doctor" box-shadow="2px 3px 8px #888888">
				<view class="doctor_head" slot="head">
					<image :src="doctor.src"></u-image>
					<view class="name_text">
						<text class="name_text1">方洪全</text>
						<text class="name_text2">主任医师</text>
					</view>
					<view class="change" @click="changeDoctor(doctorUrl)">
						<text class="change_text">更换医生</text>
						<u-icon class="change_icon" name="arrow-right" size="30"></u-icon>
					</view>
				</view>
				<view class="doctor_body" slot="body">
					<text>呼吸内科</text>
				</view>
			</u-card>
		</view>
	
		<view class="patient_board">
			<view class="patient_item">
				<text class="text1">问诊人</text>
				<view class="text2" @click="patientinfo_show=true">
					<text >请填写问诊人信息</text>
					<u-icon class="change_icon" name="arrow-right" size="27"></u-icon>
				</view>
			</view>
			<view class="patient_item">
				<text class="text1">确诊诊断</text>
				<view class="patient_input">
					<input class="pageinput" placeholder="请填写病情诊断" placeholder-style='text-align:right'  style="text-align:right" v-model="patient.illness"/>
				</view>
			</view>
			<view class="patient_item2">
				<text class="text1">所需药品</text>
				<view class="text2" @click="chooseDrug(drugUrl)">
					<text >添加药品</text>
					<u-icon class="change_icon" name="arrow-right" size="27"></u-icon>
				</view>
				
			</view>
			<view class="drug_tag">
				<u-tag text="岑参" closeable :show="true" shape="circle" @close="tagClick" />
			</view>
		</view>
		<view class="illness_description">
			<view class="gap">
				<u-gap bg-color="#c0c4cc" height="30" margin-left="40"></u-gap>
			</view>
			<view class="description">
				<text class="desc_text">病情描述</text>
				<view class="desc_input">
					<u-input type="textarea" placeholder="请填写病情描述" v-model="patient.description"/>
				</view>
			</view>
		</view>
		<view class="illness_photos">
			<view class="gap">
				<u-gap bg-color="#c0c4cc" height="30" margin-left="40"></u-gap>
			</view>
			<view class="upload">
				<text class="uptext">病情照片</text>
				<view class="upimg">
					<u-upload width="160" height="160"></u-upload>
				</view>
			</view>
		</view>
		<!-- 提交 -->
		<view class="push">
			<button class="btn">提交</button>
		</view>
		<!-- 弹出层 -->
		<!-- 弹出填写问诊人人信息 -->
		<u-popup v-model="patientinfo_show" mode="bottom" border-radius="45" height="800rpx">
			<view class="popcontent">
				<!-- 问诊人信息 -->
				<u-form :model="patient" ref="uForm" >
					<u-form-item label="姓名" :label-width="130" >
						<u-input :border="true" placeholder="请输入姓名" v-model="patient.name" type="text"></u-input>
					</u-form-item>
					<u-form-item label="身份证号" :label-width="130" >
						<u-input :border="true" placeholder="请输入身份证号" v-model="patient.identify" type="number"></u-input>
					</u-form-item>
					<u-form-item label="性别" :label-width="130">
						<u-action-sheet :list="sexList">
							
						</u-action-sheet>
						<u-input :border="true" type="select" :select-open="actionSheetShow" v-model="patient.sex" placeholder="请选择性别" @click="actionSheetShow = true"></u-input>
					</u-form-item>
					<u-form-item label="出生日期" :label-width="130">
						<u-input :border="true" type="select" :select-open="actionSheetShow" v-model="patient.birthday" placeholder="请选择出生日期" @click="actionSheetShow = true"></u-input>
					</u-form-item>
					<u-form-item label="手机号码" :label-width="130">
						<u-input :border="true" placeholder="请输入手机号" v-model="patient.phonenumber" type="number"></u-input>
					</u-form-item>
					
				</u-form>
				<!-- 保存 -->
				<view >
					<button class="popbtn">保存</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navShow1: true,
				navShow2: false,
				patientinfo_show: false,
				title: "复诊配药",
				doctorUrl: "../dispense/doctorList",
				drugUrl: "../dispense/drugList",
				background: {
					backgroundImage: 'rgba(#ffffff,0)'
				},
				doctor: {
					src:"../../static/touxiang/touxiang6.jpg"
				},
				patient: {
					name: "",
					identify: "",
					sex: "",
					birthday: "",
					phonenumber: "",
					illness: "",
					description: ""
				}
			}
		},
		onLoad() {
			
		},
		onPageScroll({
		  scrollTop
		}) {
		  if (scrollTop >= 23) {
		    this.navShow1 = false;
		    this.navShow2 = true;
		  }
		  if (scrollTop < 23) {
		    this.navShow1 = true;
		    this.navShow2 = false;
		  }
		},
		methods: {
			changeDoctor:function(taburl) {
				uni.navigateTo({
					url: taburl
				})
			},
			chooseDrug:function(taburl) {
				uni.navigateTo({
					url: taburl
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	// 导航栏样式切换
	.nav1{
		height: 390rpx;
		width: 100%;
		background: linear-gradient(156deg, rgb(79, 107, 208), rgb(98, 141, 185)45%, rgb(102, 175, 161)85%);
		border-radius: 0 0 45rpx 45rpx;
		position: fixed;
		top: 0;
	}
	.nav2{
		height: 150rpx;
		width: 100%;
		background: linear-gradient(156deg, rgb(79, 107, 208), rgb(98, 141, 185)70%, rgb(102, 175, 161)110%);
		position: fixed;
		top: 0;
		z-index: 999;
	}
	/* 选择医生 */
	.doctorboard{
		margin-top: 180rpx;
	}
	.doctor_head{
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: center;
	}
	.doctor_head image{
		width: 150rpx;
		height: 150rpx;
		border-radius: 75rpx;
	} 
	.name_text{
		display: flex;
		flex-direction: column;
		align-content: space-between;
		margin-left: 40rpx;
		font-size: 35rpx;
	}
	.name_text text{
		margin-top: 8rpx;
		margin-bottom: 8rpx;
	}
	.name_text1{
		margin-left: 5rpx;
		font-weight: bold;
		font-size: 36rpx;
	}
	.name_text2{
		border: 1rpx solid #ff9900;
		border-radius: 30rpx;
		font-size: 25rpx;
		color: #ff9900;
		padding-left: 10rpx;
		padding-right: 10rpx;
		padding-bottom: 4rpx;
	}
	.change{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-left: 150rpx;
	}
	.change_text{
		margin-left: 15rpx;
		font-size: 29rpx;
		color: #909399;
	}
	.change_icon{
		margin-left: 20rpx;
		color: #909399;
	}
	.doctor_body{
		margin-left: 20rpx;
		font-size: 29rpx;
	}
	/* 病人信息 */
	.patient_board{
		display: flex;
		flex-direction: column;
		margin-left: 40rpx;
		margin-right: 40rpx;
		margin-top: 50rpx;
		margin-bottom: 10rpx;
	}
	.patient_item{
		display: flex;
		flex-direction: row;
		height: 90rpx;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid rgba(144,147,153,0.3);
	}
	.patient_item2{
		display: flex;
		flex-direction: row;
		height: 70rpx;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0rpx;
		margin-top: 20rpx;
	}
	.patient_input{
		width: 180rpx;
	}
	.pageinput{
		font-size: 11px;
		color: #909399;
	}
	.drug_tag{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
	}
	.text1{
		font-size: 27rpx;
	}
	.text2{
		font-size: 27rpx;
		color: #909399;
	}
	
	/* 病情描述 */
	.description{
		display: flex;
		flex-direction: column;
		width: auto;
		margin-left: 40rpx;
		margin-right: 40rpx;
	}
	.desc_text{
		display: flex;
		flex-direction: row;
		width: auto;
		height: 90rpx;
		align-items: center;
		font-size: 33rpx;
		border-bottom: 1rpx solid rgba(144,147,153,0.3);
	}
	.desc_input{
		height: 150rpx;
		margin-top: 10rpx;
		margin-bottom: 20rpx;
	}
	.gap{
		margin-left: 30rpx;
		margin-right: 30rpx;
	}
	/* 上传照片 */
	.upload{
		display: flex;
		flex-direction: column;
		width: auto;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}
	.uptext{
		display: flex;
		flex-direction: row;
		width: auto;
		height: 90rpx;
		align-items: center;
		font-size: 33rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		border-bottom: 1rpx solid rgba(144,147,153,0.3);
	}
	.upimg{
		margin-top: 50rpx;
	}
	.push{
		display: flex;
		flex-direction: row;
		width: auto;
		height: 80rpx;
		align-items: center;
		padding-bottom: 60rpx;
		padding-top: 50rpx;
	}
	.btn{
		width: 400rpx;
		color: white;
		background: rgba(79, 107, 208,0.9);
		border-radius: 50rpx;
		font-size: 35rpx;
	 }
	 .popcontent{
		 display: flex;
		 flex-direction: column;
		 width: auto;
		 height: 600rpx;
		 margin-top: 50rpx;
		 margin-left: 50rpx;
		 margin-right: 50rpx;
	 }
	 .popbtn{
		width: 400rpx;
		margin-top: 50rpx;
		color: white;
		background: rgba(79, 107, 208,0.9);
		border-radius: 50rpx;
		font-size: 35rpx;
	 }
</style>
