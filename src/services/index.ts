import { Api, ContentType } from '@/services/api'

const baseUrl = `${import.meta.env.VITE_API_URL}`

// Function to get the access token
const getToken = () => localStorage.getItem('accessToken')

// Initialize API service with token-based authorization
export const api = new Api({
  baseUrl: baseUrl,
  securityWorker: (token) =>
    token ? { headers: { Authorization: `Bearer ${String(token)}` } } : {},
  baseApiParams: {
    headers: {
      'Content-Type': ContentType.Json
    },
    format: 'json'
  }
})
