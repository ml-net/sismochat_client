import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/', name: 'splash', component: () => import('../views/SplashView.vue') },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
  { path: '/reset-password', name: 'reset-password', component: () => import('../views/ResetPasswordView.vue') },
  { path: '/change-password', name: 'change-password', component: () => import('../views/ChangePasswordView.vue') },
  { path: '/dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue') },
  { path: '/chat/:contactId?', name: 'chat', component: () => import('../views/ChatView.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
