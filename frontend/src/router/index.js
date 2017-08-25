import Vue from 'vue'
import Router from 'vue-router'
import Excon from '@/components/Excon'
import Login from '@/components/Login'
import auth from '../store/modules/auth'

Vue.use(Router)

const login = {
  path: '/login',
  name: 'Login',
  component: Login
}

const router = new Router({
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
      props: {admin: true},
      beforeEnter: (to, from, next) => {
        const authenticated = auth.state.isAuthenticated
        if (authenticated) {
          next()
        } else {
          next(login)
        }
      }
    },
    login
  ]
})

export default router
