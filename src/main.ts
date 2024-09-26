import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Material from 'vue3-material'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Material)
app.mount('#app')
