import TileLayer from 'ol/layer/Tile'
import {
	OSM,
	XYZ,
	TileArcGISRest
} from 'ol/source'

import TileWMS from 'ol/source/TileWMS';
var mapconfig = {
	maptype: 0, // 0 黑地图，1表示OSM, 2表示使用Arcgis在线午夜蓝地图服务  3.天地图
	maplayer: new TileLayer({
		source: new XYZ({
			url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}'
		})
	}),
	streetmap() {
		let maplayer = null
		switch (this.maptype) {
			case 0:
				maplayer = new TileLayer({
					source: new XYZ({
						url: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
					})
				})
				break
			case 1:
				maplayer = new TileLayer({
					source: new OSM()
				})
				//maplayer =new TileLayer({
				//             source: new XYZ({
				//                 url: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
				//             }),
				//         });
				break
			case 2:
				maplayer = new TileLayer({
					source: new TileArcGISRest({
						url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
					})
				})
				break
			case 3:
				maplayer = new TileLayer({
					source: new XYZ({
						url: "http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04"
					}),
				})
				break
			case 4:
				maplayer = new TileLayer({
					source: new TileWMS({
						url: 'http://10.128.185.173:8090/iserver/services/map-agscache-YGBDZDT/rest/maps/YGBDZDT?Key=6FNWdIks3ImNo2meOZxF4Ana',
						params: {
							'LAYERS': 'ZSYX2020',
							'FORMAT': 'image/png'
						}
					}),
					// zIndex: 1,
					// maxZoom: 22,
					// extent: [112.3845788538456, 22.64527189731598,
					//   113.38799642026424, 23.57588157057762
					// ],
					// projection: 'EPSG:4490',
				});
			case 5:
				maplayer = new TileLayer({
					source: new XYZ({
						url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}'
					})
				})
				break

		}
		return maplayer
	}
}
export default mapconfig
