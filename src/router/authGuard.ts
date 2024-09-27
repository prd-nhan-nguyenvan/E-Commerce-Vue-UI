export const authGuard = (to, from, next) => {
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
}
