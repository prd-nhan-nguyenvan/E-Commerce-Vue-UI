<template>
  <!-- Product Card Grid View -->
  <div class="row">
    <!-- <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
      <div class="card h-100 shadow-sm border-light">
        <img
          v-if="product.image"
          :src="product.image"
          alt="Product Image"
          class="card-img-top img-thumbnail"
          style="height: 200px; object-fit: cover"
        />
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">{{ product.description }}</p>
          <p class="card-text">
            <strong>Price: </strong>
            <span v-if="product.on_sell">
              <span class="badge bg-danger ms-2">On Sale!</span>

              <span class="text-danger fw-bold">
                {{ formatCurrency(product.sell_price) }}
              </span>
              <br />
              <span class="small text-muted text-decoration-line-through">
                {{ formatCurrency(product.price) }}
              </span>
            </span>
            <span v-else>
              <span class="fw-bold">{{ formatCurrency(product.price) }}</span>
            </span>
          </p>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary w-100">Add to Cart</button>
          <router-link
            :to="{ name: 'ProductDetail', params: { slug: product.slug } }"
            class="btn btn-link w-100"
          >
            View Detail</router-link
          >
        </div>
      </div>
    </div> -->
    <div class="col-lg-3 col-md-6 col-sm-6 d-flex">
      <div class="card w-100 my-2 shadow-2-strong">
        <img
          src="https://mdbootstrap.com/img/bootstrap-ecommerce/items/1.webp"
          class="card-img-top"
          style="aspect-ratio: 1 / 1"
        />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">GoPro HERO6 4K Action Camera - Black</h5>
          <p class="card-text">$790.50</p>
          <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
            <a href="#!" class="btn btn-primary shadow-0 me-1">Add to cart</a>
            <a href="#!" class="btn btn-light border px-2 pt-2 icon-hover"
              ><i class="fas fa-heart fa-lg text-secondary px-1"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { useCategoryStore } from '@/stores/category'
import { computed, onMounted, ref } from 'vue'
import Swal from 'sweetalert2'

const productStore = useProductStore()
const categoryStore = useCategoryStore()

const { fetchProducts } = productStore
const { fetchCategories } = categoryStore

const recordsOptions = [5, 10, 20, 50]

const currentPage = ref(1)
const productsPerPage = ref(recordsOptions[1])

const products = computed(() => productStore.products)
const loading = computed(() => productStore.loading)
const previous = computed(() => productStore.previous)
const next = computed(() => productStore.next)
const error = computed(() => productStore.error)
const totalPages = computed(() => Math.ceil(productStore.count / productsPerPage.value))

// Methods

const formatCurrency = (price: string) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    parseFloat(price)
  )
}

onMounted(() => {
  console.log('Loading Products...')
  fetchProducts()

  console.log('Loading Categories...')
  fetchCategories()
})
</script>

<style lang="css" scoped>
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}
</style>
