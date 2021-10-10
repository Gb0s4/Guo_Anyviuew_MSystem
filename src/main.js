import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 全局引入moment插件
import moment from 'moment'

// 使用moment插件
Vue.prototype.$moment = moment;
// 关闭生产提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
