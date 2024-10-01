import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './authGuard'

const HomeView = () => import('@/views/HomeView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const SignUpView = () => import('@/views/SignUpView.vue')
const DashboardView = () => import('@/views/DashboardView.vue')
const ProductDetailView = () => import('@/views/products/ProductDetailView.vue')

const CategoryListView = () => import('@/views/admin/category/ListView.vue')
const ProductListView = () => import('@/views/admin/product/ListView.vue')
const ProductFormView = () => import('@/views/admin/product/DetailView.vue')

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
      children: [
        {
          path: 'categories',
          name: 'Categories',
          component: CategoryListView,
          meta: { requiresAuth: true }
        },
        {
          path: 'products',
          name: 'ProductList',
          component: ProductListView,
          meta: { requiresAuth: true }
        },
        {
          path: 'products/new',
          name: 'AddProduct',
          component: ProductFormView,
          meta: { requiresAuth: true }
        },
        {
          path: 'products/edit/:id',
          name: 'EditProduct',
          component: ProductFormView,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach(authGuard)

export default router
