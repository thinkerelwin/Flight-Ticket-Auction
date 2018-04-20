import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

// import login from '@/components/login'
import showList from '@/components/showList'

// those three below will be loaded lazily,
// on the contrary, these three above will be loaded simutaneously when enter this website

const login = () => import('@/components/login')
// const showList = () => import("@/components/showList");
const showUser = () => import('@/components/showUser')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
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
      path: '/showUser',
      name: 'showUser',
      component: showUser,
      beforeEnter (to, from, next) {
        if (store.state.idToken) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '*',
      redirect: '/'
    }

  ]
})
