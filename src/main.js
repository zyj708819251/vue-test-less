import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

var $rootUrl='';
if (process.env.NODE_ENV == 'development') {
  //是否启用vue开发者工具
  Vue.config.devtools = true
  $rootUrl = '';
} else {
  Vue.config.devtools = false
  $rootUrl = window.origin
}
Vue.prototype.$rootUrl =$rootUrl;

//重置样式
import '@assets/css/reset.css'

// 引入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


//引用qs
import qs from 'qs'
Vue.prototype.$qs = qs;

// 引入Echarts插件
import Echarts from 'echarts'
Vue.prototype.$echarts = Echarts


//引入工具类
import utils from '@utils/utils.js'
Vue.prototype.$utils = utils

//拖动
import zyjdrag from '@utils/drag.js'

//bus
import bus from '@utils/bus.js';
Vue.prototype.$bus = bus;

//rem
import '@utils/rem.js';


//弹框
import dialogMessage from '@com/Dialog/Dialog.js';
Vue.prototype.$zyjdialog = dialogMessage.installDialog();

var $vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
