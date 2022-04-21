import Vue from 'vue'
import Vuex from 'vuex'
import qyh from './modules/qyh'

import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
	storage: window.localStorage
})
Vue.use(Vuex)
/**
import { mapState, mapMutations,mapGetters,mapActions } from 'vuex';

computed: {
	...mapState("qyh",[
		'allMarker'
	]),
	...mapGetters('qyh', [
		'changeMarker'
	])
},

methods: {
	...mapMutations("qyh", [
		'addMarker'
	]),
	...mapActions('qyh', [
		'addAction'
	]),
},
	
 */
export default new Vuex.Store({
	state: {

	},
	mutations: {

	},
	modules: {
		qyh
	},
	plugins: [vuexLocal.plugin]
})
