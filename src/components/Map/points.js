import {
	Circle,
	Style,
	Fill,
	Stroke,
	Text,
	Icon,
} from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import {
	Vector as VectorLayer
} from 'ol/layer';
import {
	Cluster
} from 'ol/source';

//引入工具类
import utils from '@utils/utils.js'
var $utils = utils

/**
 * 	showPoints() {
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
 */


var point = {
	show(data) {
		let that = this;
		if (!data.length) return;
		let features = [];
		data.forEach((v, i) => {
			let iconStyle = new Style({
				image: new Icon({
					anchor: [0.5, 1],
					// anchorXUnits: 'fraction',
					// anchorYUnits: 'pixels',
					src: v.iconImage,
					scale: v.iconScale,
				})
			});
			var feature = new Feature({
				geometry: new Point([v.x, v.y]),
				params: v
			})
			feature.setStyle(iconStyle);
			features.push(feature);
		});
		let vectorSource = new VectorSource({
			features: features
		});

		let pointslayer = null;
		let moveendKey = null;
		if (data[0].isCluster) {
			var clusterSource = new Cluster({
				distance: data[0].distance,
				source: vectorSource
			});
			pointslayer = new VectorLayer({
				source: clusterSource,
				style: function(feature) {
					console.log(feature);
					var size = feature.get('features').length;
					if (size == 1) {
						return new Style({
							image: new Icon({
								anchor: [0.5, 1],
								// anchorXUnits: 'fraction',
								// anchorYUnits: 'pixels',
								src: feature.values_.features[0].get('params')
									.iconImage,
								scale: feature.values_.features[0].get('params')
									.iconScale,
							})
						})
					} else {
						return new Style({
							image: new Circle({
								radius: 18,
								stroke: new Stroke({
									color: '#6ee237',
									width: 2
								}),
								fill: new Fill({
									color: 'rgba(8,20,44,.7)'
								})
							}),
							text: new Text({
								text: size.toString(),
								font: '18px  Calibri,sans-serif',
								fill: new Fill({
									color: 'white',
								})
							})
						})
					}
				},
				zIndex: 9999
			});
			moveendKey = window.map.on('moveend', function(evt) {
				if (window.map.getView().getZoom() == window.map.getView().getMaxZoom()) {
					clusterSource.setDistance(0);
				} else {
					clusterSource.setDistance(data[0].distance);
				}
			})
		} else {
			pointslayer = new VectorLayer({
				source: vectorSource,
				zIndex: 9999
			});
		}
		window.map.addLayer(pointslayer);
		window.clearLayer.push({
			groupId: data[0].groupId,
			id: pointslayer,
			key: moveendKey
		})
	},

	/**
	 * 落点动效
	 * @param {Object} feature   需要动画的feature
	 * @param {Object} vectorLayer  feature所属图层
	 * @param {Object} enterFrom   left 从左到右  rigt从右到左  top 从上倒下  bottom  从下到上
	 */
	addFeature(feature, vectorLayer, enterFrom) {
		var geom = feature.getGeometry();
		var xy = geom.getCoordinates();
		var extent = window.view.calculateExtent(window.map.getSize());
		var c = 0.01;
		var key = window.map.on("postcompose", function(e) {
			if (c >= 1) {
				window.map.un(key.type, key.listener);
			}
			c += 0.01;
			geom.setCoordinates(returnCoord(c));
		});
		geom.setCoordinates(returnCoord(c));

		function returnCoord(c) {
			var coord = '';
			var dy = "";
			if (enterFrom == "right") {
				dy = extent[2] - xy[0];
				coord = [xy[0] + dy * (1 - inAndOut(c)), xy[1]]
			} else if (enterFrom == "left") {
				dy = extent[2] - xy[0];
				coord = [extent[0] + dy * inAndOut(c), xy[1]]
			} else if (enterFrom == "top") {
				dy = extent[3] - xy[1];
				coord = [xy[0], xy[1] + dy * (1 - inAndOut(c))]
			} else if (enterFrom == "bottom") {
				dy = extent[3] - xy[1];
				coord = [xy[0], xy[1] - dy * (1 - inAndOut(c))]
			}
			return coord;
		}
		vectorLayer.getSource().addFeature(feature);
	},
}

export default point
