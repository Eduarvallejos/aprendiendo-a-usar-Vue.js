<template>
    <div>
        <h1>Dragon ball Blog</h1>
        <div v-if='characters.length'>
            <CharacterCard
            v-for="character in characters"
            v-bind:key="character.id"   
            v-bind:character="character"
            />
        </div>
        <div v-else>
            <p>Cargando personajes</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import CharacterCard from '@/components/CharacterCard.vue';
export default {

    components: {
        CharacterCard
    },
    data() {
        return {
            characters: []
        }
    },
        async created() {
            try{
                const data = await axios.get('https://dragonball-api.com/api/characters?limit=58');
                this.characters = data.data.items
                console.log(this.characters.items)
            } catch(error) {
                console.log('Error al obtener datos: ', error)
            }
        }
}
</script>