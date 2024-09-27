import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './authGuard'

const HomeView = () => import('@/views/HomeView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const SignUpView = () => import('@/views/SignUpView.vue')
const DashboardView = () => import('@/views/DashboardView.vue')
const ProductDetailView = () => import('@/views/products/ProductDetailView.vue')

const CategoryListView = () => import('@/views/admin/category/ListView.vue')

export const router = createRouter({
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
      children: [{ path: 'category', name: 'Category', component: CategoryListView }]
    }
  ]
})

router.beforeEach(authGuard)

export default router
