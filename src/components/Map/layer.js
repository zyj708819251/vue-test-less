
import XYZ from 'ol/source/XYZ';

import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {Stroke, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';


var layer = {
  layer: null,
  show() {

   this.layer =   new TileLayer({
            source: new XYZ({
              url: "http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04"
            }),
          })
    window.map.addLayer(this.layer);
  },
  hide() {
    window.map.removeLayer(this.layer);
  }
}
export default layer
