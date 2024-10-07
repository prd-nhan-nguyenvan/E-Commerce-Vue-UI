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
    token: null,
    loading: false,
    error: ''
  }),
  actions: {
    setUser(user: UserProfile | null) {
      this.user = user
    },
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

        // call user profile
        const user = await apiGetUserProfile()
        console.log('🚀 AuthStore ~ login ~ user:', user)
        this.setUser(user)
      } catch (e) {
        console.log('🚀 AuthStore ~ login ~ e:', e)
        throw e
      } finally {
        this.loading = false
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})
