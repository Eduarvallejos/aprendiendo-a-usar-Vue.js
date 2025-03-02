import { defineStore } from "pinia";

export const useStore = defineStore("counter", {
  state: () => ({
    items: [],
  }),
  getters: {
    totalPrice(state) {
      const total = state.items.reduce(
        (total, item) => total + item.price * item.count,
        0
      );
      return parseFloat(total.toFixed(2));
    },
  },
  actions: {
    addTocart(product, cantidad) {
      const item = this.items.find((p) => p.id === product.id);
      if (item) {
        item.count += cantidad;
      } else {
        this.items.push({ ...product, count: cantidad });
      }
    },
    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
    },
  },
});
