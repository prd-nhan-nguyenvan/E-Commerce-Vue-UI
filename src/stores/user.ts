import type { UserDetail, UserList } from '@/services'
import { defineStore } from 'pinia'
import {
  getUserList as apiGetAllUser,
  getUserById as apiGetUserByID,
  blockUser as apiBlockUser
} from '@/services/user.service'
import { ROLE_ADMIN } from '@/helpers'

interface UserPagingList {
  users: UserList[]
  selectedUser: UserDetail | null
  count: number
  next: string | null | undefined
  previous: string | null | undefined
  loading: boolean
  error: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserPagingList => ({
    users: [],
    selectedUser: null,
    count: 0,
    next: null,
    previous: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchUsers(limit = 10, offset = 0) {
      this.loading = true
      this.error = null

      try {
        const response = await apiGetAllUser({ limit, offset })
        this.users = response.results
        this.count = response.count
        this.next = response.next
        this.previous = response.previous
      } catch (error) {
        this.error = 'Failed to load products'
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
        console.log('Loading state:', this.loading) // Log the loading state
      }
    },

    // Add a function to load the next page of products
    async loadNextPage() {
      if (this.next) {
        const offset = new URL(this.next).searchParams.get('offset') || '0'
        const limit = new URL(this.next).searchParams.get('limit') || '10'
        await this.fetchUsers(parseInt(limit, 10), parseInt(offset, 10))
      }
    },

    // Add a function to load the previous page of products
    async loadPreviousPage() {
      if (this.previous) {
        const offset = new URL(this.previous).searchParams.get('offset') || '0'
        const limit = new URL(this.previous).searchParams.get('limit') || '10'
        await this.fetchUsers(parseInt(limit, 10), parseInt(offset, 10))
      }
    },

    async getUserById(userId: number) {
      this.loading = true
      this.error = null

      try {
        const response = await apiGetUserByID(userId)
        this.selectedUser = response
        return response
      } catch (error) {
        this.error = 'Failed to load product'
        console.error('Error fetching product:', error)
      } finally {
        this.loading = false
      }
    },
    async blockUser(user: UserList) {
      if (user.role === ROLE_ADMIN) {
        throw new Error('Cannot block admin') // Throw an error if trying to block an admin
      }

      try {
        const response = await apiBlockUser(user.id)

        const index = this.users.findIndex((p) => p.id === user.id)
        if (index !== -1) {
          this.users[index].is_active = false
        }
        this.selectedUser = response
      } catch (error) {
        console.error('Error blocking user:', error)
        throw new Error('Failed to block user. Please try again later.') // Throw a user-friendly error message
      }
    },
    resetState() {
      this.users = []
      this.selectedUser = null
      this.loading = false
      this.error = null
    }
  }
})
