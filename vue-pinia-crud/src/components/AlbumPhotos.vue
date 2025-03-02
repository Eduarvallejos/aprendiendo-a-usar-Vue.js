<template>
  <div v-if="photosAlbum" class="flex flex-wrap gap-y-10 justify-around p-4 m-10">
    <div v-for="photo in photosAlbum" :key="photo.id" class="border p-4 space-y-4 bg-white w-[550px]">
      <img :src="`https://picsum.photos/600/400?random=${photo.id}`" loading="lazy" alt="Random Image" />
      <p class="text-lg font-semibold text-gray-800 ml-4 text-center">{{ photo.title }}</p>
    </div>
  </div>
  <p v-else class="text-lg text-center text-gray-900">Loading Photos...</p>
</template>
<script>
import { useAlbumStore } from "@/stores/AlbumStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

export default {
  setup() {
    const storePhotos = useAlbumStore();
    const route = useRoute();

    const photos = storePhotos.getPhotosAlbum(route.params.id);

    const { photosAlbum } = storeToRefs(storePhotos);
    return { photosAlbum };
  },
};
</script>
