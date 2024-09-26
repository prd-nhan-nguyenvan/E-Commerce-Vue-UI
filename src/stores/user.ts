import type { UserProfile } from './../services/api'
import { defineStore } from 'pinia'

interface UserState {
  name: string | undefined
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined
  }),
  actions: {
    setUser(userProfile: UserProfile) {
      this.name = userProfile.first_name
    },
    clearUser() {
      this.name = undefined

      // Remove from localStorage or sessionStorage
      localStorage.removeItem('user_name')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  }
})
