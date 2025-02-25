<template>
  <div>
    <input v-model.number="userId" type="search" />
    <button v-on:click="storePosts.getPost(userId)">Search</button>
  </div>
  <div>
    <p>
      <strong>Total Posts: {{ postUser.length || posts.length }}</strong>
    </p>
    <div v-for="post in (postUser.length > 0 ? postUser : posts)" class="post">
      <p><strong>Title: </strong>{{ post.title }}.</p>
      <p><strong>Body: </strong>{{ post.body }}</p>
      <p><strong>User: </strong>{{ user(post.userId) }}.</p>
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/stores/PostStore";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";                                                                                                                                                                                                                         

export default {
  setup() {
    const storePosts = usePostStore();
    const storeUser = useUserStore();

    const user = storeUser.getUserNameByPost;
    const { posts, postUser } = storeToRefs(storePosts);

    const userId = ref(null)

    return { storePosts,  posts, postUser, user, userId };
  },
};
</script>

<style scoped>
.post {
  border: 1px solid rebeccapurple;
}
</style>
