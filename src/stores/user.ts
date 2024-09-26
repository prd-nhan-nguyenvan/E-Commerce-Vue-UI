import type { UserProfile } from './../services/api'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: (): UserProfile => ({
    id: -1,
    user: -1,
    first_name: undefined,
    last_name: undefined,
    bio: undefined,
    profile_picture: null,
    phone_number: undefined,
    address: undefined
  }),
  actions: {
    setUser(userProfile: UserProfile) {
      this.id = userProfile.id
      this.user = userProfile.user
      this.first_name = userProfile.first_name
      this.last_name = userProfile.last_name
      this.bio = userProfile.bio
      this.profile_picture = userProfile.profile_picture
      this.phone_number = userProfile.phone_number
      this.address = userProfile.address
    },

    clearUser() {
      this.id = -1
      this.user = -1
      this.first_name = undefined
      this.last_name = undefined
      this.bio = undefined
      this.profile_picture = null
      this.phone_number = undefined
      this.address = undefined
    }
  }
})
