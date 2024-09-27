import { Api, ContentType } from '@/services/api'
import { logout, refreshAccessToken } from './auth.service'

const baseUrl = `${import.meta.env.VITE_API_URL}`

export const api = new Api({
  baseUrl,
  securityWorker: async () => {
    const token = localStorage.getItem('accessToken')

    // Return the Authorization header if token exists
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  },
  baseApiParams: {
    headers: { 'Content-Type': ContentType.Json },
    format: 'json'
  }
})
