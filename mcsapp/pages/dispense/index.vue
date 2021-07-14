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
				title: "复诊配药",
				background: {
					backgroundImage: 'linear-gradient(156deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)45%, rgba(102, 175, 161,0.93)85%)'
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
