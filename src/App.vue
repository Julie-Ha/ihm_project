<template>
  <div id="app">
      <div id="nav" class="d-inline-flex p-2 bd-highlight">
      <router-link to="/" class="p-2">Home</router-link>
      <router-link to="/table" class="p-2">Table</router-link>
      <router-link to="/map" class="p-2">Map</router-link>
      <router-link to="/graph" class="p-2">Graph</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>


export default {
  name: "App",
 
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>