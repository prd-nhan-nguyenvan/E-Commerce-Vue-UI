import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './authGuard'

const HomeView = () => import('@/views/HomeView.vue')
const LoginView = () => import('@/views/auth/LoginView.vue')
const SignUpView = () => import('@/views/auth/SignUpView.vue')
const ProfileView = () => import('@/views/auth/ProfileView.vue')
const DashboardView = () => import('@/views/DashboardView.vue')
const ProductDetailView = () => import('@/views/products/ProductDetailView.vue')

const CategoryListView = () => import('@/views/admin/category/ListView.vue')
const ProductListView = () => import('@/views/admin/product/ListView.vue')
const ProductFormView = () => import('@/views/admin/product/DetailView.vue')
const ChangePasswordView = () => import('@/views/auth/ChangePasswordView.vue')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products/:slug',
      name: 'productDetail', // changed to camelCase
      component: ProductDetailView
    },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/signup', name: 'signup', component: SignUpView },
    {
      path: '/user/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/password/change',
      name: 'changePassword',
      component: ChangePasswordView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      meta: { requiresAuth: true },
      children: [
        {
          name: 'admin',
          path: '',
          component: DashboardView,
          meta: { requiresAuth: true }
        },
        {
          path: 'categories',
          name: 'categories', // changed to camelCase
          component: CategoryListView,
          meta: { requiresAuth: true }
        },
        {
          path: 'products',
          name: 'productList', // changed to camelCase
          component: ProductListView,
          meta: { requiresAuth: true }
        },
        {
          path: 'products/new',
          name: 'addProduct', // changed to camelCase
          component: ProductFormView,
          meta: { requiresAuth: true }
        },
        {
          path: 'products/edit/:id',
          name: 'editProduct', // changed to camelCase
          component: ProductFormView,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach(authGuard)

export default router
