<template>
    <div class="h-[30rem] border-2 border-indigo-600 rounded-md place-items-center content-around">
        <h2 class="text-[30px] font-black">{{ character.name}}</h2>
        <img :src="character.image" alt="imagen de {{ character.name }}" class="h-80 w-auto m-4">
        <router-link v-bind:to="`/details/${character.id}`" class="flex text-[20px] m-6 p-1 rounded-md bg-sky-500/100">Mas detalles</router-link>
    </div>
</template>

<script>
export default {
    props: {    
        character: Object
    }
}
</script>