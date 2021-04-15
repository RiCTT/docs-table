import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../page/Home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/exhibition',
    component: Home
  },
  {
    path: '/exhibition',
    name: 'Exhibition',
    component: () => import('@/page/Exhibition/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../page/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
