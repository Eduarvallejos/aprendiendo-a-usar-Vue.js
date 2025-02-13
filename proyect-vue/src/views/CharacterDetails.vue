<template>
    <h1>Acerca de {{ data.name }}</h1>
    <img v-bind:src="data.image" alt="">
    <h1>{{ data.name }}</h1>
    <p>Ki: {{ data.ki }}</p>
    <p>Raza: {{ data.race }}</p>
    <p>{{ data.description }}</p>
    
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            data: null
        }
    },
    async created() {
        const id = this.$route.params.id;
        const response = await axios.get(`https://dragonball-api.com/api/characters/${id}`);
        this.data = response.data

    }
}
</script>