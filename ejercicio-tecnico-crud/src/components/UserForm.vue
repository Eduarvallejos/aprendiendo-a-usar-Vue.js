<template>
  <!-- Modal de Bootstrap, controlado con ref y clases -->
  <div
    class="modal fade"
    id="userModal"
    ref="userModal"
    tabindex="-1"
    aria-labelledby="userModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Formulario con submit prevenido para no recargar la página -->
        <form @submit.prevent="enviarFormulario">
          <!-- Encabezado del modal -->
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">
              <!-- Título dinámico según si es edición o creación -->
              {{ esEdicion ? "Editar Usuario" : "Agregar Usuario" }}
            </h5>
            <!-- Botón para cerrar el modal -->
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            ></button>
          </div>

          <!-- Cuerpo del modal con campos de formulario -->
          <div class="modal-body">
            <!-- Campo Nombre -->
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                id="name"
                class="form-control"
                v-model="usuario.name"
                required
              />
            </div>

            <!-- Campo Username -->
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                id="username"
                class="form-control"
                v-model="usuario.username"
                required
              />
            </div>

            <!-- Campo Email -->
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                v-model="usuario.email"
                required
              />
            </div>

            <!-- Campo Teléfono -->
            <div class="mb-3">
              <label for="phone" class="form-label">Phone</label>
              <input
                type="tel"
                id="phone"
                class="form-control"
                v-model="usuario.phone"
                required
              />
            </div>
          </div>

          <!-- Pie del modal con botones -->
          <div class="modal-footer">
            <!-- Botón para cerrar sin guardar -->
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>

            <!-- Botón para guardar (crear o actualizar) -->
            <button type="submit" class="btn btn-primary">
              {{ esEdicion ? "Actualizar" : "Agregar" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// Importamos Bootstrap para usar el modal
import * as bootstrap from "bootstrap";

export default {
  name: "UserForm",

  // Props que recibe desde el componente padre
  props: {
    usuarioActivo: {
      type: Object,
      default: () => ({
        name: "",
        username: "",
        email: "",
        phone: "",
      }),
    },
    esEdicion: Boolean, // Indica si es edición o creación
  },

  data() {
    return {
      usuario: { ...this.usuarioActivo }, // Copia del usuario recibido para no modificar directamente el prop
    };
  },

  // Observador: detecta cambios en el usuarioActivo (cuando se abre el formulario)
  watch: {
    usuarioActivo(newVal) {
      this.usuario = { ...newVal }; // Se hace copia nueva al detectar cambio
      this.$nextTick(() => {
        this.mostrarModal(); // Se muestra el modal cuando el dato cambia
      });
    },
  },

  methods: {
    // Método para mostrar el modal usando Bootstrap
    mostrarModal() {
      const modal = new bootstrap.Modal(this.$refs.userModal);
      modal.show();
    },

    // Método para validar y enviar el formulario
    enviarFormulario() {
      // Validación sencilla de email usando RegExp
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.usuario.email);
      if (!emailValido) {
        alert("Por favor, ingrese un email válido.");
        return;
      }

      // Emitimos el evento al componente padre con el usuario como payload
      this.$emit("guardar", this.usuario);

      // Cerramos el modal luego de guardar
      const modal = bootstrap.Modal.getInstance(this.$refs.userModal);
      modal.hide();
    },
  },
};
</script>
