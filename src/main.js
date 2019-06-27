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
