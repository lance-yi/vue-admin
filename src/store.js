import Vue from 'vue'
import Vuex from 'vuex'
import Api from './api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState: false || Boolean(localStorage.getItem("token")), // 登录装填
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {}, // 用户基本信息
  },
  mutations: {
    // 登录状态
    userSignin(state, obj) {
      localStorage.setItem("userInfo", JSON.stringify(obj))
      state.loginState = true
      Object.assign(state.userInfo, obj)
    },
    // 退出登录
    userSignout(state){
      // Object.keys(state).forEach(k => Vue.delete(state, k)); // 删除所有信息
      localStorage.removeItem("token")
      state.loginState = false
      router.replace('/')
    },
  },
  actions: {
    userSignin({ commit },obj){
      return new Promise((resolve, rejects)=>{
        Api.post('/getuserinfo',{
          token: obj.token
        },res=>{
          commit("userSignin",res.data)
          resolve(res.data)
        },err=>{
          rejects(res.data)
        });
      })
    },
  }
})
