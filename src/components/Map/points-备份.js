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

var flyLine = {
  pointslayer: null,
  clickKey: null,
  moveKey: null,
  obj: null,
  clearPopup: [],
  /**
   *
   var dataArr = [
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
   ];
   var obj = {
     data: dataArr,
     lngLatKey: ['x', 'y'],
     iconScale: 1,
     iconImage: require('@assets/img/避难场所@2x.png'),
     popupCom: bp,
     popupId: 'bp',
     list:{//聚合时传list
       popupCom: dataList,
       popupId: 'dataList',
       left:100,
       top:100
     },
     isCluster: true //是否聚合 true聚合、false不聚合
     isMultipleLabel:true//是否显示多个标牌 true为多个 false为单个
   };


   */
  
  show(obj) {
    let that = this;
    this.obj = obj;
    if (this.pointslayer) {
      this.pointslayer.getSource().clear()
    }
    var ivaryle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: obj.iconImage,
        scale:obj.iconScale?obj.iconScale:1,
      })
    });
    var iconFeatures = [];
    obj.data.forEach((v, i) => {
      var feature = new Feature({
        geometry: new Point([v[obj.lngLatKey[0]], v[obj.lngLatKey[1]]]),
        lnglat: [v[obj.lngLatKey[0]], v[obj.lngLatKey[1]]],
        params: JSON.stringify(v),
        id: obj.popupId + i
      });
      feature.setStyle(ivaryle);
      iconFeatures.push(feature);
    });

    var vectorSource = new VectorSource({
      features: iconFeatures
    });
    if (obj.isCluster) {
      var clusterSource = new Cluster({
        distance: 100,
        source: vectorSource
      });

      var styleCache = {};
      this.pointslayer = new VectorLayer({
        source: clusterSource,
        style: function(feature) {
          var size = feature.get('features').length;
          if (size == 1) {
            return new Style({
              image: new Icon({
                anchor: [0.5, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: obj.iconImage,
                size: obj.iconSize,
                scale: $utils.transformEchartsSize(0.35)
              })
            })
          } else {
            return new Style({
              image: new Circle({
                radius: $utils.transformEchartsSize(32),
                stroke: new Stroke({
                  color: '#6ee237',
                  width: 4
                }),
                fill: new Fill({
                  color: 'rgba(8,20,44,.7)'
                })
              }),
              text: new Text({
                text: size.toString(),
                font: '34px  Calibri,sans-serif',
                fill: new Fill({
                  color: 'white',
                })
              })
            })
          }
        },
        zIndex: 9999
      });
      window.map.addLayer(this.pointslayer);
      this.clickKey = window.map.on('click', function(evt) {
        var feature = window.map.forEachFeatureAtPixel(evt.pixel, function(feature) {
          return feature;
        });
        if (feature) {
          var features = feature.values_.features;

          if (features && features.length > 1 && features.length <= 2) {
            var params = [];
            features.forEach((v, i) => {
              params.push(JSON.parse(v.get('params')))
            })
            setTimeout(() => {
              $zyjdialog.closePop(obj.list.popupId);
              $zyjdialog.openPop({
                content: obj.list.popupCom,
                id: obj.list.popupId,
                left: obj.list.top,
                top: obj.list.left,
                dialogData: JSON.stringify(params),
                isPostion: true
              });
            });
          } else if (features && features.length > 50) {
            $zyjdialog.closePop(obj.list.popupId);
            return
          } else {
            var newFeatures = features && features[0];
            $zyjdialog.closePop(obj.list.popupId);
            if (newFeatures) {
              var obj1 = {
                data: JSON.parse(newFeatures.get('params')),
                lngLatKey: obj.lngLatKey,
                popupCom: obj.popupCom,
                popupId: obj.popupId,
                id: newFeatures.get('id'),
                isMultipleLabel: obj.isMultipleLabel
              };
              that.showLabel(obj1);
            }
          }
        }
      });

      this.moveKey = window.map.on('moveend', function(evt) {
        if (window.map.getView().getZoom() == window.map.getView().getMaxZoom()) {
          clusterSource.setDistance(0);
        } else {
          clusterSource.setDistance(100);
        }
      })
    } else {

      this.pointslayer = new VectorLayer({
        source: vectorSource,
        zIndex: 9999
      });
      window.map.addLayer(this.pointslayer);
      this.clickKey = window.map.on('click', function(evt) {
        var feature = window.map.forEachFeatureAtPixel(evt.pixel, function(feature) {
          return feature;
        });
        if (feature) {
          var obj1 = {
            data: JSON.parse(feature.get('params')),
            lngLatKey: obj.lngLatKey,
            popupCom: obj.popupCom,
            popupId: obj.popupId,
            id: feature.get('id'),
            isMultipleLabel: obj.isMultipleLabel
          };
          that.showLabel(obj1);
        }
      });
    }
  },
  /**
   *
   *
var obj1 = {
       data: {
         id: 1,
         x: 113.201764941395098,
         y: 23.176441910731008
       },
       id:1,
       lngLatKey: ['x', 'y'],
       popupCom: bp,
       popupId: 'bp',
       isMultipleLabel:true
     };
     points.showLabel(obj1);

   */
  showLabel(obj) {
    var id = null;
    if (obj.isMultipleLabel) {
      id = obj.id;
      this.clearPopup.push(id);
    } else {
      id = obj.popupId
      $zyjdialog.closePop(id);
    }
    $zyjdialog.openPop({
      content: obj.popupCom,
      id: id,
      dialogData: JSON.stringify(obj.data),
      isPostion: false
    });
    setTimeout(() => {
      var element = document.getElementById('zyj-dialog-' + id);
      var popup = new Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: true,
        autoPan: true,
        autoPanAnimation: {
          duration: 500
        },
        // autoPanMargin: $utils.transformEchartsSize(750)
      });
      window.map.addOverlay(popup);
      var lnglat = [obj.data[obj.lngLatKey[0]], obj.data[obj.lngLatKey[1]]];
      popup.setPosition(lnglat);
    });

  },
   /**
    * 落点动效   * @param {Object} feature   需要动画的feature   * @param {Object} vectorLayer  feature所属图层   * @param {Object} enterFrom   left 从左到右  rigt从右到左  top 从上倒下  bottom  从下到上   */  addFeature(feature, vectorLayer, enterFrom) {    var geom = feature.getGeometry();    var xy = geom.getCoordinates();    var extent = window.view.calculateExtent(window.map.getSize());    var c = 0.01;    var key = window.map.on("postcompose", function(e) {      if (c >= 1) {        window.map.un(key.type, key.listener);      }      c += 0.01;      geom.setCoordinates(returnCoord(c));    });    geom.setCoordinates(returnCoord(c));    function returnCoord(c) {      var coord = '';      var dy = "";      if (enterFrom == "right") {        dy = extent[2] - xy[0];        coord = [xy[0] + dy * (1 - inAndOut(c)), xy[1]]      } else if (enterFrom == "left") {        dy = extent[2] - xy[0];        coord = [extent[0] + dy * inAndOut(c), xy[1]]      } else if (enterFrom == "top") {        dy = extent[3] - xy[1];        coord = [xy[0], xy[1] + dy * (1 - inAndOut(c))]      } else if (enterFrom == "bottom") {        dy = extent[3] - xy[1];        coord = [xy[0], xy[1] - dy * (1 - inAndOut(c))]      }      return coord;    }    vectorLayer.getSource().addFeature(feature);  },
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
  }
}

export default flyLine
