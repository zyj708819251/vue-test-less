import * as types from "./mutation-types";
export default {
	[types.addMarker](state, data) {
		state.allMarker = state.allMarker+data;
	},
	[types.delMarker](state, data) {
		state.allMarker = state.allMarker-data;
	}
}
