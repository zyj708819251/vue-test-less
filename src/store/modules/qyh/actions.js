import * as types from "./mutation-types";
export default {
  showAction(context, data) {
    context.commit(types.CHANGE_SHOW,true);
  }
	
}