import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
const Strategy = () => import('../views/Strategy.vue')
const Game = () => import('../views/Game.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {path: '/', name:'home', component: Home},
      {path: '/strategy', name: 'strategy',component: Strategy},
      {path: '/game',name: 'game',component: Game}
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
