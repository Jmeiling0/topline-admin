import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'

Vue.use(Router)

const router = new Router({
  routes: [
  //   {
  //   name: 'home',
  //   path: '/',
  //   component: () => import('@/views/home')
  // },
    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [ // 所有的children 路由都显示到父路由的router-view中
        {
          name: 'home',
          path: '', // 他就是Layout的默认子路由
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        },
        {
          name: 'article-list',
          path: '/article',
          component: () => import('@/views/article')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})

/****
 * 所有的路由都要经过这里
 * to 去哪儿
 * from 来自哪里
 * next 允许通过的方法
 *
 */

router.beforeEach((to, from, next) => {
  nprogress.start()
  const userInfo = window.localStorage.getItem('user_info')
  // 如果是非 /login页面,判断其登陆的状态
  if (to.path !== '/login') {
    // 如果没有登陆,让其跳转到登陆页
    if (!userInfo) {
      return next({ name: 'login' })
    } else {
      // 如果登陆了,则允许通过
      next()
    }
  } else {
    // 如果的登陆了,就不允许访问登陆页面了
    if (userInfo) {
      next(false)
    } else {
    // 没有登录,才允许访问登陆页面
      next()
    }
  }
})
// 路由导航完成的时候会进入到这里
router.afterEach((to, from) => {
  nprogress.done()
})

// 导出
export default router
