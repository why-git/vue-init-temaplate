import axios from 'axios'

// config axios global settings
axios.defaults.timeout = 20000

// add an intercepter for baas response format
axios.interceptors.response.use(response => {
  if (!response.data || typeof response.data.error_code === 'undefined') {
    throw new Error('服务器连接失败')
  } else if (response.data.error_code > 0) {
    throw new Error(`接口返回错误：${response.data.error_msg || '未提供错误细节'}`)
  } else {
    return response.data.result
  }
}, error => {
  if (error.message && ~error.message.indexOf('timeout')) {
    return Promise.reject(new Error('请求超时，请检查网络'))
  } else {
    return Promise.reject(error)
  }
})

export default class Api {
  constructor (serverURI) {
    this.server = serverURI
  }

  async get (uri, params) {
    return axios.get(this.server + uri, this.purgeParam(params))
  }

  async post (uri, params) {
    return axios.post(this.server + uri, this.purgeParam(params))
  }

  purgeParam (args) {
    // snippet edit from https://stackoverflow.com/a/46451724/1234151
    return args instanceof Object ? Object.entries(args).reduce((o, [k, v]) => {
      if (typeof v === 'boolean' || typeof v === 'number' || typeof v === 'string' || v) o[k] = this.purgeParam(v)
      return o
    }, args instanceof Array ? [] : {}) : args
  }

  // 总部 > 帐号配置 > Start
  headOfficeList () {
    return this.post('/a/head_office/list.json')
  }
}
