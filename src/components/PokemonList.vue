<template>

<main>
    <h1> Pokemon App</h1>
    <loader-vue v-if="isLoading"/>
    
    <div class="ct-pokemon">
    
        <div 
        v-for="(pokemon, index) in list" :key="index" 
        class="pokemon-list"
        @click="selectPokemon(getPokemonId(pokemon.url))">
            <img :src="getPokemonImage(getPokemonId(pokemon.url))">
            <p>{{pokemon.name}}</p>
    
        </div>
    </div>

</main>   


</template>

<script>
	import { getPokemonList, getPokemonImageURL } from "../service/pokemon-service.js";
	import { onMounted, ref } from "vue";
    import { useRouter } from "vue-router"
    import LoaderVue from "./LoaderVue.vue"

	export default {
        components:{
           "loader-vue": LoaderVue,
        },
		setup() {
            const list = ref([]);
            const router = useRouter();
            const isLoading = ref(false)

			onMounted(() => {
                isLoading.value = true
				getPokemonList().then((resp) => {
                    console.log(resp)
                    list.value = resp.results
				}).finally(()=>{
                    isLoading.value = false
                })
			});

            const getPokemonId = (url) => url.replace("https://pokeapi.co/api/v2/pokemon/","").replace('/',"")

            const selectPokemon = id => {
                router.push({name: "pokemon", params:{id}})
            }
            
            const getPokemonImage =  id =>  getPokemonImageURL(id)
			
            return { list, getPokemonImage, getPokemonId, selectPokemon, isLoading };
		},

	};
</script>

<style scoped>

.ct-pokemon{
    display: flex;
    flex-wrap: wrap;
}
.pokemon-list{
    display: flex;
    flex-direction: column;
    border: 1px solid red;
    border-radius: 2px;
    width: 200px;
    margin-left: 10px;
    margin-bottom: 10px;
    cursor: pointer;
}

.pokemon-list img{
    width: 200px;
}

.pokemon-list p{
    font-size: 25px;
    font-weight: 500;
    text-align: center;
}


</style>
