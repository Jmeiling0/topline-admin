import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
