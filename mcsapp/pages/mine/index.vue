<template>
	<view class="content">
		<view class="mineboard">
			<u-card class="mine" box-shadow="2px 3px 8px #888888">
				<view class="mine_head" slot="body">
					<image :src="user.src"></image>
					<view>
						<text class="name">用户：{{user.id}}</text>
					</view>
				</view>
				<view slot="foot"></view>
			</u-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					src: "../../static/mine/user_male.png",
					id: ""
				},
				userInfo: [],
				serviceList:[
					{id:1,src:"../../static/mine",text:"我的报告",url:"../diagnosis/index"},
					{id:2,src:"../../static/home/menu2.png",text:"我的药物",url:""},
					{id:3,src:"../../static/home/menu3.png",text:"我的邦卡",url:""}
				]
			}
		},
		onLoad() {
			this.userInfo=getApp().globalData.userInfo;
			this.user.id=this.userInfo.phone_no;
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 1215rpx;
		background: linear-gradient(180deg, rgba(79, 107, 208,0.95), rgb(98, 141, 185)19%, rgb(102, 175, 161)29%,white 38%);
	}
	/* 我的面板 */
	.mineboard{
		margin-top: 180rpx;
	}
	.mine_head{
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: center;
	}
	.mine_head image{
		width: 150rpx;
		height: 150rpx;
		margin-left: 35rpx;
		border-radius: 75rpx;
	} 
	.name{
		margin-left: 85rpx;
		font-size: 29rpx;
		color: #909399;
	}
</style>
