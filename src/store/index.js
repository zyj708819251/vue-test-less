import Vue from 'vue'
import Vuex from 'vuex'
import qyh from './modules/qyh'
import state from './modules/qyh/state'
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		remark: 0,
		userInfo:null
	},
	mutations:{
		updateRemark(state,data){
			state.remark=data;
		},
		newtoken(state,userInfo) {
			state.userInfo = userInfo;
		}
	},
	modules: {
		qyh
	}
})
