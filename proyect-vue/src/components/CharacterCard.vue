<template>
    <div class="character-card">
        <h2>{{ character.name}}</h2>
        <img :src="character.image" alt="imagen de {{ character.name }}">
        <router-link v-bind:to="`/details/${character.id}`">Mas detalles</router-link>

    </div>
</template>

<script>
export default {
    props: {    
        character: Object
    }
}
</script>