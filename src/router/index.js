import Vue from 'vue'
import Router from 'vue-router'
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
      path: '/new',
      name: 'addPNR',
      component: addPNR
    }

  ]
})
