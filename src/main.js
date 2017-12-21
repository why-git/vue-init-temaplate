import Vue from 'vue'
import AppView from './App'
import router from './router'
import store from './store'
import App from './class/app'

import 'font-awesome/css/font-awesome.min.css'
import uuid from 'uuid'
import _ from 'lodash'
import moment from 'moment'

import config from 'configPath'

// setup config object
Vue.prototype.$config = config

Vue.config.productionTip = false

// instanciate the app controller
Vue.prototype.$app = new App(config)

// instanciate an event bus
Vue.prototype.$bus = new Vue()

// hook handful libraries to Vue
Vue.prototype.$_ = _
moment.locale('zh-cn')
Vue.prototype.$moment = moment

Vue.prototype.$uuid = uuid
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<AppView/>',
  components: { AppView }
})
