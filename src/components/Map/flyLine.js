import EChartsLayer from 'ol-echarts';

var flyLine = {
  flyLinelayer: null,
  show(obj) {
    if(this.flyLinelayer){
      this.flyLinelayer.getSource().clear()
    }
    this.flyLinelayer = new EChartsLayer(getOption(obj));
    this.flyLinelayer.appendTo(window.map);

    function getOption(obj) {


      // var geoCoordMap = {
      //   上海: [121.4648, 31.2891],
      //   北京: [116.4551, 40.2539],
      //   南宁: [108.479, 23.1152],
      //   南昌: [116.0046, 28.6633],
      //   大连: [122.2229, 39.4409],
      //   广州: [113.5107, 23.2196]
      // };
      // var BJData = [
      //   [{
      //       name: '北京'
      //     },
      //     {
      //       name: '上海',
      //       value: 95
      //     }
      //   ],
      //   [{
      //       name: '北京'
      //     },
      //     {
      //       name: '广州',
      //       value: 90
      //     }
      //   ],
      //   [{
      //       name: '北京'
      //     },
      //     {
      //       name: '大连',
      //       value: 80
      //     }
      //   ],
      //   [{
      //       name: '北京'
      //     },
      //     {
      //       name: '南宁',
      //       value: 70
      //     }
      //   ],
      //   [{
      //       name: '北京'
      //     },
      //     {
      //       name: '南昌',
      //       value: 60
      //     }
      //   ]
      // ];
      // var convertData = function(data) {
      //   var res = [];
      //   for (var i = 0; i < data.length; i++) {
      //     var dataItem = data[i];
      //     var fromCoord = geoCoordMap[dataItem[1].name];
      //     var toCoord = geoCoordMap[dataItem[0].name];
      //     if (fromCoord && toCoord) {
      //       res.push({
      //         toName: dataItem[0].name,
      //         fromName: dataItem[1].name,
      //         coords: [fromCoord, toCoord],
      //         value: dataItem[1].value
      //       });
      //     }
      //   }
      //   return res;
      // };
      // var color = ['#a6c84c', '#ffa022', '#46bee9', '#61b8ff', '#0000e1', '#fa00fa', 'pink', '#880015'];
      // var series = [];
      // series.push({
      //   type: 'lines',
      //   zlevel: 2,
      //   effect: {
      //     show: true,
      //     period: 6,
      //     trailLength: 0,
      //     symbol: 'arrow',
      //     symbolSize: 10
      //   },
      //   lineStyle: {
      //     normal: {
      //       color: function(params) {
      //         return color[parseInt((params.value - 60) / 5)];
      //       },
      //       width: 2,
      //       opacity: 0.4,
      //       curveness: 0.2
      //     }
      //   },
      //   data: convertData(BJData)
      // }, {
      //   type: 'effectScatter',
      //   coordinateSystem: 'geo',
      //   zlevel: 2,
      //   rippleEffect: {
      //     brushType: 'stroke'
      //   },
      //   label: {
      //     normal: {
      //       show: true,
      //       position: 'right',
      //       formatter: '{b}'
      //     }
      //   },
      //   symbolSize: 15,
      //   itemStyle: {
      //     normal: {
      //       color: function(params) {
      //         return color[parseInt((params.value[2] - 60) / 5)];
      //       }
      //     }
      //   },
      //   data: BJData.map(function(dataItem) {
      //     return {
      //       name: dataItem[1].name,
      //       value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
      //     };
      //   })
      // });
      // return {
      //   tooltip: {
      //     trigger: 'item'
      //   },
      //   series: series
      // };
      return obj
    }
  },
  hide() {
    this.flyLinelayer.remove();
    this.flyLinelayer=null;
  }
}

export default flyLine
