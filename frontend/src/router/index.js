import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Excon from '@/components/Excon'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/excon',
      name: 'Excon',
      component: Excon,
      props: {limitedView: false}
    },
    {
      path: '/limited',
      name: 'limited',
      component: Excon,
      props: {limitedView: true}
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
