<template>
  <h1>Image Album</h1>
  <div class="photos">
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
<style scoped>
.photos{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
}
</style>