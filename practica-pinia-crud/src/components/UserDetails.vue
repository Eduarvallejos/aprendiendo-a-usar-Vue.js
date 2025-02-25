<template>
  <div v-if="user" class="userDetails">
    <div class="user">
      <h2>{{ user.name }}</h2>
      <p><strong>Email:</strong>{{ user.email }}</p>
      <p><strong>Telefono:</strong> {{ user.phone }}</p>
      <p><strong>Empresa:</strong> {{ user.company.name }}</p>
      <p><strong>Posts: </strong>{{ postUser.length }}</p>
      <p><strong>Albums: </strong>{{ albumUser.length }}</p>
    </div>
    <div>
      <div>
        <h3>Posts of {{ user.name }}</h3>
        <div class="posts">
          <div v-for="post in postUser" v-bind:key="post.id" class="post">
            <p><strong>Title: </strong>{{ post.title }}.</p>
            <p>{{ post.body }}.</p>
            <router-link v-bind:to="`/PostDetails/${post.id}`" class="text">
              <button>{{ getCommentsCountByPost(post.id) }} Comments</button>
            </router-link>
          </div>
        </div>
      </div>
      <div>
        <h3>Albums de {{ user.name }}</h3>
        <div class="albums">
          <div v-for="album in albumUser" v-bind:key="album.id" class="album">
            <p><strong>Albums Title: </strong>{{ album.title }}.</p>
            <router-link v-bind:to="`/AlbumDetails/${album.id}`" class="text">
              <button>{{ getPhotosByAlbum(album.id) }} Photos</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-else>Loading User Data...</p>
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

<style scoped>
.userDetails {
  display: grid;
  grid-template-columns: 300px auto;
  gap: 1rem;
}
.user {
  border: 1px solid black;
  padding: 10px;
  height: 250px;
  width: auto;
}
h3 {
  text-align: center;
}
.posts,
.albums {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 0;
  justify-content: space-around;
}
.post,
.album {
  width: 300px;
  height: auto;
  border: 1px solid black;
  padding: 10px;
  text-align: justify;
  align-content: center;
}
.text {
  text-decoration: none;
  color: black;
  text-align: center;
}
</style>
