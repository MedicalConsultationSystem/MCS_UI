<template>
	<view class="content" style="height: 1667rpx; background-color: #f5f5f5;">
		<view class="nav">
			<!-- 自定义导航栏 -->
			<u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
		</view>
		<!-- 配药记录面板 -->
		<view class="recordboard" >
			<u-card class="record" >
				<view class="record_head" slot="head">
					<text>问诊时间：{{record.asktime}}</text>
					<view v-if="record.iscomplete">
						<text style="color: #ff9900">已完成</text>
					</view>
					<view v-else>
						<text style="color: #ff9900">待处理</text>
					</view>
					
				</view>
				<view class="record_body" slot="body">
					<image :src="record.docsrc"></u-image>
					<view class="record_body_text">
						<view style="margin-bottom: 8rpx;">
							<text class="record_text1">{{record.docname}}</text>
							<text class="record_text2">在线云诊室</text>
						</view>
						<text class="record_text2">就诊人：{{record.patientname}}</text>
						<text class="record_text2">病情：{{record.description}}</text>
					</view>
				</view>
				<view class="record_foot" slot="foot">
					<text>复诊配药</text>
					<view v-if="record.iscomplete">
						<u-button type="success" size="mini" :plain="true" shape="circle" @click="checkPrescription(checkUrl)" >查看处方</u-button>
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
				}
			}
		},
		onLoad() {
	
		},
		methods: {
			checkPrescription:function(taburl) {
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
