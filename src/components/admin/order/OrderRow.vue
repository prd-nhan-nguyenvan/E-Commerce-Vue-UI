<template>
  <tr :key="order.id">
    <td class="text-center">{{ index + 1 }}</td>
    <!-- Action -->
    <td>
      <router-link
        :to="{ name: 'orderDetail', params: { id: order.id } }"
        class="btn btn-sm btn-primary"
      >
        <i class="material-icons">visibility</i>
      </router-link>
    </td>

    <td>{{ user?.email }}</td>
    <td>
      <span class="badge" :class="getStatusColor(order.status as OrderStatus)"
        >{{ getOrderStatusLabel(order.status) }}
      </span>
    </td>
    <td class="text-end">{{ formatCurrency(order.total_price) }}</td>
    <td>{{ order.address }}</td>
    <td class="text-center">{{ order.items.length }}</td>
    <td>{{ formatDate(order.created_at) }}</td>
    <td>{{ formatDate(order.updated_at) }}</td>
  </tr>
</template>

<script setup lang="ts">
import { useOrderStore, useUserStore } from '@/stores'
import { onMounted, ref } from 'vue'

import type { UserDetail } from '@/services'
import type { Order } from '@/stores/types'
import { OrderStatus } from '@/services/order.service'
import { formatCurrency, formatDate, getStatusColor, getOrderStatusLabel } from '@/helpers'

interface Props {
  order: Order
  index: number
}

const props = defineProps<Props>()

const orderStore = useOrderStore()
const userStore = useUserStore()
const user = ref<UserDetail | undefined>(undefined)
onMounted(async () => {
  user.value = await userStore.getUserById(props.order.user)
})
</script>
