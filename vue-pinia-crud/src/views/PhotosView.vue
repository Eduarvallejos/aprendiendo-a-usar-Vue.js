<template>
  <div class="bg-gray-900">
    <div class="p-1">
      <h1 class="text-3xl font-extrabold text-gray-200 text-center mt-4">All Photos</h1>
    </div>
    <PhotosList />
  </div>
</template>

<script>
import PhotosList from "@/components/PhotosList.vue";

export default {
  components: {
    PhotosList,
  },
};
</script>
