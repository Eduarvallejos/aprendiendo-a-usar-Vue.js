<template>
  <div class="bg-gray-50">
    <div class="p-4 text-center">
      <h1 class="text-3xl font-extrabold text-gray-800 mt-10">All Posts</h1>
    </div>
    <PostsList />
  </div>
</template>

<script>
import PostsList from "@/components/PostsList.vue";

export default {
  components: {
    PostsList,
  },
};
</script>
