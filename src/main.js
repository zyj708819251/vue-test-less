import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

if (process.env.NODE_ENV == 'development') {
  //是否启用vue开发者工具
  Vue.config.devtools = true
  window.$rootUrl = '';
} else {
  Vue.config.devtools = false
  window.$rootUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '')
}
Vue.prototype.$rootUrl =window.$rootUrl;

//重置样式
import '@assets/css/reset.css'

// 引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


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
import elDragDialog from '@utils/mydrag.js' // 引入移动事件（el-drag-dialog.js的内容为上面的代码块）
Vue.directive('el-drag-dialog', elDragDialog);//添加标签事件绑定 可以放大移动弹窗
//弹窗默认点击遮罩改为不关闭 为了防止和拖拽冲突 ，这句需要放在use ElementUI之前（也可以不加这句，自己测试区别）
ElementUI.Dialog.props.closeOnClickModal.default = false;
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
