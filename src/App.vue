<template>
  <router-view />
  <div class="btn-group" role="group" aria-label="Basic outlined example">
    <router-link type="button" class="btn btn-outline-warning" to="/login"
      >Let's make your todo lists!</router-link
    >
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style scoped>
</style>