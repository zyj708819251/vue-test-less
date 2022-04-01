import {
	Style,
	Stroke
} from 'ol/style';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import {
	Vector as VectorLayer
} from 'ol/layer';
import {
	LineString
} from 'ol/geom'
import Overlay from 'ol/Overlay';
//弹框
import dialogMessage from '@com/Dialog/Dialog.js';
var $zyjdialog = dialogMessage.installDialog();
/**
 * var data=[{
			name:"桂城街道",
			points:[
				[113.21297682, 23.04531506],
				[113.21550582, 23.04511807],
				[113.22020582, 23.04450508],
				[113.22814182, 23.04549806],
				[113.23363282, 23.04574106],
				[113.23981982, 23.04601405],
				[113.24167082, 23.04622105],
				[113.24479282, 23.04656904],
			]
		},
		{
			name:"九江镇",
			points:[
				[113.004949598496054, 22.804940993433068],
				[112.99971582, 22.80504675],
				[112.998922661713124, 22.804920437563517],
				[112.997941921689645, 22.80491709258667],
				[112.991178295805909, 22.803807979870893],
				[112.983384517459513, 22.803271313399453],
				[112.975165576474794, 22.805603885889383],
				[112.970079829855266, 22.810770435617364],
				[112.967510293988767, 22.814336766341494],
				[112.958858473456502, 22.82986950976526],
				[112.953799980356735, 22.833313391456237],
				[112.937218200635385, 22.8445509877244],
				[112.926225070904891, 22.853722642220763],
				[112.918381671956169, 22.859260531546074],
				[112.917863576060142, 22.859078023463994],
				[112.91741682, 22.86109866],
				[112.91163982, 22.8697245],
				[112.91076282, 22.87423941],
			]
		}
         
        ]
		var obj={
			 data: data,
			 popupCom: hello,
			 popupId: 'hello',
			 isMultipleLabel:false
		}
		line.show(obj);
 */




var line = {
	linelayer: null,
	clickKey:null,
	obj:null,
	clearPopup:[],
	show(obj) {
		let that=this;
		this.obj=obj;
		if (this.linelayer) {
			this.linelayer.getSource().clear()
		}

		const style = new Style({
			stroke: new Stroke({
				color: '#409eff',
				width: 6,
			})
		})
		let lineFeatures = [];
		obj.data.forEach((v, i) => {
			var feature = new Feature({
				geometry: new LineString(v.points),
				params: v,
				id: obj.popupId + i
			});
			feature.setStyle(style);
			lineFeatures.push(feature);
		});
		const vectorSource = new VectorSource({
			features: lineFeatures
		});
		this.linelayer = new VectorLayer({
			source: vectorSource,
			zIndex: 9999
		})


		window.map.addLayer(this.linelayer);


		this.clickKey = window.map.on('click', function(evt) {
			var feature = window.map.forEachFeatureAtPixel(evt.pixel, function(feature) {
				return feature;
			});
			if (feature) {
				// $zyjdialog.closePop(feature.get('id'));
				// $zyjdialog.openPop({
				// 	content: obj.popupCom,
				// 	id: feature.get('id'),
				// 	dialogData: feature.get('params'),
				// 	isPostion: false
				// });
				// setTimeout(() => {
				// 	var element = document.getElementById('zyj-dialog-' + feature.get('id'));
				// 	var popup = new Overlay({
				//  	element: element,
				// 		positioning: 'bottom-center',
				// 		stopEvent: true,
				// 		autoPan: true,
				// 		autoPanAnimation: {
				// 			duration: 500
				// 		},
				// 	});
				// 	window.map.addOverlay(popup);
				// 	var lnglat = window.map.getCoordinateFromPixel(evt.pixel);
				// 	popup.setPosition(lnglat);
				// });
				
				var obj1 = {
				  data: feature.get('params'),
				  lngLat:evt.coordinate,
				  popupCom: obj.popupCom,
				  popupId: obj.popupId,
				  id: feature.get('id'),
				  isMultipleLabel: obj.isMultipleLabel
				};
				that.showLabel(obj1);
				
			}
		});
	},
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
	    dialogData: obj.data,
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
	    });
	    window.map.addOverlay(popup);
	    var lnglat = obj.lngLat;
	    popup.setPosition(lnglat);
	  });
	},
	hide() {
		this.obj && this.obj.popupId && $zyjdialog.closePop(this.obj.popupId);
		this.clearPopup.forEach((v) => {
		  $zyjdialog.closePop(v);
		})
		window.map.removeLayer(this.linelayer);
		this.clickKey && window.map.un(this.clickKey.type, this.clickKey.listener);
		this.linelayer = null;
		this.clickKey = null;
		this.obj = null;
	}
}

export default line
