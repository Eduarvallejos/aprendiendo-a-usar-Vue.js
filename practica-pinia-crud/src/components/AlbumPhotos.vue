<template>
  <div v-if="photosAlbum">
    <div v-for="photo in photosAlbum">
      <p>{{ photo.title }}</p>
      <img src="https://placehold.co/600x400" alt="Placeholder" />
    </div>
  </div>
  <p v-else>Loading Photos...</p>
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
