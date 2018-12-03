// 路由配置文件
import Vue from 'vue'
import Router from 'vue-router'
// @相当于 ./src
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Rights from '@/components/rights/rights.vue'
import Role from '@/components/role/role.vue'
import Goods from '@/components/goods/goods.vue'
import GoodsAdd from '@/components/goods/goodsAdd.vue'
import {
  Message
} from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  }, {
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: Users
    }, {
      name: 'rights',
      path: '/rights',
      component: Rights
    }, {
      name: 'roles',
      path: '/roles',
      component: Role
    }, {
      name: 'goods',
      path: '/goods',
      component: Goods
    }, {
      name: 'goodsAdd',
      path: '/goodsAdd',
      component: GoodsAdd
    }]
  }]
})
export default router
// 路由守卫
// export default router
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  // to是一个对象  要去的那个配置对象
  // from 是从哪里去(当前路由配置对象)
  if (to.path === '/login') {
    next() // 接着往下执行
  } else {
    // 获取token
    const token = localStorage.getItem('token')
    // 在home组件实例创建之前,检测有没有token,如果没有跳转到login
    if (!token) {
      // el中的全局Message
      Message.warning('请先登录!')
      router.push({
        name: 'login'
      })
      return
    }
    next()
  }
})
