import Vue from 'vue'
import Vuex from 'vuex'
import vcta from './modules/state'
import createLogger from './logger'
import * as types from './mutation-types'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    vcta
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

import { WebSocketBridge } from 'django-channels'

const webSocketBridge = new WebSocketBridge()
webSocketBridge.connect('ws://localhost:8888/api/v1/ws/')
console.log(webSocketBridge)
/*
webSocketBridge.socket.addEventListener('open', function () {
  webSocketBridge.stream('getState').send({prop1: 'value1', prop2: 'value1'})
})
*/
webSocketBridge.socket.addEventListener('message', function (msg) {
  store.dispatch(types.SOCKET_ONMESSAGE, this.state, msg)
})
webSocketBridge.socket.addEventListener('open', function (msg) {
  store.dispatch(types.SOCKET_ONOPEN, this.state, msg)
})
webSocketBridge.socket.addEventListener('close', function (msg) {
  store.dispatch(types.SOCKET_ONCLOSE, this.state, msg)
})
webSocketBridge.socket.addEventListener('error', function (msg) {
  store.dispatch(types.SOCKET_ONERROR, this.state, msg)
})

export default store
