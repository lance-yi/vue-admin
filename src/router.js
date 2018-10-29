import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login.vue'
import personmanage from '@/views/personmanage.vue'
import safemanage from '@/views/safemanage.vue'
import operation from '@/views/operation.vue'
import personmanagedetail from '@/subpage/personmanagedetail.vue'
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
      name: 'personmanagedetail',
      component: personmanagedetail
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
