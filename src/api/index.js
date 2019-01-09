import axios from 'axios'
import router from '@/router.js'
import {  Message } from 'iview';

// 配置API接口地址
var root = window.g.ApiUrl
console.log(window.g.ApiUrl)
// var root = 'http://192.168.8.185:8888/api'
// 引用axios
axios.defaults.withCredentials = true
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) { delete o[key] }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    headers: { 'Authorization': localStorage.token },
    url: url,
    data: method === 'POST' || method === 'PUT' || method === 'DELETE' ? params : null,
    dataType: 'json',
    params: method === 'GET'  ? params : null,
    baseURL: root,
    withCredentials: false
  }).then(function (res) {
    if (res.data.rel === true || res.data != '') {
      if (success) {
        success(res.data)
      }
    }else {
      if (failure) {
        failure(res.data)
      } else {
        throw new Error(res)
      }
    }
  }).catch(function (err) {
    // router.replace('/');
    if(err.response.status == 401){
      Message.info('登录信息过期，请重新登录');
      router.replace('/');

      // axios({
      //   method: 'post',
      //   url: 'auth/jwt/invalid',
      //   baseURL: window.g.ApiUrl,
      //   dataType: 'json',
      //   Authorization:localStorage.getItem('token'),
      //   data:{"token":localStorage.getItem('token')}
      // }).then(res=>{
        
      // })
      
    }else {
      throw new Error(err)
    }
  })
}

// 返回在vue模板中的调用接口
export default {
  root,
  // wwwroot,
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}
