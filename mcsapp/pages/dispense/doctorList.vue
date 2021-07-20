<template>
	<view class="content">
		<view>
			<!-- 自定义导航栏 -->
			<u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
		</view>
		<view class="search-wrap" style="padding: 20rpx 10rpx;">
			<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
			<u-search v-model="keyword" height="80" placeholder="可搜索医生姓名" :show-action="showAction" :action-style="{color: '#909399'}"></u-search>
		</view>
		<view class="doctorInfo" v-for="item in doctorList" :key="item.id">
			<image :src="item.src"></image>
			<view class="name">
				<text class="name_text1">{{item.name}}</text>
				<text class="name_text2">{{item.level}}</text>
			</view>
			<view class="department" slot="body">
				<text>{{item.department}}</text>
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
				doctorList: [
					{id:"1",name:"方洪全",department:"呼吸内科",level:"主任医师",src:"../../static/touxiang/touxiang6.jpg"},
					{id:"2",name:"李明",department:"外科",level:"医师",src:"../../static/touxiang/touxiang4.jpg"}
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
		margin: 0 20rpx;
		flex: 1;
	}
</style>
