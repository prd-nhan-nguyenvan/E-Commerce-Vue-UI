<template>
  <div class="card mb-2 shadow-sm">
    <div class="row g-0">
      <div class="col-1">
        <img
          :src="
            product?.image
              ? product.image
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdD7G7FFg1UKZFXhyP45b4AvY-qKEFvfjj3w&s'
          "
          class="img-fluid rounded-start"
          alt="Product Image"
        />
      </div>
      <div class="col-8">
        <div class="card-body p-2 d-flex flex-row justify-content-between">
          <div>
            <h6 class="card-title mb-1">{{ product?.name }}</h6>
            <p class="card-text mb-1">
              <small class="text-muted">Price: {{ formatCurrency(props.price) }}</small>
            </p>
          </div>
          <div class="mt-2">
            <h6 class="text-muted">Quantity: {{ props.quantity }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '@/helpers'
import type { EnhancedProduct } from '@/services/product.service'
import { useProductStore } from '@/stores'
import { onMounted, ref } from 'vue'

interface Props {
  product_id: number
  quantity: number
  price: string
}

const productStore = useProductStore()

const props = defineProps<Props>()

const product = ref<EnhancedProduct | null | undefined>(null)

onMounted(async () => {
  product.value = await productStore.getProductById(props.product_id)
})
</script>
