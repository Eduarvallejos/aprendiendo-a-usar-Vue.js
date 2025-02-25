<template>
  <div v-if="commentsPost">
    <div v-for="comment in commentsPost" class="comment">
      <p>{{ comment.name }}.</p>
      <p>{{ comment.body }}.</p>
      <p>{{ comment.email }}.</p>
    </div>
  </div>
  <p v-else>Loading Comments...</p>
</template>

<script>
import { usePostStore } from "@/stores/PostStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

export default {
  setup() {
    const storeComments = usePostStore();
    const route = useRoute();

    const comments = storeComments.getComments(route.params.id);

    const { commentsPost } = storeToRefs(storeComments);
    return { commentsPost };
  },
};
</script>

<style scoped>
.comment {
  text-align: justify;
}
</style>
