import Vue from 'vue'
import Vuex from 'vuex'
import Api from './api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    noSide: false,
    loginState: false || Boolean(localStorage.getItem("token")), // 登录装填
    userInfo: JSON.parse( localStorage.getItem("userInfo") ) || {}  // 用户基本信息
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
    changeSide(state,bl) {
      state.noSide = bl;
    }
  },
  actions: {
    userSignin1({ commit }){
      return new Promise((resolve, rejects)=>{
        Api.post("/oauth/userfront/currentUser",null,res=>{
          commit("userSignin",res.data)
          resolve(res.data)
        },err=>{
          rejects(err.data);
        });
      })
    },
  }
})
