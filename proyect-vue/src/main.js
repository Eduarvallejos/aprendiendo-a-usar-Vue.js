
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'
import Home from './views/Home.vue'
import CharacterDetails from './views/CharacterDetails.vue'

const router = createRouter( {  
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'Home', component: Home},
        {path: '/details/:id', name: 'CharacterDetails', component: CharacterDetails},
    ]
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
