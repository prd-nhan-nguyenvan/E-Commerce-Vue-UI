<template>
  <tr :key="order.id">
    <td class="text-center">{{ index + 1 }}</td>
    <td>{{ user?.email }}</td>
    <td>
      <span class="badge" :class="getStatusColor(order.status as OrderStatus)"
        >{{ getEnumKeyByValue(order.status) }}
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
import { formatCurrency, formatDate, getStatusColor } from '@/helpers'

interface Props {
  order: Order
  index: number
}

function getEnumKeyByValue(value: string): string | undefined {
  return Object.keys(OrderStatus)
    .find((key) => OrderStatus[key as keyof typeof OrderStatus] === value)
    ?.toLocaleLowerCase()
}
const props = defineProps<Props>()

const orderStore = useOrderStore()
const userStore = useUserStore()
const user = ref<UserDetail | undefined>(undefined)
onMounted(async () => {
  user.value = await userStore.getUserById(props.order.user)
})
</script>
