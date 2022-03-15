/**
 *
    var obj={
      center:[104.43561163481785, 31.86788116005738],
      zoom:4.5,
      duration:2000
    }
    location.show(obj)
 */
var location={
  show(obj){
      window.map.getView().animate({ // 只设置需要的属性即可
          center: obj.center, // 中心点
          zoom: obj.zoom, // 缩放级别
          duration: obj.duration // 缩放持续时间，默认不需要设置
      })
  }
}
export default location
