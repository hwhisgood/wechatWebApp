import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import navbarConfig from './navbar.config'
import pageConfig from './page.config'

import MainLayout from '@/layout/main.vue'
import PageLayout from '@/layout/page.vue'



const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // component: MainLayout,
      redirect: PageLayout[0] || '/adPage',
    }, 
    {
      path: '/home',
      component: MainLayout,
      redirect: navbarConfig[0] || '/home',
      children: navbarConfig
    }, 
    {
      path: '/home',
      component: PageLayout,
      children: pageConfig,
    }, 
    {
      name: 'login',
      path: '/login',
      component: () => import("@/views/Login.vue"),
      // beforeEnter: (to, from) => {
        
      //   // reject the navigation
      //   return false
      // },
    }]
})

export default router
