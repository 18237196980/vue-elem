import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import {
  showLoading,
  hideLoading
} from './plugins/loading.js'
import './assets/css/global.css'
import './assets/css/font/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'
import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:9876'
// 请求预处理
axios.interceptors.request.use(config => {
  showLoading()
  config.headers.token = window.localStorage.getItem('token')
  config.headers.uid = window.localStorage.getItem('id')
  return config
})
// 响应预处理
axios.interceptors.response.use(response => {
  setTimeout(() => {
    hideLoading();
  }, 100)
  return response
}, (err) => {
  // 发生异常10s后取消loading，避免遮罩一直存在
  setTimeout(() => {
    hideLoading();
  }, 10000)
  return response
});


Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
