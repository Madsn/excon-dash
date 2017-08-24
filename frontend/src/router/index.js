import Vue from 'vue'
import Router from 'vue-router'
import Excon from '@/components/Excon'

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
      path: '/',
      name: 'Limited',
      component: Excon,
      props: {limitedView: true}
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Excon,
      props: {admin: true}
    }
  ]
})
