import Vue from 'vue'
import App from './App.vue'
import './style.scss'
import router from './router/router.js'
import { Swipe, SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/iconfont/iconfont.css'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
