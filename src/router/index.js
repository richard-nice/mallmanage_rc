// 路由配置文件
import Vue from 'vue'
import Router from 'vue-router'
// @相当于 ./src
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  }, {
    name: 'home',
    path: '/',
    component: Home
  }]
})
