import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login.vue'
import personmanage from '@/views/personmanage.vue'
import safemanage from '@/views/safemanage.vue'
import operation from '@/views/operation.vue'
import personmanagedetail from '@/subpage/personmanagedetail.vue'
import book from '@/subpage/book.vue'
import role from '@/subpage/role.vue'
import menu from '@/subpage/menu.vue'
import log from '@/views/log.vue'
import update from '@/views/update.vue'
import pmic from '@/views/pmic.vue'
import system from '@/views/system.vue'
import iView from 'iview'

Vue.use(iView)
Vue.use(Router)

const router = new Router({
  // mode: 'history', // 后端支持可开
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ '@/views/login.vue'),
    },
    {
      path: '/personmanage',
      name: 'personmanage',
      component: personmanage
    },{
      path: '/operation',
      name: 'operation',
      component: operation
    },
    {
      path: '/safemanage',
      name: 'safemanage',
      component: safemanage
    },
    {
      path: '/personmanagedetail',
      name: 'personmanage',
      component: personmanagedetail
    },
    {
      path: '/log',
      name: 'log',
      component: log
    },
    {
      path: '/pmic',
      name: 'pmic',
      component: pmic

    },
    {
      path: '/update',
      name: 'update',
      component: update
    },
    {
      path: '/system',
      name: 'system',
      component: system,
      children: [  //这里就是二级路由的配置
        {
          path: '/system/book',
          name: 'system',
          component: book
        },
        {
          path: '/system/role',
          name: 'system',
          component: role
        },
        {
          path: '/system/menu',
          name: 'system',
          component: menu
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})

export default router
