import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import './my-theme/index.less'
import './assets/css/index.css'
// import locale from 'iview/dist/locale/en-US'
// 引用axios
import api from './api'
Vue.prototype.$http = api

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

import echart from 'echarts-liquidfill'
Vue.prototype.$echart = echart


Vue.use(iView, {
  // locale,
  transfer: true, // 浮层组件是否在body内
  size: 'default' // 组件size尺寸
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
