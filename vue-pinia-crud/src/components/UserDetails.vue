<template>
  <div v-if="user" class="flex gap-6 bg-blue-100">
    <div class="py-8 px-3 w-1/6 bg-stone-50 space-y-2">
      <h2 class="text-3xl font-extrabold text-gray-800">{{ user.name }}</h2>
      <div class="flex justify-center p-2 m-4">
        <img
            :src="`https://avatar.iran.liara.run/public/${user.id}`"
            loading="lazy"
            class="w-40"
          />
      </div>
      <p class="text-gray-600 font-medium"><strong>E-mail: </strong>{{ user.email }}</p>
      <p class="text-gray-600 font-medium"><strong>Phone: </strong> {{ user.phone }}</p>
      <p class="text-gray-600 font-medium"><strong>Company: </strong> {{ user.company.name }}</p>
      <p class="text-gray-600 font-medium"><strong>Posts: </strong>{{ postUser.length }}</p>
      <p class="text-gray-600 font-medium"><strong>Albums: </strong>{{ albumUser.length }}</p>
    </div>
    <div class="flex flex-col my-6  mr-6 p-2 w-5/6 gap-6 ">
      <div class="flex flex-col items-center bg-stone-50 rounded-2xl shadow-md p-4 overflow-hidden space-y-4">
        <h3 class="text-xl font-bold text-gray-700">Posts of {{ user.name }}</h3>
        <div class="flex gap-8 flex-wrap justify-center m-4">
          <div v-for="post in postUser" :key="post.id" class="flex flex-col items-center w-[450px] space-y-2 bg-white shadow-lg rounded-xl p-4 border border-gray-200 hover:shadow-xl transition-all">
            <p class="text-center h-[3rem] text-lg font-semibold text-gray-800"><strong>Title: </strong>{{ post.title }}.</p>
            <p class="text-justify break-words h-[9rem] text-gray-600 font-medium">{{ post.body }}.</p>
            <router-link :to="`/PostDetails/${post.id}`">
              <button class="px-3 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">{{ getCommentsCountByPost(post.id) }} Comments</button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center bg-stone-50 rounded-2xl shadow-md p-4 overflow-hidden space-y-4">
        <h3 class="text-xl font-bold text-gray-700 ">Albums of {{ user.name }}</h3>
        <div  class="flex gap-8 flex-wrap justify-center m-4">
          <div v-for="album in albumUser" :key="album.id" class="flex flex-col items-center w-[450px] space-y-4 bg-white shadow-lg rounded-xl p-4 border border-gray-200 hover:shadow-xl transition-all">
            <p class="text-center h-[3rem] text-lg font-semibold text-gray-800"><strong>Title: </strong>{{ album.title }}.</p>
            <router-link :to="`/AlbumDetails/${album.id}`">
              <button class=" px-3 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">{{ getPhotosByAlbum(album.id) }} Photos</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-else class="text-gray-600 font-medium text-center">Loading User Data...</p>
</template>

<script>
import { useUserStore } from "@/stores/UserStore";
import { usePostStore } from "@/stores/PostStore";
import { useAlbumStore } from "@/stores/AlbumStore";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = useUserStore();
    const storePost = usePostStore();
    const storeAlbum = useAlbumStore();
    const getCommentsCountByPost = storePost.getCommentsCountByPost;
    const getPhotosByAlbum = storeAlbum.getPhotosByAlbum;
    const route = useRoute();

    const user = store.getUser(route.params.id);
    const userPost = storePost.getPost(route.params.id);
    const userAlbum = storeAlbum.getAlbum(route.params.id);

    const { postUser, commentsPost } = storeToRefs(storePost);
    const { albumUser, photosAlbum } = storeToRefs(storeAlbum);
    return {
      user: store.selectUser,
      postUser,
      commentsPost,
      albumUser,
      photosAlbum,
      getPhotosByAlbum,
      getCommentsCountByPost
    };
  },
};
</script>

