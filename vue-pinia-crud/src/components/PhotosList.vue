<template>
  <p class="text-center p-1 mb-6 text-gray-200">
    <strong>{{ photos.length }} Photos.</strong>
  </p>
  <div class="flex flex-wrap justify-around gap-y-8">
    <div v-for="photo in photos" :key="photo.id" class="flex flex-col items-center border space-y-4 p-4 w-[550px] bg-white">
      <img :src="`https://picsum.photos/600/400?random=${photo.id}`" alt="images random" loading="lazy" />
      <p>{{ photo.title }}.</p>
    </div>
  </div>
</template>

<script>
import { useAlbumStore } from "@/stores/AlbumStore";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const storeAlbum = useAlbumStore();
    const { photos } = storeToRefs(storeAlbum);
    return { photos };
  },
};
</script>
