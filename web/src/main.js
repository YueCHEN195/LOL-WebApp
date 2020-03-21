import Vue from 'vue'
import App from './App.vue'
import './style.scss'
import router from './router/index.js'
import './assets/iconfont/iconfont.css'
import CardHeader from './components/CardHeader.vue'
import Card from './components/Card.vue'
import axios from 'axios'


import { Tab, Tabs ,Swipe, SwipeItem,Icon} from 'vant'
Vue.component('card-header',CardHeader)
Vue.component('Card',Card)

Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Icon)

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
