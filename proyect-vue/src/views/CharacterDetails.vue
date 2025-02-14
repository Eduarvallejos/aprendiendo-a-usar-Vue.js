<template>
    <div v-if="data">
        <h1 class="text-center font-bold text-[40px]">Acerca de {{ data.name }}</h1>
        <div class="grid grid-cols-2 gap-5 m-8">
            <div class="flex place-content-center">
                <img v-bind:src="data.image" class="h-[50rem] m-6">
            </div>
            <div class="text-justify place-content-center text-[20px]">
                <p><span class="font-bold">Ki: </span>{{ data.ki }}</p>
                <p><span class="font-bold">MaxKi: </span>{{ data.maxKi }}</p>
                <p><span class="font-bold">Gender: </span>{{ data.gender }}</p>
                <p><span class="font-bold">Affiliation: </span>{{ data.affiliation }}</p>
                <p><span class="font-bold">Raza: </span>{{ data.race }}</p>
                <p>{{ data.description }}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Cargando detalles del personaje...</p>
    </div>
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