import { useSystemMessageStore, useAuthStore } from '@/stores'

export const authGuard = (to, from, next) => {
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
