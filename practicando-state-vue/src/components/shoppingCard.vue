<template>
  <div class="cart-container">
    <h2>Carrito de Compras</h2>
    <div v-if="store.items.length">
      <div v-for="item in store.items" :key="item.id" class="cart-item">
        <p>{{ item.title }}</p>
        <button v-on:click="resta(item)">-</button>
        <p>{{ item.count }}</p>
        <button v-on:click="suma(item)">+</button>
        <p>Total: {{ item.price * item.count }}</p>
        <button @click="eliminarProducto(item.id)">Eliminar</button>
      </div>
      <p><strong>Precio Total:</strong> {{ store.totalPrice }}</p>
    </div>
    <div v-else>
      <p>El carrito está vacío</p>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/stores/counter";

export default {
  setup() {
    const store = useStore();
    return { store };
  },

  methods: {
    resta(item) {
      if (item.count > 0) {
        item.count--;
      }
      if(item.count === 0) {
        this.store.removeFromCart(item.id)
      }
    },
    suma(item) {
      item.count++;
    },
    eliminarProducto(productoId) {
        this.store.removeFromCart(productoId)
    }
  },
};
</script>

<style scoped>
.cart-container {
  position: fixed;
  top: 5%;
  right: 10px;
  width: 500px;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

.close-btn {
  background: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
}

.cart-item {
  display: flex;
  gap: 2rem;
  border-bottom: 2px solid #ddd;
  padding: 5px 0;
}
</style>
