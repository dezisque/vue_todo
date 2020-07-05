<template>
  <div id="app">
    <nav>
      <h1 class="nav_title">TODO App</h1>
      <p>Created by <a href="https://github.com/dezisque">dezisque</a></p>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  border-bottom: 2px solid black;
}
.nav_title {
  font-size: 3rem;
  margin: 1rem 0;
}
</style>
