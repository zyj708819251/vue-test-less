import Heatmap from 'ol/layer/Heatmap'
import VectorSource from 'ol/source/Vector'
import KML from 'ol/format/KML';
import GeoJSON from 'ol/format/GeoJSON'
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
var heatMap = {
  heatMap: null,
  /**
   *
   var obj={
    data: [
     {
       id: 1,
       x: 113.201764941395098,
       y: 23.176441910731008
     },
     {
       id: 2,
       x: 113.199775736519584,
       y: 23.204539429597769
     }
   ],
    lngLatKey: ['x', 'y'],
    radius:10,
    blur:10
   }
   heatMap.heatMapByPoints(obj);
   */
  heatMapByPoints(obj) {
    var features = [];
    obj.data.forEach((v, i) => {
      var feature = new Feature({
        geometry: new Point([v[obj.lngLatKey[0]], v[obj.lngLatKey[1]]]),
        lnglat: [v[obj.lngLatKey[0]], v[obj.lngLatKey[1]]],
      });
      features.push(feature);
    });
    var vectorSource = new VectorSource({
      features: features
    });
    this.heatMap = new Heatmap({
      source: vectorSource,
      gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
      blur: obj.blur,
      radius: obj.radius
    });
    window.map.addLayer(this.heatMap);
  },
  /**
   *


   var obj={
    data:'http://120.236.32.230:30002/pages/sit/heatMap.kml',
    radius:10,
    blur:10
   }
   heatMap.heatMapByKml(obj);
   */
  heatMapByKml(obj) {
    this.heatMap = new Heatmap({
      source: new VectorSource({
        url: obj.data,
        format: new KML({
          extractStyles: false,
        }),
      }),
      gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
      blur: obj.blur,
      radius: obj.radius
    });
    window.map.addLayer(this.heatMap);
  },
  /**
   *
  import datalist from '@com/Map/file/heatmap.json'
  var obj={
   data:datalist,
   radius:10,
   blur:10
  }
  heatMap.heatMapByGeoJson(obj);
   */
  heatMapByGeoJson(obj) {
    var features = new GeoJSON().readFeatures(obj.data, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:4326'
    })

    var vectorSource = new VectorSource({
      features: features
    });
    this.heatMap = new Heatmap({
      source: vectorSource,
      gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
      blur: obj.blur,
      radius: obj.radius
    });
    window.map.addLayer(this.heatMap);
  },
  hide() {
    window.map.removeLayer(this.heatMap);
  }
}
export default heatMap
