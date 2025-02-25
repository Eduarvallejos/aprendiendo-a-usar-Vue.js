<template>
  <div class="Home">
    <h1>Users</h1>
    <div class="Users">
      <UserList/>
    </div>
  </div>
</template>

<script>
import UserList from '@/components/UserList.vue';
export default {
  components: {
    UserList
  }
}
</script>

<style scoped>
.Home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
h1 {
  text-align: center;
}
</style>
