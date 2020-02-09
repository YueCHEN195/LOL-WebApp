import Vue from 'vue'
import App from './App.vue'
import './style.scss'
import router from './router/router.js'
import { Swipe, SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/iconfont/iconfont.css'
import CardHeader from './components/CardHeader.vue'
import Card from './components/Card.vue'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component('card-header',CardHeader)
Vue.component('Card',Card)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
