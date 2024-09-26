import { login } from '@/services/auth.service'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: 'Eduardo',
    isAdmin: true
  }),

  actions: {
    logout() {
      this.$patch({
        name: '',
        isAdmin: false
      })
    },

    /**
     * Attempt to login a user
     */
    async login(email: string, password: string) {
      const userData = await login({ email: email, password: password })

      this.$patch({
        name: user,
        ...userData
      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
