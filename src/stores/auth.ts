import type { Login, UserProfile } from '@/services/api'
import { defineStore } from 'pinia'
import { login as apiLogin } from '@/services/auth.service'
import { getUserProfile as apiGetUserProfile } from '@/services/user.service'
interface authState {
  user: UserProfile | null
  token: string | null
  loading: boolean
  error: string
}

export const useAuthStore = defineStore('auth', {
  state: (): authState => ({
    user: null,
    token: localStorage.getItem('accessToken') || null,
    loading: false,
    error: ''
  }),
  actions: {
    setToken(token: string, refresh: string) {
      this.token = token
      localStorage.setItem('refreshToken', refresh)
      localStorage.setItem('accessToken', token)
    },
    async login(payload: Login) {
      this.error = ''
      this.loading = true
      try {
        const response = await apiLogin(payload)
        console.log('🚀 AuthStore ~ login ~ response:', response)
        const { access_token, refresh_token } = response
        this.setToken(access_token, refresh_token)
        await this.fetchUser()
      } catch (e) {
        console.log('🚀 AuthStore ~ login ~ e:', e)
        throw e
      } finally {
        this.loading = false
      }
    },
    async fetchUser() {
      try {
        if (this.token) {
          const response = await apiGetUserProfile() // Replace with your API call to get user info
          this.user = response
        }
      } catch (error) {
        console.error('Failed to load user info', error)
        this.logout() // Optionally log out if fetching user info fails
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('accessToken')
    },

    async initializeAuth() {
      const token = localStorage.getItem('accessToken')
      if (token) {
        this.token = token
        await this.fetchUser() // Load user info if token exists
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})
