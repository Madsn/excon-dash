import Vue from 'vue'
import Vuex from 'vuex'
import vcta from './modules/state'
import createLogger from './logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    vcta
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})