import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router/router.js'
import http from './http'

Vue.config.productionTip = false

Vue.prototype.$http = http    // 就可以 this.$http 来访问这个叫http的axios实例了


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
