import {
	Style,
	Fill,
	Stroke,
	Text,
} from 'ol/style';

import {
	Vector as VectorLayer
} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON'
import {
	fromExtent
} from "ol/geom/Polygon";
import Feature from 'ol/Feature';
import LinearRing from "ol/geom/LinearRing";
//引入工具类
import utils from '@utils/utils.js'
var $utils = utils


var geoJson = {
	geoJson: null,
	regionsfeatures: null,
	hightSingleLayer: null,
	hightSingleFeature: null,
	clickKey: null,
	/**
	 * 
	   import datalist from '@com/Map/file/nh-zj.json'
	    geoJson.show(datalist);
	 */
	show(obj) {
		let that = this;
		let style = new Style({
			fill: new Fill({
				color: 'rgba(0,229,255,.1)'
			}),
			stroke: new Stroke({
				color: 'rgba(0,229,255,1)',
				width: 4
			}),
			text: new Text({
				// font: '42px  Calibri,sans-serif',
				font: utils.transformEchartsSize(25) + 'px  Calibri,sans-serif',
				fill: new Fill({
					color: '#fff'
				}),
				stroke: new Stroke({
					color: 'transparent',
					width: 3
				})
			})
		});
		that.regionsfeatures = new GeoJSON().readFeatures(obj, {
			dataProjection: 'EPSG:4326',
			featureProjection: 'EPSG:4326'
		})

		var vectorSource = new VectorSource({
			features: that.regionsfeatures
		});

		this.geoJson = new VectorLayer({
			source: vectorSource,
			zIndex: 2,
			style: feature => {
				style.getText().setText(feature.get('Name'));
				return style;
			}
		});
		window.map.addLayer(this.geoJson);
	},
	//点击、hover高亮某个区
	hightSingleRegionByClick() {
		let that = this;
		let hightStyle = new Style({
			fill: new Fill({
				color: 'rgba(0,229,255,.8)'
			}),
			stroke: new Stroke({
				color: 'rgba(0,229,255,1)',
				width: 1
			}),
			text: new Text({
				font: utils.transformEchartsSize(25) + 'px  Calibri,sans-serif',
				fill: new Fill({
					color: 'rgba(255,255,255,1)'
				}),
				stroke: new Stroke({
					color: 'transparent',
					width: 3
				})
			})
		});

		// let moveKey = window.map.on('pointermove', evt => {
		//   if (evt.dragging) {
		//     return;
		//   }
		//   let pixel = window.map.getEventPixel(evt.originalEvent);
		//   displayFeatureInfo(pixel);
		// });

		that.clickKey = window.map.on('click', evt => {
			displayFeatureInfo(evt.pixel);
		});

		function displayFeatureInfo(pixel) {
			// that.hightSingleLayer&&that.hightSingleFeature&&that.hightSingleLayer.getSource().removeFeature(that.hightSingleFeature);
			if (!that.hightSingleLayer) {
				that.hightSingleLayer = new VectorLayer({
					source: new VectorSource(),
					map: window.map,
					style: feature => {
						hightStyle.getText().setText(feature.get('Name'));
						return hightStyle;
					}
				});
			}

			let feature = window.map.forEachFeatureAtPixel(pixel, feature => feature);

			if (feature !== that.hightSingleFeature) {
				if (that.hightSingleFeature) {
					that.hightSingleLayer.getSource().removeFeature(that.hightSingleFeature);
				}
				if (feature) {
					that.hightSingleLayer.getSource().addFeature(feature);
				}
				that.hightSingleFeature = feature;
			}
		}
	},
	//代码控制高亮
	hightSingleRegionByCode(name) {
		let that = this;
		let hightStyle = new Style({
			fill: new Fill({
				color: 'rgba(0,229,255,.8)'
			}),
			stroke: new Stroke({
				color: 'rgba(0,229,255,1)',
				width: 1
			}),
			text: new Text({
				font: utils.transformEchartsSize(25) + 'px  Calibri,sans-serif',
				fill: new Fill({
					color: 'rgba(255,255,255,1)'
				}),
				stroke: new Stroke({
					color: 'transparent',
					width: 3
				})
			})
		});
		this.hightSingleLayer && this.hightSingleFeature && this.hightSingleLayer.getSource().removeFeature(this
			.hightSingleFeature);
		if (!that.hightSingleLayer) {
			that.hightSingleLayer = new VectorLayer({
				source: new VectorSource(),
				zIndex: 2,
				map: window.map,
				style: feature => {
					hightStyle.getText().setText(feature.get('Name'));
					return hightStyle;
				}
			});
		}

		var len = that.regionsfeatures.length;
		for (var i = 0; i <= len; i++) {
			if (that.regionsfeatures[i].values_.Name == name) {
				that.hightSingleLayer.getSource().addFeature(that.regionsfeatures[i]);
				that.hightSingleFeature = that.regionsfeatures[i];
				break;
			}
		}
	},
	//设置合适的视角
	setFitView(obj) {
		if (!obj.features) return
		let that = this;
		let minX = null;
		let minY = null;
		let maxX = null;
		let maxY = null
		obj.features.forEach(item => {
			let boundsArry = item.getGeometry().getExtent()
			if (minX === null) {
				minX = boundsArry[0]
				minY = boundsArry[1]
				maxX = boundsArry[2]
				maxY = boundsArry[3]
			} else {
				minX = Math.min(boundsArry[0], minX)
				minY = Math.min(boundsArry[1], minY)
				maxX = Math.max(boundsArry[2], maxX)
				maxY = Math.max(boundsArry[3], maxY)
			}
		})
		var bounds = [minX, minY, maxX, maxY]
		window.map.getView().fit(bounds,{
			'duration': obj.duration,
			'padding': [$utils.transformEchartsSize(100), $utils.transformEchartsSize(100),
				$utils.transformEchartsSize(100), $utils.transformEchartsSize(100)
			]
			// 'padding': [300,0,0,0]
		})
	},
	//设置某个镇街的适配视角
	setFitViewByRegion(name) {
		let that = this;
		let features = [];
		var len = that.regionsfeatures.length;
		for (var i = 0; i <= len; i++) {
			if (that.regionsfeatures[i].values_.Name == name) {
				features.push(that.regionsfeatures[i]);
				break;
			}
		}
		var obj = {
			features: features,
			duration: 1500
		}
		this.setFitView(obj)
	},
	/**
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
	hide() {
		window.map.removeLayer(this.geoJson);
		this.clickKey && window.map.un(this.clickKey.type, this.clickKey.listener);
		this.hightSingleLayer && this.hightSingleFeature && this.hightSingleLayer.getSource().removeFeature(this
			.hightSingleFeature);
		this.clickKey = null;
		this.hightSingleLayer = null;
		this.hightSingleFeature = null;
	},
	//行政区划分其他区域遮盖
	hideOtherRegion(geojson) {
		let that = this;
		var converGeom = _erase(geojson.features[0].geometry);
		var convertFt = new Feature({
			geometry: converGeom,
		});
		var innerStyle = new Style({
			fill: new Fill({
				color: "rgba(0,0,0, .6)",
			}),
			stroke: new Stroke({
				color: "rgba(0,229,255,1)",
				width: 0,
			}),
		});
		let innerLayer = new VectorLayer({
			source: new VectorSource(),
			zIndex: 4,
			style: innerStyle,
		});
		// var outterStyle = new Style({
		// 	fill: new Fill({
		// 		color: "rgba(0,0,0,0)",
		// 	}),
		// 	stroke: new Stroke({
		// 		color: "rgba(0,229,255,.2)",
		// 		width: 20,
		// 	}),
		// });
		// let outterLayer = new VectorLayer({
		// 	source: new VectorSource(),
		// 	zIndex: 4,
		// 	style: outterStyle,
		// });
		
		innerLayer.getSource().addFeature(convertFt);
		// outterLayer.getSource().addFeature(convertFt);
		window.map.addLayer(innerLayer);
		// window.map.addLayer(outterLayer);
		
		function _erase(geom) {
			var extent = [-180, -90, 180, 90];
			var polygonRing = fromExtent(extent);
			var coords = geom.coordinates;
			coords.forEach((coord) => {
				var linearRing = new LinearRing(coord[0]);
				polygonRing.appendLinearRing(linearRing);
			});
			return polygonRing;
		}
		var regionsfeatures = new GeoJSON().readFeatures(geojson, {
			dataProjection: 'EPSG:4326',
			featureProjection: 'EPSG:4326'
		})
		
		var obj = {
			features:regionsfeatures,
			duration: 1500
		}
		this.setFitView(obj)

	},
}
export default geoJson
