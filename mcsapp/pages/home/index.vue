<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="false" :background="background" height="45">
			<view class="slot-wrap">
				<view class="search-wrap">
					<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
					<u-search v-model="keyword" :disabled="true" bg-color="#ffffff" :show-action="showAction" height="60" placeholder="可搜索药品信息" @click="searchTab(searchUrl)" ></u-search>
				</view>
			</view>
		</u-navbar>
		<!-- 主页 -->
		<view class="content">
			<!-- 轮播图 -->
			<view class="swiper">
				<u-swiper :height="350" :list="list" :title="true" :effect3d="true"
				indicator-pos="none" mode="dot" :interval="4000" bg-color="white"></u-swiper>
			</view>
			<!-- 菜单 -->
			<view class="menu">
				<block v-for="item in menuList" :key="item.id">
					<view class="menu-item">
						<image class="menu-img" :src="item.src" @click="Tab(item.url)"/>
						<text class="menu-text">{{item.text}}</text>
					</view>
				</block>
			</view>
			<!-- 健康资讯 -->
			<view class="title">
				<text class="text1">健康资讯</text>
				<text class="text2">更多</text>
				<u-icon class="into" name="arrow-right" size="30"></u-icon>
			</view>
			<!-- 资讯列表 -->
			<view>
				<scroll-view class="answer" :scroll-y="true">
					<view class="answer-item" v-for="item in answerList" :key="item.id" >
						<image :src="item.src"></image>
						<text>{{item.text}}</text>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showAction: false,
				keyword: '',
				searchUrl: "../dispense/drugList",
				list: [{
						image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20200331%2Fe0375d880965492f89885ca24b0352ad.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629734986&t=88026fd1c075929506d968461270bc3a',
						title: '医疗机构大规模开展互联网复诊'
					},
					{
						image: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00412-2326.jpg',
						title: '健康大药房，1000+在售药品，种类齐全'
					},
					{
						image: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00234-3856.jpg',
						title: '不知道该吃什么药？试试线上复诊配药'
					}
				],
				menuList:[
					{id:1,src:"../../static/home/menu1.png",text:"初诊记录",url:"../diagnosis/index"},
					{id:2,src:"../../static/home/menu2.png",text:"复诊配药",url:"../dispense/index"},
					{id:3,src:"../../static/home/menu3.png",text:"配药记录",url:"../record/index"},
					{id:4,src:"../../static/home/menu4.png",text:"电子处方",url:"../prescription/index"}
				],
				answerList:[
					{id:1,src:"../../static/touxiang/touxiang1.jpg",text:"知名球员张恩华48岁心梗去世，运动员都难逃其手，还以为猝死离你很远吗？"},
					{id:2,src:"../../static/touxiang/touxiang2.jpg",text:"40岁妈妈拼二胎，六年流产两次..."},
					{id:3,src:"../../static/touxiang/touxiang3.jpg",text:"腰间盘突出压到腿神经"},
					{id:4,src:"../../static/touxiang/touxiang4.jpg",text:"阴虚火旺的人，夏天想代茶饮，需要..."},
					{id:5,src:"../../static/touxiang/touxiang5.jpg",text:"音乐人赵英俊患癌去世，预防癌症，我们帮你划重点"},
					{id:6,src:"../../static/touxiang/touxiang6.jpg",text:"手指上有白色小疙瘩"},
					{id:7,src:"../../static/touxiang/touxiang7.jpg",text:"宝宝有痰咳嗽怎么办？用..."},
					{id:8,src:"../../static/touxiang/touxiang8.jpg",text:"清热药不是应该去火吗？"},
					{id:9,src:"../../static/touxiang/touxiang9.jpg",text:"肺腺癌晚期骨转移"}
				],
				background: {
					// backgroundColor: ''，
					
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					
					// 渐变色
					backgroundImage: 'linear-gradient(158deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)47%, rgb(102, 175, 161)80%, rgb(92, 210, 133))'
				}
			}
		},
		onLoad() {

		},
		methods: {
			Tab:function(taburl) {
				uni.navigateTo({
					url: taburl
				})
			},
			searchTab:function(taburl) {
				uni.navigateTo({
					url: taburl
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.slot-wrap{
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 0rpx;
	}
	.search-wrap {
		margin: 0 20rpx;
		flex: 1;
	}
	.content {
		margin-top: 20rpx;
	}
	.menu {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content:space-around; 
	}
	.menu-item {
		display: flex;
		width: 150rpx;
		height: 100%;
		flex-direction: column;
		align-items: center;
	}
	.menu-img {
		margin-top: 20rpx;
		width: 80rpx;
		height: 80rpx;
	}
	.menu-text {
		margin-top: 10rpx;
		font-size: 24rpx;
	}
	.title{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: left;
	}
	.text1{
		margin-left: 40rpx;
		margin-top: 40rpx;
		margin-bottom: 20rpx;
		width: 640rpx;
		font-size: 33rpx;
	}
	.text2{
		width: 60rpx;
		margin-top: 40rpx;
		margin-bottom: 20rpx;
		font-size: 22rpx;
		color: #909399;
	}
	.into{
		margin-right: 26rpx;
		margin-top: 35rpx;
		margin-bottom: 20rpx;
	}
	.answer{
		width: 750rpx;
		height: 601rpx;
		display: flex;
		flex-direction: column;
	}
	.answer-item{
		width: 680rpx;
		height: 120rpx;
		margin-left: 35rpx;
		margin-right: 35rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		// border-bottom:1rpx solid rgba(150,220,270,0.3);
		border-bottom: 1rpx solid rgba(144,147,153,0.3);
	}
	.answer-item image{
		width: 80rpx;
		height: 80rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		border-radius: 80rpx;
	}
	.answer-item text{
		margin-left: 20rpx;
		width: 580rpx;
		text-align: left;
		font-size: 30rpx;
	}
</style>
