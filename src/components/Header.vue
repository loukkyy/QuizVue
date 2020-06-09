<template>
  <header>
    <div id="nav">
      <router-link to="/" class="title">Quiz Vue</router-link> 
      <!-- <span class="title">Quiz Vue</span> -->
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  color: hsl(35, 100%, 85%);
  background-color: hsl(345, 63%, 49%);
  padding: 1rem;
}

#nav {
}

#nav a {
  color: inherit;
  font-weight: bold;
  text-decoration: none;
}

#nav a.router-link-exact-active {
}
.title {
    font-size: 2rem;
}
</style>
