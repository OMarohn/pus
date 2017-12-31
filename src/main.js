// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTimeago from 'vue-timeago'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)

Vue.filter('shorten', (value) => {
  return value.toLowerCase().replace(/\s+/g, '')
})

Vue.filter('normalize', (value) => {
  return (value !== undefined) ? value : 'k. A.'
})

Vue.filter('phoneAsLink', (value) => {
  return value.toLowerCase().replace(/\s+/g, '').replace('(', '').replace(')', '')
})

Vue.filter('tmj2mdy', (value) => {
  if (value) {
    var parts = value.split('.')
    if (parts.length === 3) {
      value = parts[1] + '/' + parts[0] + '/' + parts[2]
    }
  }
  return value
})

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'de-DE',
  locales: {
    // you will need json-loader in webpack 1
    'de-DE': require('vue-timeago/locales/de-DE.json')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
