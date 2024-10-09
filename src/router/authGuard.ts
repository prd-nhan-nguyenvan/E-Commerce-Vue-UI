import { useSystemMessageStore, useAuthStore } from '@/stores'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const authGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  const systemMessageStore = useSystemMessageStore()

  const userRole = authStore.user?.role
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      systemMessageStore.setMessage(
        `You must log in to access ${to.name?.toString().toUpperCase()} page!!!`
      )
      // Redirect to login, storing the intended route in 'next'
      next({ name: 'login', query: { next: to.fullPath } })
    } else {
      // Ensure allowedRoles is always an array
      const allowedRoles: string[] = Array.isArray(to.meta.role) ? to.meta.role : []

      if (!allowedRoles.length) {
        // If no specific roles are required, allow access
        next()
      } else if (!userRole) {
        // If user has no role, redirect to login
        next({ name: 'login', query: { next: to.fullPath } })
      } else if (!allowedRoles.includes(userRole)) {
        systemMessageStore.setMessage(
          `You haven't permission for access ${to.name?.toString().toUpperCase()} page!!!`
        )
        next({ name: 'home' }) // Redirect to home if no permission
      } else {
        systemMessageStore.clearMessage() // Clear messages if access is allowed
        next() // Allow access
      }
    }
  } else {
    systemMessageStore.clearMessage() // Clear messages for non-auth routes
    next() // Proceed to the route
  }
}
