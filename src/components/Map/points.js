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
import Overlay from 'ol/Overlay';
import {
	Cluster
} from 'ol/source';
//弹框
import dialogMessage from '@com/Dialog/Dialog.js';
var $zyjdialog = dialogMessage.installDialog();

//引入工具类
import utils from '@utils/utils.js'
var $utils = utils

var points = {
	pointslayer: null,
	clickKey: null,
	moveKey: null,
	obj: null,
	clearPopup: [],
	clearOverlay: [],
	/**
	 *
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
				}
			];
			dataArr.forEach((v, i) => {
				v.iconScale = 0.6;
				v.iconImage = require('@views/Home/img/' + v.id + '.png');
				v.groupId = 'qiye';
				v.effectId = 'qiye' + i;
			});
			that.qyMarker = points.addMarker(dataArr);
			points.addMarkerClick('singleclick', 'qiye', function(res) {
				var newObj = {
					params: res,
					popupCom: home,
					isMultipleLabel: true
				};
				that.qyMarkerLabel = points.addMarkerLabel(newObj);
			});
			points.addMarkerClick('dblclick', 'qiye', function(res) {
			});
			//销毁
			this.qyMarker&&this.qyMarker.destory();
			this.qyMarkerLabel&&this.qyMarkerLabel.destory();
	 */
	addMarker(data) {
		let features = [];
		this.obj = data;
		data.forEach((v, i) => {
			let iconStyle = new Style({
				image: new Icon({
					anchor: [0.5, 1],
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
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
		let pointslayer = new VectorLayer({
			source: vectorSource,
			zIndex: 9999
		});
		window.map.addLayer(pointslayer);

		return {
			destory: function() {
				window.map.removeLayer(pointslayer);
			}
		}
	},
	addMarkerClick(type, groupId, callback) {

		let clickKey = window.map.on(type, function(evt) {
			var feature = window.map.forEachFeatureAtPixel(evt.pixel, function(feature) {
				return feature;
			});
			if (feature && groupId == feature.get('params').groupId) {
				callback(feature.get('params'))
			}
		})
	},
	addMarkerLabel(obj) {
		let that = this;
		let effectId = null;
		if (obj.isMultipleLabel) {
			effectId = obj.params.effectId;
		} else {
			effectId = obj.params.groupId
		}
		this.clearPopup.push({
			effectId: effectId,
			groupId: obj.params.groupId
		});
		$zyjdialog.closePop(effectId);
		$zyjdialog.openPop({
			content: obj.popupCom,
			id: effectId,
			dialogData: obj.params,
			isPostion: false
		});
		setTimeout(() => {
			var element = document.getElementById('zyj-dialog-' + effectId);
			let popup = new Overlay({
				element: element,
				positioning: 'bottom-center',
				stopEvent: true,
				autoPan: true,
				autoPanAnimation: {
					duration: 500
				},
			});
			window.map.addOverlay(popup);
			that.clearOverlay.push({
				popup: popup,
				groupId: obj.params.groupId
			});
			var lnglat = [obj.params.x, obj.params.y];
			popup.setPosition(lnglat);
		});
		return {
			destory: function() {
				that.clearPopup && that.clearPopup.forEach((v) => {
					if (v.groupId == obj.params.groupId) {
						$zyjdialog.closePop(v.effectId);
					}
				})
				that.clearOverlay && that.clearOverlay.forEach((v) => {
					if (v.groupId == obj.params.groupId) {
						window.map.removeOverlay(v.popup);
					}
				})
				that.clearPopup = [];
				that.clearOverlay = [];
			}
		}
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
	hide() {
		window.map.removeLayer(this.pointslayer);
		this.clickKey && window.map.un(this.clickKey.type, this.clickKey.listener);
		this.moveKey && window.map.un(this.moveKey.type, this.moveKey.listener);
		this.obj && this.obj.list && this.obj.list.popupId && $zyjdialog.closePop(this.obj.list.popupId);
		this.obj && this.obj.popupId && $zyjdialog.closePop(this.obj.popupId);
		this.clearPopup.forEach((v) => {
			$zyjdialog.closePop(v);
		})
		this.pointslayer = null;
		this.clickKey = null;
		this.moveKey = null;
		this.obj = null;
	},
}

export default points
