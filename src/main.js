import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store";
import axios from 'axios'
// 将axios挂在到原型上属性上，当我们需要axios，直接访问this.axios即可，无需再另外引入
Vue.prototype.axios = axios;
Vue.config.productionTip = false
// 注册成全局组件
import Scroller from '@/components/Scroller'
Vue.component('Scroller', Scroller)

import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

// Vue.filter('过滤器名字',回调函数)
// 全局过滤器  url代表接收到的url地址，arg指定的参数
Vue.filter('SetWH',(url,arg)=>{
  
  return url.replace(/w\.h/,arg)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
