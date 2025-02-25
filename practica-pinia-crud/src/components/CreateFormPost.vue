<template>
  <form v-on:submit.prevent="createPost">
    <label>Titulo:</label>
    <input v-model="title" type="text" required />
    <label>Contenido:</label>
    <textarea v-model="body" required> </textarea>
    <label>Id de usuario</label>
    <input v-model.number="userId" type="number" required />
    <button type="submit">Crear post</button>
  </form>
</template>

<script>
import axios from "axios";
import { usePostStore } from "@/stores/PostStore";

export default {
    setup() {
        const storePost = usePostStore();
        return {storePost}
    },

  data() {
    return {
      title: "",
      body: "",
      userId: null,
    };
  },

  methods: {
    async createPost() {
      const newPost = {
        title: this.title,
        body: this.body,
        userId: this.userId,
      };
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          newPost
        );
        console.log("Post Creado:", response.data);
        alert("Post creado correctamente");
        this.storePost.addPost(response.data)

        this.title = '',
        this.body = '',
        this.userId = null
      } catch (error) {
        console.error("Error al crear post:", error);
      }
    },
  },
};
</script>
