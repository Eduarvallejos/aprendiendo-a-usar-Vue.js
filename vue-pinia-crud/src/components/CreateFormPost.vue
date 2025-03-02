<template>
  <h2 class="text-3xl font-extrabold text-gray-800 text-center p-4">
    {{ isEditing ? "Update Post" : "Create a Post" }}
  </h2>
  <div class="flex justify-center">
    <button
      v-on:click="toggleFrom"
      class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all mb-6"
    >
      {{ isEditing ? "Go Create a Post" : "Go To Update a Post" }}
    </button>
  </div>
  <div class="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
    <form v-show="!isEditing" @submit.prevent="createPost" class="space-y-4">
      <div>
        <label class="font-semibold text-gray-700">Title:</label>
        <input
          v-model="title"
          type="text"
          required
          class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring focus:ring-blue-300 outline-none"
        />
      </div>
      <div>
        <label class="font-semibold text-gray-700">Content:</label>
        <textarea
          v-model="body"
          required
          class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring focus:ring-blue-300 outline-none"
        >
        </textarea>
      </div>
      <div>
        <label class="font-semibold text-gray-700">User Id:</label>
        <input
          v-model.number="userId"
          type="number"
          placeholder="enter user id (1 - 10)"
          required
          min="1"
          max="10"
          @input="validateUserId"
          class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring focus:ring-blue-300 outline-none"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
      >
        Create Post
      </button>
    </form>

    <form
      v-show="isEditing"
      v-on:submit.prevent="updatedPost"
      class="space-y-4"
    >
      <div>
        <label class="font-semibold text-gray-700">Select Post: </label>
        <select
          v-model="selectedPostid"
          @change="loadPost"
          class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring focus:ring-blue-300 ountline-none"
        >
          <option
            v-for="post in storePost.posts"
            :key="post.id"
            :value="post.id"
          >
            {{ post.title }}
          </option>
        </select>
      </div>
      <div>
        <label class="text-semibold text-gray-700">Title: </label>
        <input
          v-model="title"
          type="text"
          required
          class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring focus:ring-blue-300 outline-none"
        />
      </div>
      <div>
        <label class="text-semibold text-gray-700">Contento: </label>
        <textarea
          v-model="body"
          type="text"
          rows="5"
          required
          class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring focus:ring-blue-300 outline-none"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all"
      >
        Update
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { usePostStore } from "@/stores/PostStore";
import { ref } from "vue";

export default {
  setup() {
    const storePost = usePostStore();
    const isEditing = ref(false);
    const selectedPostid = ref(null);
    const title = ref("");
    const body = ref("");
    const userId = ref(null);

    const toggleFrom = () => {
      isEditing.value = !isEditing.value;
      resetFrom();
    };

    const loadPost = () => {
      const post = storePost.posts.find((p) => p.id == selectedPostid.value);
      if (post) {
        title.value = post.title;
        body.value = post.body;
      }
    };

    const createPost = async () => {
      const newPost = {
        title: title.value,
        body: body.value,
        userId: userId.value,
      };
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          newPost
        );
        alert("Post creado correctamente");
        storePost.addPost(response.data);
        resetFrom();
      } catch (error) {
        console.error("Error al actualizar Post", error);
      }
    };

    const updatedPost = async () => {
      const valueUpdated = { title: title.value, body: body.value };
      try {
        const response = await axios.patch(
          `https://jsonplaceholder.typicode.com/posts/${selectedPostid.value}`,
          valueUpdated
        );
        alert("post Actualizado con exito");
        storePost.updatedPost(response.data, selectedPostid.value);
        console.log(response.data);
        resetFrom();
      } catch (error) {
        console.error("Error al actualizar Post", error);
      }
    };

    const validateUserId = (event) => {
      let value = Number(event.target.value);
      if(value < 1) {
        userId.value = 1
      } else if(value > 10) {
        userId.value = 10
      }
    };

    const resetFrom = () => {
      title.value = "";
      body.value = "";
      userId.value = null;
      selectedPostid.value = null;
    };

    return {
      storePost,
      isEditing,
      selectedPostid,
      title,
      body,
      userId,
      loadPost,
      toggleFrom,
      createPost,
      updatedPost,
      validateUserId
    };
  },
};
</script>
