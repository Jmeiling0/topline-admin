import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'nprogress/nprogress.css'
import axios from 'axios'
// 优先查找文件,如果文件找不到,则找目录,找到目录优先加载目录中的index.js
import router from './router'

/**
 *  配置 axios 的基础路由
 * 也就是说配置了 这个东西,你就不用每次都写长长的 http://XXXXX
 * 只需要, 例如axios({url: 'authorizations'})
 * 路径中的 / ,多退少补
 */
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

/**
 * axios请求拦截器
 * 所以使用axios发起的请求都要先经过这里
 * config 是本次请求相关的  配置对象
 * return config 就是允许通过的方式
 *
 */

// Add a request interceptor
axios.interceptors.request.use(config => {
  const userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  // 如果登录了,才给那些需要的token 的接口统一添加token令牌
  // 登录相关接口不需要添加 token令牌 想要也没有
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  // Do something before request is sent
  // return config允许通过的方式
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

/**
 * axios 响应拦截器
 * 统一处理响应的数据格式
 */
// Add a response interceptor
axios.interceptors.response.use(response => { // >=200 && <400的状态码进入这里
  console.log('response => ', response)
  return response.data.data
}, error => { // >=400 的状态码会进入这里
  console.dir(error)
  const status = error.response.status

  if (status === 401) {
    // 务必删除本地存储中的用户信息数据
    window.localStorage.removeItem('user_info')
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})

Vue.use(ElementUI)
Vue.config.productionTip = false

/**
 *  几乎每个组件都要使用 axios 去发请求,频繁的import 就会变得非常麻烦
 *  我们可以将一些频繁使用的成员放到 Vue.proytotype中,然后就可以在组件中直接使用this.XXXX使用了
 *  为什么?因为所有组件都是vue实例
 * 所以往 Vue.prototype中添加的成员可以直接通过实例this进行访问
 *  Vue.prototype.foo = 'bar'
 */

//  往vue原型中添加成员, 尽量使用 $名字 起名字,目的是为了防止和组件中的成员冲突
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
