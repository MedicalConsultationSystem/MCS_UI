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
					<view class="left" v-if="show===true">
						<image :src="doctorList.src"></image>
						<view class="name_text">
							<text class="name_text1">{{doctorList.name}}</text>
							<text class="name_text2">{{doctorList.level}}</text>
						</view>
					</view>
					<view :class="[show===true?'change':'change2']" @click="changeDoctor(doctorUrl)">
						<text class="change_text" v-if="show===true">更换医生</text>
						<text class="change_text2" v-if="show===false">请选择医生</text>
						<u-icon class="change_icon" name="arrow-right" size="30"></u-icon>
					</view>
				</view>
				<view class="doctor_body" slot="body">
					<text>{{doctorList.department}}</text>
				</view>
			</u-card>
		</view>
	
		<view class="patient_board">
			<view class="patient_item">
				<text class="text1">问诊人</text>
				<view class="text2" @click="patientinfo_show=true">
					<text>{{saveList}}</text>
					<u-icon class="change_icon" name="arrow-right" size="27"></u-icon>
				</view>
			</view>
			<view class="patient_item">
				<text class="text1">确诊诊断</text>
				<view class="patient_input">
					<input class="pageinput" placeholder="请填写病情诊断" placeholder-style='text-align:right'  style="text-align:right" v-model="msg.diagnosis"/>
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
				<view class="tag" v-for="(item,index) in drugList" v-if="item.show===true" :key="index">
					<u-tag :text=item.name closeable :show=item.show shape="circle" @close="tagClose(index)" />
				</view>
			</view>
		</view>
		<view class="illness_description">
			<view class="gap">
				<u-gap bg-color="#c0c4cc" height="30" margin-left="40"></u-gap>
			</view>
			<view class="description">
				<text class="desc_text">病情描述</text>
				<view class="desc_input">
					<u-input type="textarea" placeholder="请填写病情描述" v-model="msg.question"/>
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
			<button class="btn" @click="pushInfo">提交</button>
		</view>
		<!-- 弹出层 -->
		<!-- 弹出填写问诊人人信息 -->
		<u-popup v-model="patientinfo_show" mode="bottom" border-radius="45" height="800rpx">
			<view class="popcontent">
				<!-- 问诊人信息 -->
				<u-form :model="msg" ref="uForm" >
					<u-form-item label="姓名" :label-width="130" >
						<u-input :border="true" placeholder="请输入姓名" v-model="msg.person_name" type="text"></u-input>
					</u-form-item>
					<u-form-item label="身份证号" :label-width="130" >
						<u-input :border="true" placeholder="请输入身份证号" v-model="msg.person_card_id" type="number"></u-input>
					</u-form-item>
					<u-form-item label="性别" :label-width="130">
						<u-input v-model="msg.person_gender_name" type="select" :border="true" :select-open="showSex" placeholder="请选择性别" @click="showSex=true"></u-input>
						<u-picker v-model="showSex" mode="selector" :default-selector="[0]" :range="sexList" @confirm="sexCallback"></u-picker>
					</u-form-item>
					<u-form-item label="出生日期" :label-width="130">
						<u-input v-model="birthday" type="select" :border="true" :select-open="showBirth" placeholder="请选择出生日期" @click="showBirth=true"></u-input>
						<u-picker v-model="showBirth" mode="time" :params="params" @confirm="birthdayCallback"></u-picker>
					</u-form-item>
					<u-form-item label="手机号码" :label-width="130">
						<u-input :border="true" placeholder="请输入手机号" v-model="msg.person_phone_no" type="number"></u-input>
					</u-form-item>
					
				</u-form>
				<!-- 保存 -->
				<view >
					<button class="popbtn" @click="saveInfo">保存</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				saveList: "请填写问诊人信息",
				sexList:['男','女'],
				showSex: false,
				showBirth: false,
				navShow1: true,
				navShow2: false,
				patientinfo_show: false,
				title: "复诊配药",
				doctorUrl: "../dispense/doctorList",
				drugUrl: "../dispense/drugList",
				drugList:[],
				doctorList:[],
				doctorInfoList:[],
				birthday:"",
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				background: {
					backgroundImage: 'rgba(#ffffff,0)'
				},
				msg :{
					// 假数据
						//问诊状态1待接诊
						consult_status: 1,
						//证件类型"1"身份证
						person_card_type: "1",
						//病情照片
						photo_ids: "1",	
					//选择医生面板获取的医生信息
					doctor_name: "",
					dept_id: 0,
					dept_name: "",
					doctor_id: "",
					doctor_level_code: "",
					doctor_level_name: "",
					org_id: 0,
					org_name: "",
					//问诊人信息
					create_user_id: "",
					person_name: "",
					person_card_id: "",
					person_gender_code: "",
					person_gender_name: "",
					person_phone_no: "",
					person_age: 0,
					person_birth_date: "",
					//确诊诊断
					diagnosis: "",
					//药品信息
					drug_ids: "",
					drug_names: "",
					//病情描述
					question: "",
					
				}
			}
		},
		onLoad() {
			var user = uni.getStorageSync('userInfo');
			console.log(user);
			this.msg.create_user_id=user.user_id;
			uni.$on('drugData', e => {
				// console.log(e);
				this.drugList.push(e);
				// console.log(this.drugList);
				if(this.drugList.length<=1){
					this.msg.drug_ids+=this.drugList[0].id;
					this.msg.drug_names+=this.drugList[0].name;
				}
				else{
					this.msg.drug_ids += ','+this.drugList[this.drugList.length-1].id;
					this.msg.drug_names += ','+this.drugList[this.drugList.length-1].name;
					// console.log(this.msg.drug_ids);
					// console.log(this.msg.drug_names);
				}
				// console.log(this.msg);
			});
			uni.$on('doctorData', k => {
				// console.log(k);
				this.show=true;
				this.doctorList=k;
				// console.log(this.doctorList);
			});
			uni.$on('doctorInfo', g => {
				this.doctorInfoList=g;
				// console.log(this.doctorInfoList);
				this.msg.doctor_id=this.doctorInfoList.doctor_id;
				this.msg.doctor_name=this.doctorInfoList.doctor_name;
				this.msg.dept_id=this.doctorInfoList.dept_id;
				this.msg.dept_name=this.doctorInfoList.dept_name;
				this.msg.doctor_level_code=this.doctorInfoList.level_code;
				this.msg.doctor_level_name=this.doctorInfoList.level_name;
				this.msg.org_id=this.doctorInfoList.org_id;
				this.msg.org_name=this.doctorInfoList.org_name;
				this.msg.doctor_id=this.doctorInfoList.doctor_id;
				console.log(this.msg);
			});
		},
		onUnload() {
			uni.$off('drugData');
			uni.$off('doctorData');
			uni.$off('doctorInfo');
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
				// console.log(this.drugList);
				uni.navigateTo({
					url: taburl
				})
				// console.log(this.drugList);
			},
			sexCallback(e) {
				// console.log(e); 回调参数e[0]相当于index
				this.msg.person_gender_name = this.sexList[e[0]];
				let code = e[0]+1;
				this.msg.person_gender_code = code.toString();
			},
			birthdayCallback(e){
				console.log(e); 
				var date = new Date; 
				var year = date.getFullYear();
				this.msg.person_age=year-e.year;
				console.log(this.msg.person_age);
				if (this.params.year) this.msg.person_birth_date += e.year;
				if (this.params.month) this.msg.person_birth_date += '-' + e.month;
				if (this.params.day) this.msg.person_birth_date += '-' + e.day;
				if (this.params.hour) this.msg.person_birth_date += ' ' + e.hour;
				if (this.params.minute) this.msg.person_birth_date += ':' + e.minute;
				if (this.params.second) this.msg.person_birth_date += ':' + e.second;
				this.birthday=this.msg.person_birth_date;
				console.log(this.birthday);
				this.msg.person_birth_date += "T00:00:00+08:00"
				console.log(this.msg.person_birth_date);
			},
			saveInfo(){
				this.patientinfo_show=false;
				this.saveList=this.msg.person_name+" "+this.msg.person_gender_name+" "+this.msg.person_age;
			},
			tagClose(index) {
				console.log(index);
				this.drugList[index].show=false
			},
			pushInfo(){
				let reqJson= JSON.stringify(this.msg);
				console.log(reqJson);
				console.log(typeof (reqJson));
				this.$axios.post('https://api.zghy.xyz/consult/add',reqJson)
					.then(res =>{
						console.log(res);
						if(res.data.code===0){
							uni.navigateBack();
						}else{
							console.log(res.data.msg)
							//返回错误信息
							let msg=res.data.msg;
							uni.showToast({
								title: msg,
								icon:'none',
								duration: 1500
							});
						}
					})
			}
		}
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
		justify-content: space-between;
		align-items: center;
	}
	.left{
		display: flex;
		flex-direction: row;
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
		margin-bottom: 10rpx;
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
	}
	.change2{
		height: 150rpx;
		padding-top: 45rpx;
		padding-left: 230rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.change_text{
		margin-left: 15rpx;
		font-size: 29rpx;
		color: #909399;
	}
	.change_text2{
		font-size: 37rpx;
		color: #909399;
	}
	.change_icon{
		padding-top: 5rpx;
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
		height: auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-bottom: 5rpx;
	}
	.tag{
		height: 60rpx;
		margin-right: 15rpx;
		padding-top: 10rpx;
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
