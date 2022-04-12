import Vue from 'vue'
import Vuex from 'vuex'
import qyh from './modules/qyh'
import state from './modules/qyh/state'
Vue.use(Vuex)
/**
import { mapState, mapMutations } from 'vuex';
computed: {
	...mapState(['allMarker', 'allMarkerLabel', ])
},
methods: {
	...mapMutations(['updateMarker', 'updateMarkerLabel']),
}
	
 */
export default new Vuex.Store({
	state:{
		allMarker: null,
		allMarkerLabel:null
	},
	mutations:{
		updateMarker(state,data){
			state.allMarker=data;
		},
		updateMarkerLabel(state,data){
			state.allMarkerLabel=data;
		}
	},
	modules: {
		qyh
	}
})
