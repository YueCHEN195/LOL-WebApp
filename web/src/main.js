import Vue from 'vue'
import App from './App.vue'
import './style.scss'
import router from './router/router.js'
import { Swipe, SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/iconfont/iconfont.css'
import CardHeader from './components/CardHeader.vue'
import Card from './components/Card.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import axios from 'axios'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component('card-header',CardHeader)
Vue.component('Card',Card)
Vue.use(VueAwesomeSwiper)

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
