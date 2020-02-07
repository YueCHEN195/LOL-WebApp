import axios from 'axios'
import Vue from 'vue'
import router from './router/router.js'
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(req => {
  if(localStorage.token){
    req.headers.Authorization = localStorage.token
  }
  return req
}, err => {
  Vue.prototype.$message({
    duration:5000,
    type:'error',
    message: '请求超时',
  })
  return Promise.reject(err)
})

http.interceptors.response.use(res => {
  return res
},err => {
  if(err.response.status == 401){
    Vue.prototype.$message({
      duration:5000,
      type:'error',
      message: '请登录',
    })
    router.push('/login')
  }
  else if(err.response.data.message){
    Vue.prototype.$message({
      duration:5000,
      type:'error',
      message: err.response.data.message,
    })
  }
  return new Promise( () => {} )
})

export default http