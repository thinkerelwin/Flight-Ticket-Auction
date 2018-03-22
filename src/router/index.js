import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import showList from '@/components/showList'
import addPNR from '@/components/addPNR'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'showList',
      component: showList
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }

  ]
})
