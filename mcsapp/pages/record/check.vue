<template>
	<view class="content">
		<view>
			<!-- 自定义导航栏 -->
			<u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
		</view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
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
				list: [
					{name: '处方一'},
					{name: '处方二'}, 
					{name: '处方三'},
				],
				current: 2,
				preList: getApp().globalData.prescriptions,
			}
		},
		onLoad() {
			this.preList=getApp().globalData.prescriptions;
			console.log(this.preList);
			console.log(getApp().globalData.prescriptions);
			console.log(123);
		},
		methods: {
			change(index) {
				this.current = index;
			}
		},
	}
</script>

<style>
</style>
