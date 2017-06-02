// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.filter('shorten', (value) => {
  return value.toLowerCase().replace(/\s+/g, '')
})

Vue.filter('phoneAsLink', (value) => {
  return value.toLowerCase().replace(/\s+/g, '').replace('(', '').replace(')', '')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
