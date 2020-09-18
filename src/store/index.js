import Vuex from 'vuex'
import Vue from 'vue'
import rates from './modules/rates'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    rates
  }
})
