// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'//axios http请求库
import Mock from './mock'//手动添加的mock.js文件

import {Button,Col,Row,Swipe,SwipeItem,List,Field,NavBar} from 'vant'
Vue.use(Button).use(Col).use(Row).use(Swipe).use(SwipeItem).use(List).use(Field).use(NavBar)

// Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://mockjs.com/api' //设置默认请求的url

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
