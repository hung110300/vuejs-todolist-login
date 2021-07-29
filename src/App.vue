<template>
  <router-view />
  <router-link class="signup" to="/login">Sign in</router-link>
  <router-link class="signup" to="/register">Sign up</router-link>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
</style>