import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
    selectUser: null,
  }),

  getters: {
    getUserNameByPost: (state) => {
      return (postUserId) => {
        const user = state.users.find((user) => user.id == postUserId)
        return user ? user.name : 'user not found'
      };
    },
  },
  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        this.users = response.data;
        console.log("Solicitud exitosa de Users");
      } catch (error) {
        console.log("Fallo al solicitar datos de Users", error);
      }
    },
    getUser(userId) {
      const user = this.users.find((user) => user.id == userId);
      this.selectUser = user;
    },
    deleteUser(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
    },
  },
  persist: true
});
