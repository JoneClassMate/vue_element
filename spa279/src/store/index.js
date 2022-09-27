import Vuex from 'vuex'
import Vue from 'vue'
import state from './state.js'
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'
import VuexPersistence from "vuex-persist"

Vue.use(Vuex)

const vueLocal=new VuexPersistence({
  // storage 存储方式  默认的是localStorage存储，可以修改成会话存储（window.sessionStorage）
  storage:window.sessionStorage
})
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins:[vueLocal.plugin]

  })

export default store
