/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */

import axios from 'axios'

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 10,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
})

// add global params
// instance.defaults.params = {}
// instance.defaults.params['clienttype'] = 'WEB'

// 请求拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  // 请求失败
  error => {
    const { response } = error
    return Promise.reject(response)
    // if (response) {
    //   return Promise.reject(response);
    // } else {
    //   // 处理断网的情况
    //   // eg:请求超时或断网时，更新state的network状态
    //   // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    //   // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    //   // store.commit('changeNetwork', false);
    // }
  }
)

export default instance
