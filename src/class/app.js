import _ from 'lodash'
import Api from './api'
import Util from './util'
import store from '@/store'

export default class App {
  constructor (args) {
    this.api = new Api(args.serverURI)
    this.util = Util
  }

  handleError (error) {
    console.error(error)
    window.mdui.alert(error.message || error || '未知错误', undefined, undefined, {
      confirmText: '好'
    })
  }

  handleSuccess (message) {
    window.mdui.alert(message || '操作已成功', '成功', undefined, {
      confirmText: '好'
    })
  }

  orderBy (array, field = ['created_at'], order = ['desc']) {
    return _.orderBy(array, field, order)
  }

  isNotEmptyArray (arr) {
    return Array.isArray(arr) && arr.length > 0
  }

  // 总部 > 帐号配置 > Start
  async fetchShops () {
    try {
      const res = await this.api.headOfficeList()
      store.dispatch('shops/setShops', this.orderBy(res.list, 'shop_created_at'))
    } catch (err) {
      this.handleError(err)
      return false
    }
  }
}
