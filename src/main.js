import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue3Material from 'vue3-material';

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Vue3Material)

app.mount('#app')

