<template>
  <div class="container py-4 text-center fw-bold ">
    <!-- Botón para abrir el formulario en modo "crear" -->
    <button class="btn btn-primary m-3 " v-on:click="mostrarFormulario('crear')">
      Agregar usuario
    </button>

    <!-- Spinner de carga mientras se obtienen los datos -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status"></div>
    </div>

    <!-- Tabla de usuarios cuando ya no se está cargando -->
    <table v-else class="table table-striped m-3  text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>UserName</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- Recorremos el array de usuarios para mostrar cada uno en una fila -->
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <!-- Botones para editar o eliminar un usuario -->
            <button class="btn btn-secondary btn-sm" v-on:click="mostrarFormulario('editar', user)">
              Editar
            </button>
            <button class="btn btn-danger btn-sm" v-on:click="eliminarUsuario(user)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Componente del formulario de usuario, se le pasa el usuario actual y el modo -->
    <UserForm
      v-bind:usuarioActivo="usuarioSeleccionado"
      v-bind:esEdicion="modo == 'editar'"
      v-on:guardar="guardarUsuario"
    />
  </div>
</template>

<script>
import axios from 'axios';
import UserForm from './UserForm.vue';

export default {
  name: 'UserTable',

  components: {
    UserForm, // Importamos el formulario como componente hijo
  },

  data() {
    return {
      users: [],                 // Array para almacenar los usuarios
      loading: true,             // Estado de carga
      modo: 'crear',             // Modo del formulario ('crear' o 'editar')
      usuarioSeleccionado: null, // Usuario que se va a editar o crear
    };
  },

  created() {
    // Al iniciar el componente, se cargan los usuarios desde la API
    this.cargarUsuarios();
  },

  methods: {
    async cargarUsuarios() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.users = response.data; // Guardamos los usuarios en el array local
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false; // Finalizamos el estado de carga
      }
    },

    mostrarFormulario(modo, usuario = null) {
      // Cambiamos el modo y establecemos el usuario que será editado o uno vacío
      this.modo = modo;
      this.usuarioSeleccionado = usuario
        ? { ...usuario } // Copia del usuario para no modificarlo directamente
        : { name: '', username: '', email: '', phone: '' };
    },

    guardarUsuario(usuario) {
      if (this.modo === 'crear') {
        // Asignamos un nuevo ID basado en el mayor ID existente
        const nuevoId = Math.max(...this.users.map(u => u.id)) + 1;
        this.users.push({ id: nuevoId, ...usuario }); // Agregamos el nuevo usuario
        alert(`Usuario ${usuario.name} agregado.`);
        console.log("Usuarios actuales:", this.users);
      } else if (this.modo === 'editar') {
        // Buscamos el usuario a editar por su ID y lo reemplazamos
        const index = this.users.findIndex(u => u.id === usuario.id);
        if (index !== -1) {
          this.users.splice(index, 1, usuario); // Reemplazamos el usuario
          alert(`Usuario ${usuario.name} actualizado.`);
        }
      }
    },

    eliminarUsuario(usuario) {
      // Mostramos una confirmación antes de eliminar
      const confirmar = confirm("¿Estás seguro de que quieres eliminar a este usuario?");
      if (confirmar) {
        // Filtramos el array de usuarios eliminando el seleccionado
        this.users = this.users.filter(u => u.id !== usuario.id);
        alert(`Usuario ${usuario.name} eliminado.`);
        console.log("Usuarios restantes:", this.users);
      }
    },
  },
};
</script>
