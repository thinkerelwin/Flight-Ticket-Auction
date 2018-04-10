import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

// import login from '@/components/login'
// import signup from '@/components/signup'
import showList from '@/components/showList'

// those three below will be loaded lazily,
// on the contrary, these three above will be loaded simutaneously when enter this website

const login = () => import("@/components/login");
const signup = () => import("@/components/signup");
// const showList = () => import("@/components/showList");

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'showList',
      component: showList,
      beforeEnter (to, from, next) {
        if (store.state.idToken) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '*',
      redirect: '/'
    }

  ]
})
