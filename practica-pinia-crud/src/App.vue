<script setup></script>

<template>
  <nav>
    <router-link to="/Photos"><button>Ver Photos</button></router-link>
    <router-link to="/posts"><button>Ver Posts</button></router-link>
    <router-link to="/Create-Post">
      <button>Crea un post ✍️</button>
    </router-link>
    <router-link to="/"><button>Users</button></router-link>
  </nav>
  <router-view></router-view>
</template>
