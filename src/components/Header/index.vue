<template>
	<div class="header">
		<div class="nav">
			<router-link class="nav-item" :key="item.path" v-for="(item, index) in navList" :to="item.path" custom v-slot="{ navigate, isActive }">
				<div :active="isActive" @click="navigate" @keypress.enter="navigate" role="link"><p v-text="item.name"></p></div>
			</router-link>

			<!-- <router-link  class="nav-item" :key="index.path" v-for="(item, index) in navList" :to="item.path" >
        <div>
          <p v-text="item.name"></p>
          <p v-text="item.englishName"></p>
        </div>
      </router-link> -->
		</div>
	</div>
</template>

<script>
export default {
	name: 'top-header',
	data() {
		return {
			navList: [
				{
					name: '首页',
					path: '/Home'
				},
				{
					name: '关于我们',
					path: '/About'
				}
			],
			month:'',
			time:'',
			week:''
			
		};
	},
	computed: {},
	created() {},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getDate();
			let timer = setInterval(() => {
				this.getDate();
			}, 1000);
			this.$once('hook:beforeDestroy', () => {
				clearInterval(timer);
			});
		},
		fullScreen() {
			this.$utils.enterFullScreen();
		},
		getDate() {
			let date = this.$utils.getNowTime();
			this.time = date.hourMinSecond;
			this.month = date.dateMonthYear;
			this.week = date.week;
		}
	}
};
</script>

<style scoped lang="less">
.header {
	.flex();
	position: absolute;
	width: 1920px;
	height: 105px;
	background-size: 100% 100%;
	align-items: center;
	justify-content: space-between;
	padding: 0 35px;
	.logo {
		width: 374px;
		height: 55px;
		background: url(img/产品名@3x.png) no-repeat;
		background-size: 100% 100%;
	}
	.nav {
		height: 100%;
		flex: 1;
		.flex();
		justify-content: center;
		.nav-item {
			cursor: pointer;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			font-size: 18px;
			height: 100%;
			padding: 24px 30px 24px;
			text-align: center;
			&[active='true'] {
				background: url(img/顶部标题选定@3x.png) no-repeat bottom center;
				background-size: 128px 33px;
			}
		}
	}
	.rightMess {
		.flex();
		align-items: center;
		color: rgba(255, 255, 255, 0.76);
		.time {
			padding-right: 15px;
			.flex(column);
			p {
				&:nth-child(1) {
					font-size: 14px;
				}
				&:nth-child(2) {
					font-size: 10px;
					font-family: 'Bahnschrift';
				}
			}
		}
		.weather {
			padding-left: 15px;
			font-size: 20px;
			.flex();
			align-items: center;
			.icon {
				width: 42px;
				height: 42px;
				background: url(img/多云@3x.png) no-repeat;
				background-size: 100% auto;
			}
		}

		.location {
			position: relative;
			padding: 0 15px;
			font-size: 20px;
			&::before,
			&::after {
				content: '';
				display: block;
				position: absolute;
				height: 20px;
				background: rgba(255, 255, 255, 0.76);
				width: 1px;
				top: 50%;
				transform: translateY(-50%);
			}
			&::before {
				left: 0;
			}

			&::after {
				right: 0;
			}
		}
	}
}
</style>
