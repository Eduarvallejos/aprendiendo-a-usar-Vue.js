<template>
  <div class="bg-gray-900">
    <div class="p-4">
      <h1 class="text-3xl font-extrabold text-gray-50 text-center mt-10">Images Album</h1>      
    </div>
    <Photos />
  </div>
</template>

<script>
import Photos from "@/components/AlbumPhotos.vue";

export default {
  components: {
    Photos
  },
};
</script>