// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import VueNativeSock from 'vue-native-websocket'
import moment from 'moment'
import store from './store'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(VueNativeSock, 'ws://localhost:8888/api/v1/ws', {store: store})
Vue.prototype.moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
