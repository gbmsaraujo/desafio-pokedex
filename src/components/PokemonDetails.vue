<template>

    <div>
        <h1>Informações</h1>
        <button @click="homePage"> Voltar </button>
        <loader-vue v-if="isLoading" />

        <div v-if="info">
            <div class="pokemon-card">
                <img :src="image" />
                <h1>{{info.name}}</h1> 
                <p> Experiência: <span class="values">{{info.base_experience}} </span></p>   
                <p> Peso: <span class="values"> {{info.weight}} g</span>  </p>   
                <p> Tamanho: <span class="values"> {{info.height}} cm </span>  </p>   
                <h2> Habilidades: </h2>
                <ul v-for="(abilidade, index) in info.abilities" :key="index" class="abilities">
                    <li><span class="values">{{abilidade.ability.name}}</span></li>
                </ul>
            </div>
        </div>

        

    </div>

</template>

<script>
    import {  useRouter, useRoute } from 'vue-router'
    import { onMounted, ref, computed } from 'vue'
    import { getPokemon,  getPokemonImageURL } from '../service/pokemon-service'
    import LoaderVue from './LoaderVue.vue'

export default {
    components:{
        "loader-vue":LoaderVue
    },
    setup(){
        const router = useRouter() 
        const route = useRoute()
        const info = ref (null)
        const isLoading = ref (false)

        onMounted(()=>{
            isLoading.value = true
            getPokemon(route.params.id).then(resp =>{
               info.value = resp
               console.log(resp.abilities)
            }).finally(()=>{
                isLoading.value = false
            })
        })

        const image = computed(()=>{
           return getPokemonImageURL(info.value.id)
        })

        const homePage = () =>{
           router.replace('/')
        }

        return { isLoading, info, image, homePage }
    }
}
</script>

<style scoped>
.pokemon-card{
    display: flex;
    flex-direction: column;
    border: 1px solid red;
    width: 200px;
}

.pokemon-card h1,h2{
    text-align: center;
}

.pokemon-card p{
    font-size: 20px;
    margin-left: 10px;
}

button{
    font-size: 25px;
    border: none;
    background-color: rgb(80, 181, 80);
    padding: 20px;
    margin: 10px;
    cursor: pointer;
    border-radius: 10px;

}

.values{
    font-weight: 600;
}

.abilities li{
    font-size: 20px;
}
</style>