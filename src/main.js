import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueClipBoard from 'vue-clipboard2'

Vue.use(VueClipBoard)
//use：将第三方模块 注入到Vue实例对象中的方法
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// 设置axios拦截器
axios.interceptors.request.use(request => {
  // 从localStorage中获取token
  const token = localStorage.getItem('authToken');
  console.log(token);
  if (token) {
    // 在请求头中添加Authorization字段
    // request.headers.Authorization = `${token}`;
    request.headers.Authorization = token;
  }
  console.log('Request URL:', request.url);
  console.log(request.headers.Authorization);
  return request;
}, error => {
  return Promise.reject(error);
});

new Vue({
  render: h => h(App)
}).$mount('#app')
