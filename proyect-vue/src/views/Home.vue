<template>
  <div class="flex flex-col justify-center">
    <h1 class="text-[50px] text-blue-600 text-center font-black">
      Dragon ball Blog
    </h1>
    <div
      v-if="charactersStore.characters.length"
      class="grid grid-cols-4 gap-5 m-10"
    >
      <CharacterCard />
    </div>
    <div v-else>
      <p>Cargando personajes...</p>
    </div>
  </div>
</template>

<script>
import CharacterCard from "@/components/CharacterCard.vue";
import { useCharacterStore } from "@/stores/charactersStore";
import { onMounted } from "vue";

export default {
  setup() {
    const charactersStore = useCharacterStore();
    onMounted(() => charactersStore.fetchCharacters());
    return { charactersStore };
  },

  components: {
    CharacterCard,
  },
};
</script>
