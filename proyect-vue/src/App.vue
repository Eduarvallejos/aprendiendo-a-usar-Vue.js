<template>
  <main>
    <router-view></router-view>
  </main>
  <Footer/>
</template> 

<script>
import Footer from './components/Footer.vue';
export default {
  components: {
    Footer
  }
}
</script>
<style>

</style>  