<template>
  <div class="bg-gray-50 h-[calc(100vh-3rem)]">
    <div class="p-4">
      <h1 class="text-3xl font-extrabold text-gray-800 text-center mt-10">
        Post Comments
      </h1>
    </div>
    <Comments />
  </div>
</template>

<script>
import Comments from "@/components/PostComments.vue";

export default {
  components: {
    Comments,
  },
};
</script>
