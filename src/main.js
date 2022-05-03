import { createApp } from 'vue'
import App from './App.vue'
import PokemonList from './components/PokemonList.vue'
import PokemonDetails from './components/PokemonDetails.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:"/", component: PokemonList},
        {path:"/pokemon/:id", name: "pokemon", component: PokemonDetails}
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')

