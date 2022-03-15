import {
  Map,
  View
} from 'ol';
import {
  Tile as TileLayer
} from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import mapconfig from '@com/Map/mapconfig';


var map = {
  map: null,
  mapView: null,
  mapCenter: [11913773.317644186,4486749.712188885],
  mapZoom: 3.9068905956085187,
  show() {
    let that = this;
    var mapContainer = document.getElementById('mapView');
    var view = new View({
      projection: 'EPSG:3857',
      center: this.mapCenter,
      zoom: this.mapZoom,
      // maxZoom: 15,
      // minZoom: 8,
    });
    var map = new Map({
      projection: 'EPSG:3857', //坐标系
      layers: mapconfig.streetmap(),
      target: mapContainer,
      view: view
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
  }
}
export default map