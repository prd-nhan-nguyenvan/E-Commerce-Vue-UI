import { Api, ContentType } from '@/services/api'
import { logout, refreshAccessToken } from './auth.service'

const baseUrl = `${import.meta.env.VITE_API_URL}`

export const api = new Api({
  baseUrl,
  securityWorker: async () => {
    let token = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    // If access token is expired, refresh it
    if (token && isTokenExpired(token) && refreshToken) {
      try {
        const newTokens = await refreshAccessToken(refreshToken)
        token = newTokens.access
        localStorage.setItem('accessToken', token)
      } catch (error) {
        console.error('Token refresh failed', error)
        // Optionally log out the user if refresh fails
        logout()
        return {}
      }
    }

    // Return the Authorization header if token exists
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  },
  baseApiParams: {
    headers: { 'Content-Type': ContentType.Json },
    format: 'json'
  }
})

// Helper to check if the token is expired
const isTokenExpired = (token: string): boolean => {
  const payload = JSON.parse(atob(token.split('.')[1]))
  const expiryTime = payload.exp * 1000 // JWT exp is in seconds, convert to ms
  return Date.now() >= expiryTime
}
