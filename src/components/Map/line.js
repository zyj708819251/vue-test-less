import {
	Style,
	Stroke
} from 'ol/style';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import {
	Vector as VectorLayer
} from 'ol/layer';
import {
	LineString
} from 'ol/geom'
import Overlay from 'ol/Overlay';
//弹框
import dialogMessage from '@com/Dialog/Dialog.js';
var $zyjdialog = dialogMessage.installDialog();


/**
 * showLine() {
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
				v.points = v.points;//二维数组
				v.groupId = 'line';
				v.effectId = 'line' + i;
				v.popupCom = hello1;
				v.singleclickCallback = function(e) {
					popup.show(v,e);
				};
			});
			line.show(dataArr);
		},
 */
var line = {
	show(data) {
		let that=this;
		if (!data.length) return;
		const style = new Style({
			stroke: new Stroke({
				color: data[0].lineColor?data[0].lineColor:'#f00',
				width: data[0].lineWidth?data[0].lineWidth:4,
			})
		})
		let lineFeatures = [];
		data.forEach((v, i) => {
			var feature = new Feature({
				geometry: new LineString(v.points),
				params: v,
			});
			feature.setStyle(style);
			lineFeatures.push(feature);
		});
		const vectorSource = new VectorSource({
			features: lineFeatures
		});
		let linelayer = new VectorLayer({
			source: vectorSource,
			zIndex: 9999
		})


		window.map.addLayer(linelayer);
		window.clearLayer.push({
			groupId: data[0].groupId,
			id: linelayer
		})
	},
}

export default line
