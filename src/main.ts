import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/css/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from '@/App.vue'

import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
