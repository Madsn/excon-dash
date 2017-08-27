// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import store from './store'
import VueI18n from 'vue-i18n'
import messages from './messages'

Vue.use(VueI18n)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.prototype.moment = moment

const i18n = new VueI18n({
  locale: 'ar',
  messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App}
})
