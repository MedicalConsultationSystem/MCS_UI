<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="true" back-icon-color="white" :title="title" title-color="white" :background="background" height="45"></u-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "初诊记录",
				background: {
					backgroundImage: 'linear-gradient(156deg, rgb(79, 107, 208), rgb(98, 141, 185)70%, rgb(102, 175, 161)110%);'
				}
			}
		},
		onLoad() {
	
		},
		methods: {
			
		},
	}
</script>

<style>
</style>
