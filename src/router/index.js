import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/components/Index.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
];

const router = new VueRouter({
  mode: 'history', // 使用 HTML5 History 模式
  routes
});

export default router;

