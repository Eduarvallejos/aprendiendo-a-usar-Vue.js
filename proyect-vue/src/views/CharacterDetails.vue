<template>
  <div v-if="charater">
    <h1 class="text-center font-bold text-[40px]">
      Acerca de {{ charater.name }}
    </h1>
    <div class="grid grid-cols-2 gap-5 m-8">
      <div class="flex place-content-center">
        <img v-bind:src="charater.image" class="h-[50rem] m-6" />
      </div>
      <div class="text-justify place-content-center text-[20px]">
        <p><span class="font-bold">Ki: </span>{{ charater.ki }}</p>
        <p><span class="font-bold">MaxKi: </span>{{ charater.maxKi }}</p>
        <p><span class="font-bold">Gender: </span>{{ charater.gender }}</p>
        <p>
          <span class="font-bold">Affiliation: </span>{{ charater.affiliation }}
        </p>
        <p><span class="font-bold">Raza: </span>{{ charater.race }}</p>
        <p>{{ charater.description }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Cargando detalles del personaje...</p>
  </div>
</template>

<script>
import { useCharacterStore } from "@/stores/charactersStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const charactersStore = useCharacterStore();
    const { characters } = storeToRefs(charactersStore);
    const charater = computed(() =>
      characters.value.find((char) => char.id == route.params.id)
    );
    return { charater };
  },
};
</script>
