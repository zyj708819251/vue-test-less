import {
	Map,
	View
} from 'ol';
import mapconfig from '@com/Map/mapconfig';
import {
	defaults as defaultInteractions,
} from 'ol/interaction';
import points from '@com/Map/points.js';

var map = {
	map: null,
	mapView: null,
	mapCenter: [113.423936, 23.644399352941175],
	mapZoom: 6,
	clearLayer: [],
	clearLabel: [],
	show() {
		let that = this;
		var mapContainer = document.getElementById('mapView');
		var view = new View({
			projection: 'EPSG:4326',
			center: this.mapCenter,
			zoom: this.mapZoom,
			maxZoom: 18,
			// minZoom: 8,
		});
		var map = new Map({
			projection: 'EPSG:4326', //坐标系
			// layers: [],
			layers: [mapconfig.maplayer],
			target: mapContainer,
			view: view,
			interactions: defaultInteractions({
				doubleClickZoom: false
			}),
		});
		this.map = map;
		this.mapView = view;
		window.map = this.map;
		window.view = this.mapView;
		window.clearLayer = this.clearLayer;
		window.clearLabel = this.clearLabel;
		
		// F9 ctrl+c 获取当前地图中心点和缩放值
		document.onkeydown = function(e) {
			let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
			if (e1.keyCode == 120) {
				var obj = {
					center: that.map.getView().getCenter(),
					zoom: that.map.getView().getZoom(),
				}
				var textareaEl = document.createElement('textarea');
				textareaEl.setAttribute('readonly', 'readonly');
				textareaEl.value = JSON.stringify(obj);
				document.body.appendChild(textareaEl);
				textareaEl.select();
				var res = document.execCommand('copy');
				document.body.removeChild(textareaEl);
			}
		}
		
		
		
		
		window.map.on('singleclick',function (evt) {
			 addEvent(evt,'singleclickCallback')
		})
		window.map.on('dblclick', function (evt) {
			 addEvent(evt,'dblclickCallback')
			 return false
		})
		function addEvent(evt,type) {
			
			// var lnglat = window.map.getCoordinateFromPixel(evt.pixel);
			// console.log('==='+lnglat);
			// console.log('---'+evt.coordinate);
			var feature = window.map.forEachFeatureAtPixel(evt.pixel, function(feature) {
				return feature;
			});
			if (feature) {
				var features = feature.values_.features;
				if(features&&features.length==1){
					var newFeatures = features && features[0];
					var fun=newFeatures.get('params')
					fun[type]&&fun[type](evt);
				}else if(features&&features.length>1){
					
				}else{
					var fun=feature.get('params')
					fun[type]&&fun[type](evt);
				}
			}
		}
		
		window.map.clearLabel = function(data) {
			if (data) {
				that.clearLabel.forEach((v, i) => {
					if (v.groupId == data||v.id == data) {
						window.map.removeOverlay(window.map.getOverlayById(v.id));
						that.clearLabel.splice(i, 1);
					}
				})
			}
		};
		window.map.clearLayer = function(data) {
			if (data) {
				that.clearLayer.forEach((v, i) => {
					if (v.groupId == data) {
						if(v.key){
							v.key && window.map.un(v.key.type, v.key.listener);
						}
						window.map.removeLayer(v.id);
						that.clearLayer.splice(i, 1);
					}
				})
			}
		};
	}
}
export default map
