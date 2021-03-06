import Vue from 'vue'
import Vuex from 'vuex'
import vcta from './modules/state'
import auth from './modules/auth'
import createLogger from './logger'
import * as types from './mutation-types'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    vcta,
    auth
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

import { WebSocketBridge } from 'django-channels'

const webSocketBridge = new WebSocketBridge()
webSocketBridge.connect('ws://localhost:8888/api/v1/ws/')
webSocketBridge.socket.addEventListener('message', function (msg) {
  store.commit(types.SOCKET_ONMESSAGE, msg)
})
webSocketBridge.socket.addEventListener('open', function (msg) {
  store.commit(types.SOCKET_ONOPEN, msg)
})
webSocketBridge.socket.addEventListener('close', function (msg) {
  store.commit(types.SOCKET_ONCLOSE, msg)
})
webSocketBridge.socket.addEventListener('error', function (msg) {
  store.commit(types.SOCKET_ONERROR, msg)
})

setInterval(function () {
  // this.now = this.moment()
  store.commit(types.UPDATE_CLOCKS)
}, 1000)

store.commit(types.SET_SOCKET, webSocketBridge)

export default store
