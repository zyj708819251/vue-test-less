import {
	Map,
	View
} from 'ol';
import mapconfig from '@com/Map/mapconfig';
import {
  defaults as defaultInteractions,
} from 'ol/interaction';
var map = {
	map: null,
	mapView: null,
	mapCenter: [113.423936,23.644399352941175],
	mapZoom: 8,
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
			layers: [],
			target: mapContainer,
			view: view,
			interactions: defaultInteractions({doubleClickZoom: false}),
		});
		this.map = map;
		this.mapView = view;
		window.map = this.map;
		window.view = this.mapView;

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
		window.map.on('click', function(evt) {
			var lnglat = that.map.getCoordinateFromPixel(evt.pixel);
			console.log(lnglat);
		})
	}
}
export default map
