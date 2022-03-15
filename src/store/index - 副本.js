import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    stateServer: [],
    oldServer: [],
    allTimer: {
      WGHeventPointTimer: null,
    },
    allVariable: {
      DJYLrandomLineArr: null
    }
  },
  mutations: {
    //新配服务
    addStateServer(state, server) {
      state.stateServer.push(server)
    },
    //旧服务
    addOldServer(state, server) {
      state.oldServer.push(server)
    },
    //定时器
    addTimer(state, server) {
      state.allTimer[server.timer] = server.value;
    },
    //变量
    addVariable(state, server) {
      state.allVariable[server.variable] = server.value;
    },
    //清除所有
    clearAllServerAndTimerAndVariable(state) {
      if (state.stateServer.length != 0) {
        state.stateServer.forEach((v, i) => {
          try {
            Interpreter.init(v, 'close');
          } catch (error) {

          }
        });
        state.stateServer = [];
      }
      if (state.oldServer.length != 0) {
        try {
          rs._serviceCall({
            service_id: 'advanced_service.bat_service',
            service_string: state.oldServer
          });
        } catch (error) {

        }

        state.oldServer = []
      }

      if (Object.keys(state.allTimer).length != 0) {
        for (let key in state.allTimer) {
          if (key != null) {
            clearInterval(state.allTimer[key]);
            state.allTimer[key] = null
          }
        }
      }
      if (Object.keys(state.allVariable).length != 0) {
        for (let key in state.allVariable) {
          if (key != null) {
            state.allVariable[key] = null
          }
        }
      }

    },


  },
  actions: {

  },
  modules: {}
})
