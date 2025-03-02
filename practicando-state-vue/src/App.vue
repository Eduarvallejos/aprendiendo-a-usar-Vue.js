<template>
  <div style="display: flex; justify-content: space-between">
    <h1>Productos</h1>
    <h2 class="mensaje">{{ mesage }}</h2>
    <i class="fas fa-shopping-cart" v-on:click="toggleCard">{{ cartLengt }}</i>
  </div>
  <div v-if="datos.length" class="listProducts">
    <div v-for="dato in datos" v-bind:key="dato.id" class="product">
      <img v-bind:src="dato.image" alt="" width="100px" height="100px" />
      <p>{{ dato.title }}</p>
      <p>Precio: {{ dato.price }}</p>
      <div style="display: flex; gap: 2px">
        <button v-on:click="resta(dato)" class="btn">-</button>
        <p class="btn">{{ dato.count }}</p>
        <button v-on:click="suma(dato)" class="btn">+</button>
      </div>
      <button v-on:click="agregarProducto(dato, dato.count)">
        agregar la carrito
      </button>
    </div>
  </div>
  <div v-else><p>Cargando productos...</p></div>
  <shoppingCard v-if="showCart" />
</template>
<script>
import axios from "axios";
import { useStore } from "./stores/counter";
import shoppingCard from "./components/shoppingCard.vue";

export default {
  setup() {
    const store = useStore();
    return { store };
  },

  components: {
    shoppingCard,
  },
  data() {
    return {
      datos: [],
      showCart: false,
      mesage: ''
    };
  },
  computed: {
    cartLengt() {
      return this.store.items.reduce((acc, item) => acc + item.count, 0);
    },
  },

  methods: {
    toggleCard() {
      this.showCart = !this.showCart;
      console.log("has escho click");
    },
    resta(item) {
      if (item.count > 0) {
        item.count--;
      }
    },
    suma(item) {
      item.count++;
    },
    async apiData() {
      const result = await axios.get("https://fakestoreapi.com/products");
      this.datos = result.data.map((item) => ({
        ...item,
        count: 0,
      }));
      console.log(this.datos);
    },
    agregarProducto(product, cantidad) {
      if (cantidad > 0) {
        this.store.addTocart(product, cantidad);
        product.count = 0;
        this.mesage= '!producto agregado'
        setTimeout(() => {
          this.mesage = '';
        }, 1000);
      }
    },
  },
  created() {
    this.apiData();
  },
};
</script>

<style scoped>
.listProducts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}
.product {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  width: 200px;
}
.btn {
  width: 20px;
  height: 20px;
  margin: 0;
  display: flex;
  justify-content: center;
}

.mensaje {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: green;
  padding: 10px;
  border-radius: 5px;
  animation: fadeOut 1s ease-in-out;
}

@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
