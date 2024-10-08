import { useSystemMessageStore, useAuthStore } from '@/stores'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  const systemMessageStore = useSystemMessageStore()

  systemMessageStore.clearMessage()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      systemMessageStore.setMessage('You must log in to access this page')

      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
}
