<template>
	<div class="container">
		<topHeader></topHeader>
		<router-view id="left" :key="$route.query.time"></router-view>
	</div>
</template>

<script>
import topHeader from '@com/Header/index';
export default {
	name: 'layout',
	data() {
		return {};
	},
	components: {
		topHeader
	},
	mounted() {},
	methods: {}
};
</script>

<style lang="less" scoped>
.container {
	position: relative;
	z-index: 1;
	#left,
	#right,
	#top,
	#bottom {
		position: absolute;
		opacity: 1;
	}
	#left {
		left: 0;
		top: 78px;
		background-size: 100% 100%;
		animation: showInLeft 1s 0.2s ease both;
		background: rgba(0,0,0,.8);
	}
	#right {
		right: 0;
		top: 78px;
		background-size: 100% 100%;
		animation: showInRight 1s 0.2s ease both;
		background: rgba(0,0,0,.8);
	}
	#top {
		top: 85px;
		left: 50%;
		transform: translateX(-50%);
		animation: showInTop 1s 0.2s ease both;
	}
	#bottom {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		animation: showInBottom 1s 0.2s ease both;
	}

	@keyframes showInLeft {
		0% {
			transform: translateX(-100%);
			opacity: 0;
		}

		100% {
			transform: translateX(0%);
			opacity: 1;
		}
	}

	@keyframes showInRight {
		0% {
			transform: translateX(100%);
			opacity: 0;
		}

		100% {
			transform: translateX(0%);
			opacity: 1;
		}
	}
	@keyframes showInTop {
		0% {
			transform:translateX(-50%) translateY(-100%);
			opacity: 0;
		}

		100% {
			transform:translateX(-50%) translateY(0%);
			opacity: 1;
		}
	}
	@keyframes showInBottom {
		0% {
			transform:translateX(-50%) translateY(-100%);
			opacity: 0;
		}

		100% {
			transform:translateX(-50%) translateY(0%);
			opacity: 1;
		}
	}
}
</style>
