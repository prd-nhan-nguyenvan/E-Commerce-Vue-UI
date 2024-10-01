import { Api, ContentType } from '@/services/api'
import { logout, refreshAccessToken } from './auth.service'

const baseUrl = `${import.meta.env.VITE_API_URL}`

export const api = new Api({
  baseUrl,
  securityWorker: async () => {
    const token = localStorage.getItem('accessToken')
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  },
  baseApiParams: {}
})
