import Vue from 'vue'
import App from './App.vue'
import router from './router';

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueClipBoard from 'vue-clipboard2'

Vue.use(VueClipBoard)
//use：将第三方模块 注入到Vue实例对象中的方法
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// 设置axios拦截器
axios.interceptors.request.use(
  config => {
    // 从localStorage中获取token
    const token = localStorage.getItem('authToken');
    console.log("token:");
    console.log(token);
    if (token) {
      // 在请求头中添加Authorization字段，通常包含Bearer前缀
      config.headers.Authorization = `${token}`;
    }
    return config;
  }, 
  error => {
    // 在请求错误时进行处理
    return Promise.reject(error);
  }
);

const originalFetch = window.fetch;

window.fetch = new Proxy(originalFetch, {
  apply: (target, thisArg, argumentsList) => {
    const [url, options = {}] = argumentsList;

    // 从 localStorage 中获取 token
    const token = localStorage.getItem('authToken');
    console.log("token:");
    console.log(token);

    // 设置默认的请求头
    const defaultHeaders = {
      'Content-Type': 'application/json',
      // 如果存在 token，将其添加到 Authorization 头
      ...(token && { Authorization: `${token}` })
    };

    // 合并用户提供的 headers 和默认的 headers
    options.headers = {
      ...defaultHeaders,
      ...options.headers
    };

    // 调用原始的 fetch 函数
    return target.apply(thisArg, [url, options]);
  }
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
