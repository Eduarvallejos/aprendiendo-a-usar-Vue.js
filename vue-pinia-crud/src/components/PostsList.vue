<template>
  <p class="text-center mb-10">
    <strong>{{ postUser.length || posts.length }} Posts.</strong>
  </p>
  <div class="flex justify-end mx-10 mb-10 p-4 space-x-3">
    <input v-model.number="userId" type="number" placeholder="enter user id (1 - 10)" min="1" max="10" @input="validateUserId" class="border border-gray-300 rounded-lg py-2 px-2 focus:ring focus:ring-blue-300 outline-none w-48"/>
    <button @click="searchPost" class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">Search</button>                           
  </div>
  <div class="flex flex-wrap justify-around gap-y-8">
    <div
    v-for="post in postUser.length > 0 ? postUser : posts"
      :key="post.id"
      class="w-96 space-y-4 p-4 bg-white border border-gray-200 shadow-xl rounded-xl hover:shadow-2xl transition-all"
    >
      <p class="text-lg font-semibold text-gray-800"><strong>Title: </strong>{{ post.title }}.</p>
      <p class="text-justify text-gray-600 font-medium"><strong>Body: </strong>{{ post.body }}.</p>
      <p class="text-center font-mono text-zinc-900">{{ user(post.userId) }}</p>
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

    const userId = ref(null);

    const searchPost = () => {
      storePosts.getPost(userId.value); 
      userId.value = ''
    };
    const validateUserId = (event) => {
      let value = Number(event.target.value);
      if(value < 1) {
        userId.value = 1
      } else if(value > 10) {
        userId.value = 10
      }
    };

    return { storePosts, posts, postUser, user, userId, searchPost, validateUserId };
  },
};
</script>
