import * as types from "./mutation-types";
export default {
  addAction(context, data) {
    context.commit(types.addMarker,data);
  },
  delAction(context, data) {
    context.commit(types.delMarker,data);
  }
	
}