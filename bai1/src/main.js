import { createApp } from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router'
import httpApi from './http'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const app = createApp(App)

app.use(router)

app.provide('$httpApi', httpApi)

app.mount('#app')
