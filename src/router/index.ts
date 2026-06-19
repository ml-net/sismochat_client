import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', name: 'splash', component: () => import('../views/SplashView.vue') },
  { path: '/login', name: 'login', component: LoginView, meta: { guest: true } },
  { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue'), meta: { guest: true } },
  { path: '/reset-password', name: 'reset-password', component: () => import('../views/ResetPasswordView.vue'), meta: { guest: true } },
  { path: '/change-password', name: 'change-password', component: () => import('../views/ChangePasswordView.vue'), meta: { auth: true } },
  {
    path: '/dashboard',
    component: () => import('../layouts/DashboardLayout.vue'),
    meta: { auth: true },
    children: [
      { path: '', name: 'dashboard-home', component: () => import('../views/dashboard/DashboardHomeView.vue') },
      { path: 'children', name: 'dashboard-children', component: () => import('../views/dashboard/DashboardChildrenView.vue') },
      { path: 'connections', name: 'dashboard-connections', component: () => import('../views/dashboard/DashboardConnectionsView.vue') },
      { path: 'settings', name: 'dashboard-settings', component: () => import('../views/dashboard/DashboardSettingsView.vue') },
    ],
  },
  {
    path: '/chat',
    component: () => import('../layouts/ChatLayout.vue'),
    meta: { auth: true },
    children: [
      { path: '', name: 'chat-contacts', component: () => import('../views/chat/ContactListView.vue') },
      { path: ':contactId', name: 'chat-conversation', component: () => import('../views/chat/ConversationView.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const profile = localStorage.getItem('sismochat_profile')
  const parsed = profile ? (JSON.parse(profile) as { role?: string }) : null
  const isChild = parsed?.role === 'child'
  if (to.meta.auth && !authStore.isAuthenticated && !isChild) {
    return { name: 'login' }
  }
  if (to.meta.guest && authStore.isAuthenticated) {
    return { name: 'dashboard-home' }
  }
})

export default router
