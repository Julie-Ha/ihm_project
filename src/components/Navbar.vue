<template>
  <div id="app">
      <div id="nav" class="d-inline-flex p-2 bd-highlight">
      <router-link to="/table" class="p-2">Tableau</router-link>
      <router-link to="/map" class="p-2">Carte</router-link>
      <router-link to="/graph" class="p-2">Graphes</router-link>
      <router-link to="/about" class="p-2">A propos</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>


export default {
  name: "Navbar",
 
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
