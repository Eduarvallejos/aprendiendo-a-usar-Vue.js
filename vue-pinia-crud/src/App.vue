<template>
  <nav class="flex justify-end h-[3rem] items-center border-b-2 bg-gray-800 shadow-md px-6">
    <div class="flex gap-6 mr-6">
      <router-link to="/Photos"><p class="text-white text-lg hover:text-cyan-300 font-bold  cursor-pointer">📸 See Photos</p></router-link>
      <router-link to="/posts"><p class="text-white text-lg hover:text-cyan-300 font-bold  cursor-pointer">📝 See Posts</p></router-link>
      <router-link to="/Create-Post"
        ><p class="text-white text-lg hover:text-cyan-300 font-bold  cursor-pointer">✍️ Create/Update a Posts</p></router-link
      >
      <router-link to="/"><p class="text-white text-lg hover:text-cyan-300 font-bold  cursor-pointer">👤 Users</p></router-link>
    </div>
  </nav>
  <router-view></router-view>
</template>

