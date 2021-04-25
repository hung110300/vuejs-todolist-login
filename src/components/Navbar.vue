<template>
  <nav>
    <div class="nav-link">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
nav {
  background-color: rgb(187, 223, 255);
  padding: 10px;
}

.nav-link {
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  padding: 0;
}

.nav-link a {
  text-decoration: none;
  color: rgb(32, 108, 173);
  font-size: 20px;
}
.nav-link a:hover {
  color: rgb(193, 146, 255);
}
</style>