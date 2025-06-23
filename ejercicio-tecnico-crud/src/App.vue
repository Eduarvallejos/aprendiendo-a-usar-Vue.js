<template>
  <div class="container py-4 text-center fw-bold">
    <h1 class="mb-4">Gestion de usuarios</h1>
  </div>
  <UserTable />
</template>

<script>
import UserTable from './components/UserTable.vue';

export default {
  components: {
    UserTable
  },
}
</script>