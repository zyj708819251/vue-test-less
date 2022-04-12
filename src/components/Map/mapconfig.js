import TileLayer from 'ol/layer/Tile'
import {
	OSM,
	XYZ,
	TileArcGISRest
} from 'ol/source'

import TileWMS from 'ol/source/TileWMS';
var mapconfig = {
	maplayer: new TileLayer({
		// source: new XYZ({
		// 	url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}'
		// })
		source: new OSM()
	}),
	//argis影像
	argisYxLayer: new TileLayer({
		source: new TileArcGISRest({
			url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',

		})
	}),
	//天地图影像
	tdtYxLayer: new TileLayer({
		source: new XYZ({
			url: "http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=d6e8f0a38a089d8d2f1cd4847f2a974f"
		}),
	}),
	//天地图标注
	tdtBzLayer: new TileLayer({
		source: new XYZ({
			url: "http://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=d6e8f0a38a089d8d2f1cd4847f2a974f"
		}),
	}),
	wms: new TileLayer({
		visible: true,
		source: new TileWMS({
			url: '',
			params: {
				'LAYERS': 'NH_YX_CGCS2000',
				'FORMAT': 'image/png',
				"VERSION": "1.1.1",
				'CRS': "EPSG:4490",//原数据是EPSG:4527的，通过openlayers转换为4490
				"TRANSPARENT": !0
			}
		}),
		zIndex: 2,
		maxZoom: 20,
		extent: [112.3845788538456, 22.64527189731598,
			113.38799642026424, 23.57588157057762
		],
		projection: 'EPSG:4490',
	})
}
export default mapconfig
