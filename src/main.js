// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import './assets/css/index.css'
import MyHttpServer from './plugins/http'
import moment from 'moment'
import myBrand from '@/components/custom/myBrand.vue'
Vue.config.productionTip = false

// 使用Vue插件
Vue.use(ElementUI)
Vue.use(MyHttpServer)
// 注册全局面包屑组件
Vue.component(myBrand.name, myBrand)
// 全局过滤器  -处理日期格式
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'

})
