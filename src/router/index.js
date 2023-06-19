import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'singup',
    component: () => import('../views/TheSignUp.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/TheUsers.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
