<template>
	<div id="app">
		<router-view />
		<div id="mapView"></div>
	</div>
</template>
<script>
import api from '@api/api';
import hello from '@com/Pop/pop';
import map from '@com/Map/map.js';
import line from '@com/Map/line.js';
import geoJson from '@com/Map/geoJson.js';
import gdZj from '@com/Map/file/gd-zj.json'
import gd from '@com/Map/file/gd.json'

export default {
	data() {
		return {};
	},
	computed: {},
	created() {},
	mounted() {
		map.show();
		    // geoJson.show(gdZj);
				
			geoJson.hideOtherRegion(gd);
		// setTimeout(()=>{
		// 	line.hide();
		// },15000)
		
		// this.$zyjdialog.openPop({
		// 	content: hello,
		// 	id: 'hello',
		// 	right: 200,
		// 	top: 200,
		// 	options: {
		// 		closeCallback: this.close
		// 	},
		// 	isPostion: true,
		// 	dialogData: {
		// 		a: 111,
		// 		b: 222
		// 	}
		// });
		api.getListAPI().then(res => {
			console.log(res);
		});
		api.sendHttp().then(res => {
			console.log(res);
			console.log(111);
		});
	},
	methods: {},
	watch: {
		$route(to, from, next) {}
	}
};
</script>
<style lang="less" scoped>
#app {
	position: relative;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	#mapView {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}
	/deep/ .ol-attribution,/deep/ .ol-rotate,/deep/ .ol-zoom{
		display: none;
	}
}
</style>
