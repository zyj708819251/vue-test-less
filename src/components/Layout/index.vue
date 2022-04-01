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
	z-index: 2;
	#left,
	#right,
	#top,
	#bottom {
		position: absolute;
		z-index: 2;
		opacity: 1;
	}
	#left {
		left: 0;
		top: 105px;
		background-size: 100% 100%;
		animation: showInLeft 1s 0.2s ease both;
	}
	#right {
		right: 0;
		top: 105px;
		background-size: 100% 100%;
		animation: showInRight 1s 0.2s ease both;
	}
	#top {
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		animation: showInTop 1s 0.2s ease both;
	}
	#bottom {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
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
			transform: translateY(-100%);
			opacity: 0;
		}

		100% {
			transform: translateY(0%);
			opacity: 1;
		}
	}
}
</style>
