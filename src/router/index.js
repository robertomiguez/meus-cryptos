import Vue from 'vue'
import VueRouter from 'vue-router'
import MyCoins from '../views/MyCoins.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/howto',
    name: 'HowTo',
    component: () => import('../views/HowTo.vue')
  },
  {
    path: '/',
    name: 'MyCoins',
    component: MyCoins
  },
  {
    path: '/allcoins',
    name: 'AllCoins',
    component: () => import('../views/AllCoins.vue')
  },
  {
    path: '/supportedcryptos',
    name: 'SupportedCryptos',
    component: () => import('../views/SupportedCryptos.vue')
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
