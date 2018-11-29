// 开发vue的插件
import axios from 'axios'

const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
  // 统一配置基准地址
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 一次性设置headers头部, 用来在发送请求前, 获取token
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // config对象有url标识参数  获取url自动截取baseurl后面的path
    if (config.url !== 'login') {
      // config对象有headers参数和url标识参数  给headers增加一个值
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers.common['Authorization'] = AUTH_TOKEN
      console.log(config)
      console.log(config.url)
      return config
    }
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  })
  // 添加实例方法
  Vue.prototype.$http = axios
}
export default MyHttpServer
