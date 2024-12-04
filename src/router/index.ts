import { createRouter, createWebHistory } from 'vue-router'

import { ALL_ROLE, ROLE_ADMIN, ROLE_STAFF } from '@/helpers'

import { authGuard } from './authGuard'

const CategoryView = () => import('@/views/CategoryView.vue')
const DashboardView = () => import('@/views/DashboardView.vue')
const HomeView = () => import('@/views/HomeView.vue')

const ChangePasswordView = () => import('@/views/auth/ChangePasswordView.vue')
const LoginView = () => import('@/views/auth/LoginView.vue')
const ProfileView = () => import('@/views/auth/ProfileView.vue')
const SignUpView = () => import('@/views/auth/SignUpView.vue')

const CategoryListView = () => import('@/views/admin/category/ListView.vue')
const DetailView = () => import('@/views/products/DetailView.vue')
const ListView = () => import('@/views/admin/product/ListView.vue')
const ProductFormView = () => import('@/views/admin/product/DetailView.vue')
const OrderListView = () => import('@/views/admin/order/ListView.vue')

const UserDetailView = () => import('@/views/admin/user/DetailView.vue')
const UserListView = () => import('@/views/admin/user/ListView.vue')

const CartView = () => import('@/views/user/CartView.vue')
const CheckoutView = () => import('@/views/user/CheckoutView.vue')
const OrderView = () => import('@/views/user/OrderView.vue')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { path: '/:slug', name: 'category', component: CategoryView },
    {
      path: '/products/:slug',
      name: 'productDetail',
      component: DetailView
    },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/signup', name: 'signup', component: SignUpView },

    {
      path: '/user',
      meta: { requiresAuth: true, role: ALL_ROLE },
      children: [
        {
          path: '',
          name: 'user',
          redirect: { name: 'profile' }
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
          meta: { requiresAuth: true, role: ALL_ROLE }
        },
        {
          path: 'password/change',
          name: 'changePassword',
          component: ChangePasswordView,
          meta: { requiresAuth: true, role: ALL_ROLE }
        },

        {
          path: 'cart',
          name: 'cart',
          component: CartView,
          meta: { requiresAuth: true, role: ALL_ROLE }
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: CheckoutView,
          meta: { requiresAuth: true, role: ALL_ROLE }
        },
        {
          path: 'orders',
          name: 'orders',
          component: OrderView
        }
      ]
    },

    {
      path: '/admin',
      meta: { requiresAuth: true, role: [ROLE_ADMIN, ROLE_STAFF] },
      children: [
        {
          name: 'admin',
          path: '',
          component: DashboardView,
          meta: { requiresAuth: true, role: [ROLE_ADMIN, ROLE_STAFF] } // Explicitly set role for admin
        },
        {
          path: 'categories',
          name: 'categories',
          component: CategoryListView,
          meta: { requiresAuth: true, role: [ROLE_ADMIN, ROLE_STAFF] } // Explicitly set role for categories
        },
        {
          path: 'products',
          name: 'products',
          component: ListView,
          meta: { requiresAuth: true, role: [ROLE_ADMIN, ROLE_STAFF] } // Explicitly set role for products
        },
        {
          path: 'products/new',
          name: 'addProduct',
          component: ProductFormView,
          meta: { requiresAuth: true, role: [ROLE_ADMIN, ROLE_STAFF] } // Explicitly set role for adding products
        },
        {
          path: 'products/edit/:id',
          name: 'editProduct',
          component: ProductFormView,
          meta: { requiresAuth: true, role: [ROLE_ADMIN, ROLE_STAFF] } // Explicitly set role for editing products
        },

        {
          path: 'orders',
          name: 'adminOrders',
          component: OrderListView,
          meta: { requiresAuth: true, role: [ROLE_ADMIN, ROLE_STAFF] } // Explicitly set role for orders
        },

        {
          path: 'users',
          name: 'userManagement',
          component: UserListView,
          meta: { requiresAuth: true, role: [ROLE_ADMIN] } // Explicitly set role for editing products
        },
        {
          path: 'users/detail/:id',
          name: 'userDetail',
          component: UserDetailView,
          meta: { requiresAuth: true, role: [ROLE_ADMIN] } // Explicitly set role for editing products
        }
      ]
    }
  ]
})

router.beforeEach(authGuard)

export default router
