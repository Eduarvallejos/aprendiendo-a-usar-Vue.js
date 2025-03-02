<template>
  <div class="flex flex-col items-center justify-center h-[calc(100vh-3rem)] bg-gray-100">
    <div class="m-6">
      <h1 class="text-5xl font-extrabold text-gray-800">Users</h1>
    </div>
    <UserList />
  </div>
</template>

<script>
import UserList from "@/components/UserList.vue";
export default {
  components: {
    UserList,
  },
};
</script>
