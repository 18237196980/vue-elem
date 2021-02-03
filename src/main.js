import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/css/font/iconfont.css'

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:9876'
axios.interceptors.request.use(config => {
  config.headers.token = window.localStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
