import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
import showList from '@/components/showList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'showList',
      component: showList,
      // beforeEnter (to, from, next) {
      //   // console.log(authdata)
      //   // if(authdata.userdata) {
      //   //   next()
      //   // } else {
      //   //   next('/login')
      //   // }
      // }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }

  ]
})
