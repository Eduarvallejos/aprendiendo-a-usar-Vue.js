<template>
  <div v-if="users.length" class="user">
    <div v-for="user in users" v-bind:key="user.id">
      <router-link v-bind:to="`/user/${user.id}`" class="text">
        <img :src="`https://avatar.iran.liara.run/public/${user.id}`" height="100px"/>
        {{
        user.name
      }}.</router-link>
    </div>
  </div>
  <div v-else>Loading Usuarios...</div>
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

<style scoped>
.user {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.text {
  text-decoration: none;
  margin-right: 20px;
}
</style>
