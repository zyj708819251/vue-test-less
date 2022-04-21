
<!-- 
 import Bread from '@com/Bread'
 
 components: {
 	Bread
 },
 
 <Bread />
 -->
<template>
	<div>
		<el-breadcrumb separator="/">
			<!-- to为点击跳转 title为路由中的meta属性定义的标题 -->
			<el-breadcrumb-item v-for="(v, i) in breadList" :key="i" :to="v.path">{{ v.meta.title }}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
	data() {
		return {
			breadList: []
		};
	},
	watch: {
		$route() {
			//监听$route
			this.getBreadcrumb();
		}
	},
	methods: {
		isHome(route) {
			return route.name === 'Home';
		},
		getBreadcrumb() {
			let matched = this.$route.matched;
			this.breadList = matched;
		}
	},
	created() {
		//生命周期中调用获取数据的方法
		this.getBreadcrumb();
	}
};
</script>
<style lang="less" scoped></style>
