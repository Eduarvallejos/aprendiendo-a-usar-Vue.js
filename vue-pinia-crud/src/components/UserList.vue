<template>
  <div v-if="users.length" class="flex gap-6 flex-wrap justify-center mt-6">
    <div v-for="user in users" :key="user.id" class="flex justify-center w-48">
      <router-link :to="`/user/${user.id}`" class="flex flex-col items-center bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all w-full">
        <img
          :src="`https://avatar.iran.liara.run/public/${user.id}`"
          loading="lazy"
          class="w-24"
        />
        <p class="text-lg font-semibold text-gray-800 mt-2 text-center">{{ user.name }}.</p>
        <p class="font-bold text-gray-600">
          <strong>User {{ user.id }}</strong>
        </p>
      </router-link>
    </div>
  </div>
  <div v-else class="text-gray-600 font-medium text-center mt-6">Loading Usuarios...</div>
</template>

<script>
import { useUserStore } from "@/stores/UserStore";
import { usePostStore } from "@/stores/PostStore";
import { useAlbumStore } from "@/stores/AlbumStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

export default {
  setup() {
    const store = useUserStore();
    const storePost = usePostStore();
    const storeAlbum = useAlbumStore();

    onMounted(() => {
      store.fetchUsers(),
        storePost.fetchPost(),
        storePost.fetchComments(),
        storeAlbum.fetchAlbum(),
        storeAlbum.fetchPhotos();
    });

    const { users } = storeToRefs(store);
    return { users, deleteUser: store.deleteUser };
  },
};
</script>
