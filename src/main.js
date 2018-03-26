// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

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

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://kusakawa.ddns.net:8080/farener/public/api/webuy'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
