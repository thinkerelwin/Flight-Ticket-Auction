// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import store from './store'

// Vue.config.productionTip = false

// Vue.component('date-picker', {
//   template: '<input/>',
//   props: [ 'format' ],
//   mounted: function() {
//     var self = this;
//     $(this.$el).datepicker({
//       format: 'yyyy/mm/dd',
//       todayHighlight: 'true',
//       autoclose: true,
//     })
//     .on('changeDate', function(date) {
//       // self.$emit('update-date', date);
//     });
//   },
//   // beforeDestroy: function() { ... }
// });

axios.defaults.baseURL = "http://209.135.157.161/farener/public/";
// axios.defaults.baseURL = 'http://kusakawa.ddns.net:8080/farener/public/'

axios.defaults.headers.get['Accepts'] = 'application/json'

const reqInterceptor = axios.interceptors.request.use(config => {
  // console.log('Request Interceptor', config)
  return config
})
const resInterceptor = axios.interceptors.response.use(res => {
  // console.log('Response Interceptor', res)
  return res
})

axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
