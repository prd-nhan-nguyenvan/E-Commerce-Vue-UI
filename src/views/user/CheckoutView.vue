<template>
  <div class="mt-5 container">
    <h1 class="h3">Checkout</h1>
    <hr />
    <Cart />
    <hr />
    <div class="d-flex justify-content-end">
      <!-- address form -->
      <div class="col-md-6">
        <h2 class="h4">Shipping Address</h2>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" v-model="inputFields.name" />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Address</label>
          <input type="text" class="form-control" id="address" v-model="inputFields.address" />
        </div>
        <div class="mb-3">
          <label for="city" class="form-label">City</label>
          <input type="text" class="form-control" id="city" v-model="inputFields.city" />
        </div>
        <div class="mb-3">
          <label for="postalCode" class="form-label">Postal Code</label>
          <input
            type="text"
            class="form-control"
            id="postalCode"
            v-model="inputFields.postalCode"
          />
        </div>
        <div class="mb-3">
          <label for="country" class="form-label">Country</label>
          <input type="text" class="form-control" id="country" v-model="inputFields.country" />
        </div>
        <button type="submit" class="btn btn-primary" @click="handleOrder">Place Order</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cart from '@/components/cart/Cart.vue'

import { useCartStore } from '@/stores'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()
const inputFields = {
  name: '',
  address: '',
  city: '',
  postalCode: '',
  country: ''
}

const handleOrder = async () => {
  if (cartStore.cartItems.length === 0) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Your cart is empty!'
    })
  }

  if (Object.values(inputFields).some((field) => field === '')) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill all fields!'
    })
  }
  try {
    const address = `${inputFields.address}, ${inputFields.city}, ${inputFields.postalCode}, ${inputFields.country}`
    await cartStore.placeOrder(address)
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Your order has been placed.'
    }).then(() => {
      router.push({ name: 'home' })
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!'
    })
  }
}
</script>
