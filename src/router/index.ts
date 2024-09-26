import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProductDetailView from '@/views/products/ProductDetailView.vue'

import CategoryViewList from '@/views/admin/category/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/:slug',
      name: 'ProductDetail',
      component: ProductDetailView
    },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/signup', name: 'signup', component: SignUpView },

    {
      path: '/admin',
      name: 'Admin',
      meta: { requiresAuth: true },
      children: [{ path: 'category', name: 'Category', component: CategoryViewList }]
    }
  ]
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('accessToken') // Check token presence

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login') // Redirect to login if not authenticated
    } else {
      next() // Allow access if authenticated
    }
  } else {
    next() // Always allow access to non-protected routes
  }
})

export default router
