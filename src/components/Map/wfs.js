import {
	GeoJSON,
	WFS
} from 'ol/format';
import {
	like
} from 'ol/format/filter';

import GML from 'ol/format/GML';
import {
	Style,
	Fill,
	Stroke,
	Text,
} from 'ol/style';

import {
	Vector as VectorLayer
} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
var wfs = {
	show() {


		// const featureRequest = new WFS().writeGetFeature({
		//   key: '6FNWdIks3ImNo2meOZxF4Ana',
		//   outputFormat: 'application/json',
		//   featureTypes: ['JYJ_XXXX:GZ2000'],
		//   filter: like('JYJ_XXXX:NAME', '*第三小学*'),
		// });

		// $.ajax({
		//   async: false,
		//   type: "post",
		//   url: `http://10.128.185.173:8090/iserver/services/data-JYJ_XXXX/wfs100/utf-8?key=6FNWdIks3ImNo2meOZxF4Ana`,
		//   data: new XMLSerializer().serializeToString(featureRequest),
		//   success: function(json) { //这里是解析xml
		//     const features = new GML().readFeatures(json);
		//     features.forEach((v, i) => {
		//       var geom = v.getGeometry();
		//       var xy = geom.getCoordinates()
		//       console.log(v.getProperties())
		//     })
		//   }
		// });




		const featureRequest1 = new WFS().writeGetFeature({
			key: '6FNWdIks3ImNo2meOZxF4Ana',
			outputFormat: 'application/json',
			featureTypes: ['SWJ_GSGZGC:GZ2000']
		});
		$.ajax({
			async: false,
			type: "post",
			url: `http://10.128.185.173:8090/iserver/services/data-SWJ_GSGZGC/wfs100/utf-8?key=6FNWdIks3ImNo2meOZxF4Ana`,
			data: new XMLSerializer().serializeToString(featureRequest1),
			success: function(json) { //这里是解析xml
				const features = new GML().readFeatures(json);
				// features.forEach((v, i) => {


				//     console.log(v.getGeometry().getCoordinates())
				// })

				// vectorSource.addFeatures(features);


				const vectorSource = new VectorSource();
				vectorSource.addFeatures(features);

				// window.map.getView().fit(vectorSource.getExtent());
				const vector = new VectorLayer({
					source: vectorSource,
					style: new Style({
						fill: new Fill({
							color: 'rgba(0,229,255,.8)'
						}),
						stroke: new Stroke({
							color: 'rgba(255, 0, 0, 1.0)',
							width: 2,
						}),
					}),
				});

				// console.log(vector);
				window.map.addLayer(vector);


			}
		});



		// fetch('http://10.128.185.173:8090/iserver/services/data-JYJ_XXXX/wfs100/utf-8?key=6FNWdIks3ImNo2meOZxF4Ana', {
		//     method: 'POST',
		//     body: new XMLSerializer().serializeToString(featureRequest),
		//   })
		//   .then(function(response) {
		//     return response.json();
		//   })
		//   .then(function(json) {
		//     console.log(json);
		//     const features = new GeoJSON().readFeatures(json);
		//     console.log(features);
		//   });
	},
	hide() {

	}
}
export default wfs
