<template>
  <div v-if="commentsPost" class="flex flex-wrap gap-6 justify-center p-4 m-10">
    <div
      v-for="comment in commentsPost"
      :key="comment.id"
      class="w-[500px] space-y-4 p-4 bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-all"
    >
      <p class="text-center text-lg font-semibold text-gray-800">
        <strong>Name: </strong>{{ comment.name }}.
      </p>
      <p class="text-justify text-gray-600 font-medium">{{ comment.body }}.</p>
      <p class="text-center text-zinc-950 font-mono">{{ comment.email }}.</p>
    </div>
  </div>
  <p v-else class="text-lg text-center font-semibold text-gray-800">
    Loading Comments...
  </p>
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
