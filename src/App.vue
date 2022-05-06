<template>
	<div id="app">
		<!-- <el-dialog title="弹窗" :visible.sync="dialogVisible"
		 :close-on-click-modal=false
		  v-el-drag-dialog
		 width="75%"
		 >
		
		 <div style="color: darkorange;font-size: 64px;">
		   弹窗
		 </div>
		</el-dialog> -->
		 <!-- //:close-on-click-modal=false 这个属性的作用是不让点击外面关闭弹窗 -->

		
		<Bread />
		<router-view />
		<div id="mapView"></div>
	</div>
</template>
<script>
import api from '@api/api';
import hello from '@com/Pop/pop';
import hello1 from '@com/Pop/pop2';
import map from '@com/Map/map.js';
import gdZj from '@com/Map/file/gd-zj.json';
import gd from '@com/Map/file/gd.json';
import mapconfig from '@com/Map/mapconfig.js';
import geoJson from '@com/Map/geoJson.js';
import line from '@com/Map/line.js';
import popup from '@com/Map/popup.js';
import location from '@com/Map/location.js';

import Bread from '@com/Bread';
import point from '@com/Map/points.js';

export default {
	data() {
		return {
			dialogVisible:true,
			showViewer: false,
			srcList: [],
			qyMarker: '',
			qyMarkerLabel: '',
			singleMarker: '',
			singleMarkerLabel: ''
		};
	},
	computed: {},
	created() {},
	mounted() {
		var that = this;
		// window.openPop = function(data) {
		// 	that.showPop(data);
		// };
		map.show();

		// api.getListAPI().then(res => {
		// 	console.log(res);
		// });
		// api.sendHttp().then(res => {
		// 	console.log(res);
		// 	console.log(111);
		// });
		// this.showPoints();
		this.showAllPoints();
		this.showLine();
		// this.$zyjdialog.openPop({
		//   content: hello,
		//   id: 'hello',
		//   right: 200,
		//   top: 200,
		//   options: {
		//     closeCallback: this.close
		//   },
		//   isPostion: true,
		//   dialogData: {
		//     a: 111,
		//     b: 222
		//   }
		// });
	},
	methods: {
		showPop(url) {
			this.showViewer = true;
			this.srcList = url;
		},
		showLine() {
			var dataArr = [
				{
					name: '桂城街道',
					points: [
						[113.21297682, 23.04531506],
						[113.21550582, 23.04511807],
						[113.22020582, 23.04450508],
						[113.22814182, 23.04549806],
						[113.23363282, 23.04574106],
						[113.23981982, 23.04601405],
						[113.24167082, 23.04622105],
						[113.24479282, 23.04656904]
					]
				},
				{
					name: 'no街道',
					points: [
						[113.53603380934584, 22.84313113672137],
						[113.54371565596449,22.847229552096127],
						[113.55319681997352,22.841491242407407],
						[113.54958625525629,22.834576670354583],
						[113.55415055404977,22.83355481241574],
						[113.54154763947074,22.837778491896284],
						[113.54474946101243,22.837335686789455],
						[113.5488368927678,22.842410914552367],
						[113.5559558364084,22.833725122072213]
					]
				},
				{
					name: '九江镇',
					points: [
						[113.004949598496054, 22.804940993433068],
						[112.99971582, 22.80504675],
						[112.998922661713124, 22.804920437563517],
						[112.997941921689645, 22.80491709258667],
						[112.991178295805909, 22.803807979870893],
						[112.983384517459513, 22.803271313399453],
						[112.975165576474794, 22.805603885889383],
						[112.970079829855266, 22.810770435617364],
						[112.967510293988767, 22.814336766341494],
						[112.958858473456502, 22.82986950976526],
						[112.953799980356735, 22.833313391456237],
						[112.937218200635385, 22.8445509877244],
						[112.926225070904891, 22.853722642220763],
						[112.918381671956169, 22.859260531546074],
						[112.917863576060142, 22.859078023463994],
						[112.91741682, 22.86109866],
						[112.91163982, 22.8697245],
						[112.91076282, 22.87423941]
					]
				}
			];
			dataArr.forEach((v, i) => {
				v.points = v.points;
				v.groupId = 'line';
				v.effectId = 'line' + i;
				v.popupCom = hello1;
				v.singleclickCallback = function(e) {
					popup.show(v,e);
				};
			});
			line.show(dataArr);
			var obj={
			  center:[113.004949598496054, 22.804940993433068],
			  zoom:4.5,
			  duration:2000
			}
			location.show(obj)
		},
		showAllPoints() {
			let that = this;
			var dataArr = [
				{
					id: 1,
					x: 113.53603380934584,
					y: 22.84313113672137,
					type: '大门'
				},
				{
					id: 2,
					x: 113.54371565596449,
					y: 22.847229552096127,
					type: '大门'
				},
				{
					id: 3,
					x: 113.55319681997352,
					y: 22.841491242407407,
					type: '停车场'
				},
				{
					id: 4,
					x: 113.54958625525629,
					y: 22.834576670354583,
					type: '停车场'
				},
				{
					id: 5,
					x: 113.55415055404977,
					y: 22.83355481241574,
					type: '停车场'
				},
				{
					id: 6,
					x: 113.54154763947074,
					y: 22.837778491896284,
					type: '停车场'
				},
				{
					id: 7,
					x: 113.54474946101243,
					y: 22.837335686789455,
					type: '企业'
				},
				{
					id: 8,
					x: 113.5488368927678,
					y: 22.842410914552367,
					type: '企业'
				},
				{
					id: 9,
					x: 113.5559558364084,
					y: 22.833725122072213,
					type: '企业'
				}
			];
			dataArr.forEach((v, i) => {
				v.iconScale = 0.3;
				v.iconImage = require('@assets/img/' + v.type + '.png');
				v.groupId = 'single';
				v.effectId = 'single' + i;
				v.popupCom = hello1;
				v.lnglat = [v.x, v.y];
				v.isCluster = true;
				v.distance = 100;
				v.singleclickCallback = function(e) {
					popup.show(v,e);
				};
			});
			point.show(dataArr);
		},
		showPoints() {
			var that = this;
			var dataArr = [
				{
					id: 1,
					x: 113.54320651437152,
					y: 22.847522301793774
				},
				{
					id: 2,
					x: 113.199775736519584,
					y: 23.204539429597769
				},
				{
					id: 3,
					x: 113.78894792486385,
					y: 24.432137309426135
				},
				{
					id: 4,
					x: 114.8872330118499,
					y: 23.242328465191182
				},
				{
					id: 5,
					x: 115.86613999560169,
					y: 24.151295079688467
				}
			];
			dataArr.forEach((v, i) => {
				v.iconScale = 0.6;
				v.iconImage = require('@assets/img/' + v.id + '.png');
				v.groupId = 'qiye';
				v.effectId = 'qiye' + i;
				v.popupCom = hello;
				v.lnglat = [v.x, v.y];
				v.singleclickCallback = function(e) {
					popup.show(v,e);
				};
				v.dblclickCallback = function() {
					alert(1);
				};
			});
			point.show(dataArr);
			// setTimeout(()=>{
			// 	window.map.clearLayer('line');
			// 	window.map.clearLabel('line');
			// },10000)
		}
	},
	components: {
		'el-image-viewer': () => import('element-ui/packages/image/src/image-viewer'),
		Bread
	},
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
		background: rgba(0, 0, 0, 0.5);
	}
	/deep/ .ol-attribution,
	/deep/ .ol-rotate,
	/deep/ .ol-zoom {
		display: none;
	}
}
</style>
