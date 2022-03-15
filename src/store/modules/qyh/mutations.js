import * as types from "./mutation-types";
export default {
  [types.CHANGE_SHOW](state, data) {
    state.show=data;
  }
}