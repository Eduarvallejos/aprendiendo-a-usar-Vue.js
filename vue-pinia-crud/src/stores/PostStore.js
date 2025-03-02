import axios from "axios";
import { defineStore } from "pinia";

export const usePostStore = defineStore("postStore", {
  state: () => ({
    posts: [],
    postUser: [],
    comments: [],
    commentsPost: [],
  }),
  getters: {
    getCommentsCountByPost: (state) => {
      return (postId) =>
        state.comments.filter((comment) => comment.postId == postId).length;
    },
  },
  actions: {
    async fetchPost() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        this.posts = response.data;
        console.log("Solicitud exitosa de Posts");
      } catch (error) {
        console.error("Fallo al solicitar datos de Posts", error);
      }
    },
    async fetchComments() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/comments"
        );
        this.comments = response.data;
        console.log('Solicitud exitosa de Comments')
      } catch (error) {
        console.error('Fallo al solicitar datos de Comments', error)
      }
    },
    getPost(userId) {
      const post = this.posts.filter((post) => post.userId == userId);
      this.postUser = post;
    },
    getComments(postId) {
      const comments = this.comments.filter((comm) => comm.postId == postId);
      this.commentsPost = comments;
    },
    addPost(newPost) {
      this.posts.unshift(newPost)
    },
    updatedPost(valueUpdated, postId){
      const index = this.posts.findIndex(post => post.id == postId)
      if (index !== -1) {
        this.posts[index] = { ...this.posts[index], ...valueUpdated };
      }
    }
  },
  persist: true,
});
