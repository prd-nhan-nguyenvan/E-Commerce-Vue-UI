import { Api, ContentType } from '@/services/api'

const baseUrl = `${import.meta.env.VITE_API_URL}`

export const api = new Api({
  baseUrl,
  securityWorker: () => {
    const token = localStorage.getItem('accessToken')
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  },
  baseApiParams: {
    headers: { 'Content-Type': ContentType.Json },
    format: 'json'
  }
})
