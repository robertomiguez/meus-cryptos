import Vue from 'vue'
import VueRouter from 'vue-router'
import HowTo from '../views/HowTo.vue'
import MyCoins from '../views/MyCoins.vue'
import AllCoins from '../views/AllCoins.vue'
import SupportedCryptos from '../views/SupportedCryptos'

Vue.use(VueRouter)

const routes = [
  {
    path: '/howto',
    name: 'HowTo',
    component: HowTo
  },
  {
    path: '/',
    name: 'MyCoins',
    component: MyCoins
  },
  {
    path: '/allcoins',
    name: 'AllCoins',
    component: AllCoins
  },
  {
    path: '/supportedcryptos',
    name: 'SupportedCryptos',
    component: SupportedCryptos
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
