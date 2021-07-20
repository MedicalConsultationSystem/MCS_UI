<template>
	<view class="content">
		<view class="nav">
			<!-- 自定义导航栏 -->
			<u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
		</view>
		<view class="search-wrap" style="padding: 20rpx 10rpx;">
			<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
			<u-search v-model="keyword" height="65" placeholder="可搜索药品信息" :show-action="showAction" :action-style="{color: '#909399'}"></u-search>
		</view>
		<view class="drugInfo" v-for="item in drugList" :key="item.id">
			<view class="drug">
				<view class="name_text">
					<text class="name_text1">{{item.name}}</text>
					<text class="name_text2">{{item.specification}}</text>
				</view>
			</view>
			<view class="price">
				<text>{{item.price}}元/{{item.pack_unit}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "搜索药品",
				showAction: true,
				keyword: '',
				background: {
					backgroundImage: 'linear-gradient(156deg, rgb(79, 107, 208), rgb(98, 141, 185)70%, rgb(102, 175, 161)110%);'
				},
				drugList: [
					{id:"1",name:"肠炎宁片",specification:"0.42g*48片",price:"29",pack_unit:"盒"},
					{id:"2",name:"连花清瘟胶囊",specification:"0.35g*36粒",price:"29",pack_unit:"支"}
				]
			}
		},
		onLoad() {
	
		},
		methods: {
			
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
		flex: 1;
	}
	.drugInfo{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;
		padding-bottom: 15rpx;
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
		margin-left: 10rpx;
		font-size: 35rpx;
	}
	.name_text text{
		margin-top: 5rpx;
		margin-bottom: 5rpx;
	}
	.name_text1{
		margin-left: 5rpx;
		font-size: 28rpx;
	}
	.name_text2{
		border-radius: 30rpx;
		color: #909399;
		font-size: 20rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		padding-bottom: 2rpx;
	}
	.price{
		margin-right: 15rpx;
		font-size: 25rpx;
		color: #909399;
	}
</style>
