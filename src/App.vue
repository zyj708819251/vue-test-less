<template>
	<div id="app">
		
    <Bread />
		<router-view />
		<div id="mapView"></div>
		<el-image-viewer
			v-if="showViewer"
			:on-close="() => {showViewer = false;}"
			:url-list="srcList"
		/>
	</div>
</template>
<script>
import api from '@api/api';
import hello from '@com/Pop/pop';
import map from '@com/Map/map.js';
import gdZj from '@com/Map/file/gd-zj.json'
import gd from '@com/Map/file/gd.json'
import mapconfig from '@com/Map/mapconfig.js';
import geoJson from '@com/Map/geoJson.js';
import line from '@com/Map/line.js';

import Bread from '@com/Bread'
import points from '@com/Map/points.js';

export default {
	data() {
		return {
			showViewer:false,
			srcList:[],
			qyMarker:'',
			qyMarkerLabel:''
		};
	},
	computed: {},
	created() {},
	mounted() {
		var that=this;
		window.openPop=function (data) {
			that.showPop(data)
		}
		map.show();
		// var data=[{
		// 			name:"桂城街道",
		// 			points:[
		// 				[113.21297682, 23.04531506],
		// 				[113.21550582, 23.04511807],
		// 				[113.22020582, 23.04450508],
		// 				[113.22814182, 23.04549806],
		// 				[113.23363282, 23.04574106],
		// 				[113.23981982, 23.04601405],
		// 				[113.24167082, 23.04622105],
		// 				[113.24479282, 23.04656904],
		// 			]
		// 		},
		// 		{
		// 			name:"九江镇",
		// 			points:[
		// 				[113.004949598496054, 22.804940993433068],
		// 				[112.99971582, 22.80504675],
		// 				[112.998922661713124, 22.804920437563517],
		// 				[112.997941921689645, 22.80491709258667],
		// 				[112.991178295805909, 22.803807979870893],
		// 				[112.983384517459513, 22.803271313399453],
		// 				[112.975165576474794, 22.805603885889383],
		// 				[112.970079829855266, 22.810770435617364],
		// 				[112.967510293988767, 22.814336766341494],
		// 				[112.958858473456502, 22.82986950976526],
		// 				[112.953799980356735, 22.833313391456237],
		// 				[112.937218200635385, 22.8445509877244],
		// 				[112.926225070904891, 22.853722642220763],
		// 				[112.918381671956169, 22.859260531546074],
		// 				[112.917863576060142, 22.859078023463994],
		// 				[112.91741682, 22.86109866],
		// 				[112.91163982, 22.8697245],
		// 				[112.91076282, 22.87423941],
		// 			]
		// 		}
		        
		//        ]
		// 		var obj={
		// 			 data: data,
		// 			 popupCom: hello,
		// 			 popupId: 'hello',
		// 			 isMultipleLabel:false
		// 		}
		// 		line.show(obj);
		// window.map.addLayer(mapconfig.tdtYxLayer);
		// window.map.addLayer(mapconfig.tdtBzLayer);
		// geoJson.hideOtherRegion(gd,mapconfig.tdtYxLayer)
		// geoJson.hideOtherRegion(gd,mapconfig.tdtBzLayer)
		    // geoJson.show(gdZj);
				
			// geoJson.hideOtherRegion(gd);
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
		this.showPoints();
	},
	methods: {
		showPop(url){
			this.showViewer=true;
			this.srcList=url
		},
		showPoints(){
			var that=this;
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
			});
			that.qyMarker = points.addMarker(dataArr);
			points.addMarkerClick('singleclick', 'qiye', function(res) {
				var newObj = {
					params: res,
					popupCom: hello,
					isMultipleLabel: true
				};
				that.qyMarkerLabel = points.addMarkerLabel(newObj);
			});
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
		background: rgba(0,0,0,.5);
	}
	/deep/ .ol-attribution,/deep/ .ol-rotate,/deep/ .ol-zoom{
		display: none;
	}
}
</style>
