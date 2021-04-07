import axios from 'axios'

export function request(config) {
  return new Promise((resolve,reject) => {
    // 1 创建axios的实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/m5',
      timeout: 5000
    })

    // 2. axios的拦截器
    // 2.1 请求拦截
    instance.interceptors.request.use(config => {
      // console.log(config);
      // 1. 比如config 中的一些信息不符合服务器要求
      // 2. 比如每次发送网络请求时，希望在界面中显示一个请求的图标
      // 3. 某些网络请求（比如登录tooken），必须携带一些特殊的信息
      return config;
    },err => {
      config.log(err);
    })
    // 2.2 响应拦截
    instance.interceptors.response.use(res => {
      // console.log(res);
      return res.data;
    },err => {
      console.log(err);
    })

    // 3.发送真正的网络请求
    instance(config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}