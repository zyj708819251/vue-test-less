import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import Overlay from "ol/Overlay";
import Feature from "ol/Feature";
import { unByKey } from "ol/Observable";
import { get, transform } from "ol/proj";
import { getVectorContext } from "ol/render";
import TileGrid from "ol/tilegrid/TileGrid";
import VectorSource from "ol/source/Vector";
import { getArea, getLength } from "ol/sphere";
import { LineString, Point, Polygon } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from "ol/style";
import { Draw } from "ol/interaction";
import { Message } from "element-ui";
import {
  ScaleLine,
  FullScreen,
  Attribution,
  OverviewMap,
  defaults as defaultControls
} from "ol/control";
import { boundingExtent } from "ol/extent";
import {
  baiduAnalysis,
  gaodeAnalysis,
  googleAnalysis,
  locationAnalysis,
  openstreetAnalysis,
  saveAddress
} from "@/api/mapAnalysis";
/*对openLayers地图api进行封装*/
export default class map {
  /*
    *  @targetEle {Str} 元素类名选择器
       @center    {Arr} 经纬度
       @zoom      {Num} 地图缩放
       @minZoom   {Num} 地图最小的缩放
       @maxZoom   {Num} 地图最大的缩放值
    * */
  constructor({ targetEle, center, zoom, minZoom, maxZoom }) {
    this.index = 0;
    this.speedVal = 0; //速度值
    this.moveTrackFn = null; //移动轨迹函数
    this.zoom = zoom; //地图的缩放
    this.speedObj = null; //速度对象
    this.position = null;
    this.draw = null; //绘画对象
    this.mapObj = null; //地图对象
    this.markerLayer = null; //marker图层对象
    this.infoWindows = []; //信息窗体
    this.helpTooltip = null;
    this.moveMarker = null;
    this.vector = null; //矢量对象
    this.source = null; //地图加载源
    this.points = null; //地图的经纬度
    this.sketch = null; //绘画的草图
    this.center = center; //地图的经纬度
    this.measureTooltip = null; //
    this.animating = false; //监听轨迹回放进度
    this.lineString = null; //绘制成线的对象
    this.minZoom = minZoom; //地图最小缩放值
    this.maxZoom = maxZoom; //地图最大缩放值
    this.targetEle = targetEle; //地图呈现的目标元素
    this.measureTooltipElement = null; //测量时的提示对象
    this.helpTooltipElement = null;
  }

  /*地图初始化*/
  init() {
    let attriBution = new Attribution({});
    this.mapObj = new Map({
      target: this.targetEle,
      view: this.getView(),
      controls: defaultControls({ attribution: true }).extend([
        attriBution,
        new FullScreen(),
        new ScaleLine({
          units: "metric"
        })
      ])
    });
    this.createLayers();
    this.addThumbnailsControl();
  }

  /*创建轨迹地图*/
  createTrackMap(points, iconPath) {
    this.points = points;
    this.lineString = new LineString(points, "XY").transform(
      "EPSG:4326",
      "EPSG:3857"
    );
    let length = this.lineString.length;
    for (let i = 0; i < length; i++) {
      this.lineString[i].forEachSegment(function(start, end) {
        let dx = end[0] - start[0];
        let dy = end[1] - start[1];
        let rotation = Math.atan2(dy, dx);
        // arrows
        this.styles.push(
          new Style({
            geometry: new Point(end),
            image: new Icon({
              src:
                "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
              anchor: [0.75, 0.5],
              rotateWithView: true,
              rotation: -rotation
            })
          })
        );
      });
    }
    let center = this.lineString.getCoordinates();
    this.a = this.lineString.getCoordinates();
    this.routeLength = center.length;
    // 轨迹图层
    let routeFeature = new Feature({
      type: "route",
      geometry: this.lineString
    });
    let startMarker = new Feature({
      type: "startIcon",
      geometry: new Point(center[0])
    });
    this.endMarker = new Feature({
      type: "endIcon",
      geometry: new Point(center[this.routeLength - 1])
    });
    this.position = startMarker.getGeometry().clone();
    this.moveMarker = new Feature({
      type: "moveIcon",
      geometry: this.position
    });
    this.styles = {
      route: new Style({
        stroke: new Stroke({
          width: 15,
          color: [0, 255, 0, 0.8]
        })
      }),
      startIcon: new Style({
        image: new CircleStyle({
          radius: 7,
          snapToPixel: false,
          fill: new Fill({ color: "#30C0FF" }),
          stroke: new Stroke({
            color: "white",
            width: 1
          })
        })
      }),
      endIcon: new Style({
        image: new CircleStyle({
          radius: 7,
          snapToPixel: false,
          fill: new Fill({ color: "red" }),
          stroke: new Stroke({
            color: "white",
            width: 1
          })
        })
      }),
      moveIcon: new Style({
        image: new Icon({
          scale: 0.6,
          anchor: [0.5, 1],
          src: iconPath
        })
      })
    };
    this.animating = false; //监听轨迹是否在运行
    let that = this;
    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [routeFeature, this.moveMarker, startMarker, this.endMarker]
      }),
      style: function(feature) {
        return that.styles[feature.get("type")];
      }
    });
    this.mapObj.addLayer(this.vectorLayer);
    this.viewExtent(points[0]);
  }
  /*创建可以绘制多边形的地图*/
  createPolygonMap() {
    this.init(); //初始化地图
    this.createLayers(); //为地图设置多图层
    this.source = new VectorSource({ wrapX: false });
    this.vector = new VectorLayer({
      source: this.source
    });
    this.mapObj.addLayer(this.vector);
    this.addInteraction("LineString");
  }

  createPopupMap() {
    this.init();
    this.markerLayer = new VectorLayer({
      source: new VectorSource({
        features: []
      })
    });
    this.mapObj.addLayer(this.markerLayer);
    this.markerLayer.setVisible(true);
  }

  /*为地图添加矢量图层*/
  addInteraction(drawType) {
    this.draw = new Draw({
      source: this.source,
      type: drawType,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)"
        }),
        stroke: new Stroke({
          color: "rgba(0, 0, 0, 0.5)",
          lineDash: [10, 10],
          width: 2
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: "rgba(0, 0, 0, 0.7)"
          }),
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)"
          })
        })
      })
    });
    this.createMeasureTooltip(this.mapObj);
    this.createHelpTooltip(this.mapObj);
    this.mapObj.addInteraction(this.draw);
    this.pointerFn = this.pointerMoveHandler.bind(this);
    this.mouseOutFn = this.mouseoutHandler.bind(this);
    this.mapObj.on("pointermove", this.pointerFn); //监听地图的鼠标移动
    this.mapObj.getViewport().addEventListener("mouseout", this.mouseOutFn); //监听鼠标离开时的事件
    let listener;
    this.draw.on("drawstart", evt => {
      // set sketch
      this.sketch = evt.feature;
      console.log("this.sketch的值", this.sketch);
      let tooltipCoord = evt.coordinate;
      listener = this.sketch.getGeometry().on("change", evt => {
        const geom = evt.target;
        let lenth = getLength(geom);
        let output;
        console.log("this.sketch的值", lenth);
        if (geom instanceof Polygon) {
          output = this.formatArea(geom);
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof LineString) {
          output = this.formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();
        }
        this.measureTooltipElement.innerHTML = output;
        this.measureTooltip.setPosition(tooltipCoord);
      });
    }); //监听
    this.draw.on("drawend", () => {
      this.measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
      this.measureTooltip.setOffset([0, -7]);
      // unset sketch
      this.sketch = null;
      // unset tooltip so that a new one can be created
      this.measureTooltipElement = null;
      this.createMeasureTooltip(this.mapObj);
      unByKey(listener);
    }); //
  }

  /*在地图上绘制多边形*/
  drawPolygon(drawType) {
    this.mapObj.removeInteraction(this.draw); //先移除上一次的draw
    this.addInteraction(drawType); //再创建draw
  }

  /*转换中心点*/
  transformCenter() {
    let view = new View({
      center: new Point(this.center)
        .transform("EPSG:4326", "EPSG:3857")
        .getCoordinates(),
      zoom: this.zoom,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom
    });
    this.mapObj.setView(view);
  }

  /*播放轨迹*/
  playTrack(speedRef) {
    if (this.animating) {
      //关闭轨迹动画
      this.stopTrack(true);
    } else {
      //开启轨迹动画
      // console.log("动画开始了");
      this.animating = true;
      this.speedObj = speedRef;
      this.moveTrackFn = this.moveTrack.bind(this);
      this.vectorLayer.on("postrender", this.moveTrackFn); //触发轨迹的移动事件
      this.moveMarker.setGeometry(null);
      return this.index;
    }
  }
  /*移动轨迹事件*/
  moveTrack(event) {
    let vectorContext = getVectorContext(event);
    if (this.animating) {
      this.speedVal += this.speedObj.value;
      this.index = Math.round(this.speedVal / 1000);
      if (this.index >= this.routeLength) {
        this.index = 0;
        this.speedVal = 0;
        this.stopTrack(true);
        Message.success({
          message: "播放完成",
          type: "success"
        });
        return;
      }
      // console.log("@@@》", this.index);
      let currentPoint = new Point(this.a[this.index]);
      let feature = new Feature(currentPoint);
      vectorContext.drawFeature(feature, this.styles.moveIcon);
      this.mapObj.render();
    }
  }
  /*停止轨迹播放*/
  stopTrack() {
    if (this.animating) {
      this.index = 0;
      this.speedVal = 0;
      this.animating = false;
      this.moveMarker.setGeometry(this.position);
      this.vectorLayer.un("postrender", this.moveTrackFn);
    }
  }

  /*
   * 为地图设置视图center,zoom,minZoom,maxZoom
   * projection:"EPSG:3857",//使用这个坐标系
   * projection: "EPSG:4326",//使用这个坐标系
   * */
  getView() {
    let view = new View({
      // projection: "EPSG:4326",//使用这个坐标系
      center: transform(this.center, "EPSG:4326", "EPSG:3857"),
      // center:this.center,
      zoom: this.zoom,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom
    });
    return view;
  }
  /*创建一个经纬度(坐标点)*/
  getPoint(point) {
    return new Point(point).transform("EPSG:4326", "EPSG:3857");
  }
  /*视野自适应*/
  viewExtent(ponit) {
    try {
      let transformPoint = this.getPoint(ponit).getCoordinates();
      let extent = new boundingExtent([transformPoint]);
      this.mapObj.getView().fit(extent, this.mapObj.getSize());
      if (this.mapObj.getView().getZoom() > 18) {
        this.mapObj.getView().setZoom(16);
      }
      this.mapObj.renderSync();
    } catch (err) {
      console.log("Field of view adaptive Exception!");
    }
  }

  /*
  向地图中添加遮盖物
 * @container {Object} 为某个Dom元素添加遮罩层
 * */
  setOverlays(imei, container) {
    let overlay = new Overlay({
      id: imei,
      element: container, //在某个元素上面添加这个图层
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.mapObj.addOverlay(overlay);
    this.infoWindows.push(overlay);
    // this.overlay = overlay;
    return overlay;
  }
  /* 创建Marker标注*/
  createMarker(id, point, url) {
    let marker = new Feature({
      geometry: this.getPoint(point)
    });
    let iconStyle = new Style({
      image: new Icon({
        opacity: 0.75,
        src: url
      })
    });
    marker.setId(id);
    marker.setStyle(iconStyle);
    this.markerLayer.getSource().addFeature(marker);
    return marker;
  }
  /*  获取一个标记*/
  getMarker(id, point, url) {
    let marker = this.findMarker(id);
    if (marker) {
      if (point) {
        let markerPoint = this.getPoint(point);
        marker.setGeometry(markerPoint);
      }
    } else {
      this.createMarker(id, point, url);
    }
  }
  /* 设置标记*/
  setMarker(id, point) {
    let marker = this.findMarker(id);
    if (marker) {
      if (point) {
        let markerPoint = this.getPoint(point);
        marker.setGeometry(markerPoint);
      }
    }
  }
  /*查找标记*/
  findMarker(id) {
    let marker = this.markerLayer.getSource().getFeatureById(id);
    return marker;
  }
  setPopup(id, point, htmlContent) {
    let infoWindow = this.findPopup(id);
    if (infoWindow) {
      if (point != null) {
        infoWindow.setPosition(point.getCoordinates());
      }
      if (htmlContent != null) {
        var content = document.getElementById("popup-content-" + id);
        if (content != undefined) {
          content.innerHTML = htmlContent;
        }
      }
    }
    return infoWindow;
  }
  /*
   * 为marker设置popup
   * @container {Object} 为某个Dom元素添加遮罩层
   * @content {Obj} 向某个Dom元素里添加标签
   * @callback {Fun} 自定义popup中有哪些标签的函数
   * */
  createPopup(imeiId, container, content, str) {
    this.setOverlays(imeiId, container);
    this.mapObj.on("singleclick", evt => {
      let feature = this.mapObj.forEachFeatureAtPixel(evt.pixel, function(
        feature
      ) {
        return feature;
      });
      if (feature) {
        console.log("@@@》", evt);
        let coordinate = evt.coordinate;
        content.innerHTML = str;
        this.infoWindows.forEach(item => {
          if (item.id === imeiId) {
            item.setPosition(coordinate);
          }
        });
        // this.overlay.setPosition(coordinate);
      } else {
        this.closePopup();
      }
    });
  }
  mapClick() {
    this.mapObj.on("singleclick", evt => {
      let feature = this.mapObj.forEachFeatureAtPixel(evt.pixel, function(
        feature
      ) {
        return feature;
      });
      if (feature) {
        let id = feature.getId();
        document.getElementById(`popup-${id}`).style.display = "block";
      }
    });
  }
  /*获取一个信息窗体*/
  getInfoWindow(id, point, htmlContent) {
    let infoWindow = this.findInfoWindow(id);
    let transformPoint = this.getPoint(point);
    if (infoWindow) {
      this.setInfoWindow(id, point, htmlContent);
    } else {
      infoWindow = this.createInfoWindow(id, transformPoint, htmlContent);
      infoWindow.id = id;
      this.infoWindows.push(infoWindow);
    }
    this.mapClick();
  }
  /* 设置信息窗体*/
  setInfoWindow(id, point, htmlContent) {
    let infoWindow = this.findInfoWindow(id);
    if (infoWindow) {
      if (point) {
        let infoWindowPoint = this.getPoint(point);
        infoWindow.setPosition(infoWindowPoint.getCoordinates());
      }
      if (htmlContent) {
        let content = document.getElementById("popup-content-" + id);
        if (content) {
          content.innerHTML = htmlContent;
        }
      }
    }
  }
  /*查询信息窗体*/
  findInfoWindow(id) {
    for (let i = 0; i < this.infoWindows.length; i++) {
      let infoWindow = this.infoWindows[i];
      if (infoWindow.id == id) {
        return infoWindow;
      }
    }
    return null;
  }
  parseToDOM(str) {
    var div = document.createElement("div");
    if (typeof str == "string") div.innerHTML = str;
    return div.childNodes;
  }
  /*创建信息窗体*/
  createInfoWindow(id, point, htmlContent) {
    let html = `<div id="popup-${id}" class="ol-popup" style="display:none;">
        <a href="javascript:void(0)" id="popup-closer-${id}" class="ol-popup-closer" @click.stop="closePopup"></a>
        <div id="popup-content-${id}" class="popup-content">${htmlContent}</div>
        </div>`;
    let ele = this.parseToDOM(html)[0];
    let viewport = this.mapObj.getViewport();
    viewport.append(ele);
    document.getElementById(`popup-closer-${id}`).onclick = function() {
      document.getElementById(`popup-${id}`).style.display = "none";
    };
    let infoWindow = new Overlay({
      element: document.getElementById(`popup-${id}`),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.mapObj.addOverlay(infoWindow);
    infoWindow.setPosition(point.getCoordinates());
    return infoWindow;
  }
  /* 移除信息窗体*/
  removeInfoWindow(id) {
    for (let i = 0; i < this.infoWindows.length; i++) {
      let infoWindow = this.infoWindows[i];
      if (infoWindow.id == id) {
 
        return false;
      }
    }
  }
  /*移除一个marker*/
  removeMarkerAndOverLayer(imeiId) {
    let hasMarker = this.findMarker(imeiId);
    if (hasMarker) {
      this.markerLayer.getSource().removeFeature(hasMarker);
      this.mapObj.removeOverlay(this.mapObj.getOverlayById(imeiId));
    }
  }
  /*移除所有marker*/
  removeAllMarker() {
    this.markerLayer.getSource().clear();
  }
  /* 设置地图中心点*/
  setCenterAndZoom(point, zoom) {
    if (zoom) {
      this.mapObj.getView().setZoom(zoom);
    }
    this.center = point;
  }
  /*获取不同类型的地图图层*/
  setLayers(mapType, visible) {
    let path = "";
    let descript = "";
    let customLayers = null;
    if (mapType === "openStreetMap") {
      //根据用户选择的地图类型加载不同的地图资源
      path = "http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      descript =
        'Map data &copy; <a href="http://www.openstreetmap.org" target="_blank">OpenStreetMap</a>';
      customLayers = this.setMapSource(path, descript, true);
      customLayers.set(mapType, mapType, true);
    } else if (mapType === "gaoDeMap") {
      descript =
        'Map data &copy; <a href="http://ditu.amap.com/" target="_blank">高德地图</a>';
      path =
        "http://webrd0{1-4}.is.autonavi.com/appmaptile?size=1&scale=1&style=7&x={x}&y={y}&z={z}";
      customLayers = this.setMapSource(path, descript, visible);
      customLayers.set(mapType, mapType, true);
    } else if (mapType === "gaoDeMapSate") {
      path =
        "http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
      descript =
        'Map data &copy; <a href="http://ditu.amap.com/" target="_blank">高德地图</a>';
      customLayers = this.setMapSource(path, descript, visible);
      customLayers.set(mapType, mapType, true);
    } else if (mapType === "googleMap") {
      path = "http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
      descript =
        'Map data &copy; <a href="http://www.openstreetmap.org" target="_blank">OpenStreetMap</a>';
      customLayers = this.setMapSource(path, descript, visible);
      customLayers.set(mapType, mapType, true);
    } else if (mapType === "googleMapSate") {
      path = "http://mt{0-3}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}";
      descript =
        'Map data &copy; <a href="http://www.openstreetmap.org" target="_blank">OpenStreetMap</a>';
      customLayers = this.setMapSource(path, descript, visible);
    } else if (mapType === "baiduMap") {
      customLayers = this.baiduSource(mapType, visible);
      customLayers.set(mapType, mapType, true);
    } else if (mapType === "baiduMapSate") {
      customLayers = this.baiduSource(mapType, visible);
      customLayers.set(mapType, mapType, true);
    }
    this.mapObj.addLayer(customLayers); //将创建的地图资源添加到map对象中
    return customLayers;
  }

  /*加载除百度地图以外的地图资源*/
  setMapSource(url, str, visible) {
    return new TileLayer({
      visible,
      source: new XYZ({
        url,
        attributions: [str]
      })
    });
  }
  /*为地图设置鹰眼*/
  addThumbnailsControl() {
    this.mapObj.addControl(
      new OverviewMap({
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: this.getView()
      })
    );
  }

  /*根据图层的类型切换图层*/
  toggleMap(mapType) {
    let num = this.customLayersArr.length;
    for (let i = 0; i < num; i++) {
      this.customLayersArr[i].layer.setVisible(false);
      if (this.customLayersArr[i].mapType === mapType) {
        this.customLayersArr[i].layer.setVisible(true);
      }
    }
  }

  /*创建多种地图资源*/
  createLayers() {
    this.customLayersArr = [
      { mapType: "gaoDeMap", redress: "1", showText: "Gaode Map", layer: null },
      {
        mapType: "googleMap",
        redress: "1",
        showText: "Google Map",
        layer: null
      },
      {
        mapType: "gaoDeMapSate",
        redress: "1",
        showText: "Gaode Sate Map",
        layer: null
      },
      {
        mapType: "openStreetMap",
        redress: "0",
        showText: "OpenStreetMap",
        layer: null
      },

      {
        mapType: "googleMapSate",
        redress: "0",
        showText: "Google Sate Map",
        layer: null
      }
    ];
    this.customLayersArr.forEach(item => {
      //循环创建多种图层
      let layersVal = this.setLayers(item.mapType, false);
      item.layer = layersVal;
    });
  }

  /*加载百度地图资源*/
  baiduSource(mapType, visible) {
    let projection = get("EPSG:4326");
    let resolutions = [];
    for (let i = 0; i < 19; i++) {
      resolutions[i] = Math.pow(2, 18 - i);
    }
    let tilegrid = new TileGrid({
      origin: [0, 0],
      tileSize: [256, 256],
      resolutions: resolutions
    });
    for (let i = 0; i < 19; i++) {
      resolutions[i] = Math.pow(2, 18 - i);
    }
    let source = new XYZ({
      projection: projection,
      tileGrid: tilegrid,
      crossOrigin: "anonymous", //跨域
      tileUrlFunction: function(tileCoord) {
        if (!tileCoord) {
          return "";
        }
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = tileCoord[2];
        if (x < 0) {
          x = "M" + -x;
        }
        if (y < 0) {
          y = "M" + -y;
        }
        if (mapType == "baiduMap") {
          return `http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=${x}&y=${y}&z=${z}&styles=pl&udt=20170301&scaler=1&p=1`;
          /*        return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=udt=20170908&scaler=1&p=1";*/
        } else if (mapType == "baiduMapSate") {
          return (
            "http://shangetu3.map.bdimg.com/it/u=x=" +
            x +
            ";y=" +
            y +
            ";z=" +
            z +
            ";v=009;type=sate&fm=46&udt=20170301"
          );
        }
      },
      attributions: [
        'Map data &copy; <a href="http://map.baidu.com" target="_blank">Baidu Map</a>'
      ]
    });
    let baiduLayer = new TileLayer({
      visible: false, //不可见
      source: source
    });
    return baiduLayer;
  }

  /*点的移动处理*/
  pointerMoveHandler(evt) {
    console.log("我是移动时的函数");
    if (evt.dragging) {
      return;
    }
    let helpMsg = "Click to start drawing";
    if (this.sketch) {
      const geom = this.sketch.getGeometry();
      if (geom instanceof Polygon) {
        //几何图形的提示信息
        helpMsg = "Click to continue drawing the polygon";
      } else if (geom instanceof LineString) {
        //线性的提示信息
        helpMsg = "Click to continue drawing the line";
      }
    }
    this.helpTooltipElement.innerHTML = helpMsg;
    this.helpTooltip.setPosition(evt.coordinate);
    this.helpTooltipElement.classList.remove("hidden");
  }

  /*鼠标按下的操作*/
  mouseoutHandler() {
    this.helpTooltipElement.classList.add("hidden");
  }

  /*创建测量提示工具*/
  createMeasureTooltip(map) {
    if (this.measureTooltipElement && this.measureTooltipElement.parentNode) {
      this.measureTooltipElement.parentNode.removeChild(
        this.measureTooltipElement
      );
    }
    this.measureTooltipElement = document.createElement("div");
    this.measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
    this.measureTooltip = new Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: "bottom-center"
    });
    map.addOverlay(this.measureTooltip);
  }

  /*创建帮助提示工具*/
  createHelpTooltip(map) {
    if (this.helpTooltipElement && this.helpTooltipElement.parentNode) {
      this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
    }
    this.helpTooltipElement = document.createElement("div");
    this.helpTooltipElement.className = "ol-tooltip hidden";
    this.helpTooltip = new Overlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: "center-left"
    });
    map.addOverlay(this.helpTooltip);
  }

  /*输出格式几何图形的结果*/
  formatArea(polygon) {
    let area = getArea(polygon);
    let output = "";
    if (area > 10000) {
      output =
        Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
    } else {
      output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
    }
    return output;
  }

  /*输出绘制线性结果*/
  formatLength(line) {
    let length = getLength(line, { projection: "EPSG:4326" });
    let output = "";
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + " km";
    } else {
      output = Math.round(length * 100) / 100 + " m";
    }
    return output;
  }
  /*反地址解析*/
  async getGeocoderAddress(lat, lng, mapType, callback) {
    let key = "";
    if (mapType == "googleMap") {
      let str = mapType.toLowerCase();
      key = "AIzaSyCnvUhER3zdCEEElRWNomaQjCLUYm6kHiQ";
      let { data } = await googleAnalysis(key, lat, lng);
      console.log("googleMap地图解析", data);
      // saveAddress({lat, lng,'mapType':str,'address':data.display_name})
      return data;
    } else if (mapType == "baiduMap") {
      let str = mapType.toLowerCase();
      key = "AIzaSyCnvUhER3zdCEEElRWNomaQjCLUYm6kHiQ";
      let { data } = await baiduAnalysis(key, lat, lng);
      console.log("baiduMap地图解析", data);
      // saveAddress({lat, lng,'mapType':str,'address':data.display_name})
      return data;
    } else if (mapType == "gaodeMap") {
      let str = mapType.toLowerCase();
      key = "AIzaSyCnvUhER3zdCEEElRWNomaQjCLUYm6kHiQ";
      let { data } = await gaodeAnalysis(key, lat, lng);
      console.log("gaodeMap地图解析", data);
      // saveAddress({lat, lng,'mapType':str,'address':data.display_name})
      return data;
    } else if (mapType == "openStreetMap") {
      let str = mapType.toLowerCase();
      let { data } = await openstreetAnalysis(lat, lng);
      // saveAddress({lat, lng,'mapType':str,'address':data.display_name})
      return data.display_name;
    }
  }
  /*地址解析*/
  async getGeocoderPointByAddress(address, callback) {
    let key = "AIzaSyDY0kkJiTPVd2U7aTOAwhc9ySH6oHxOIYM";
    let { data } = locationAnalysis(address, key);
  }
}

