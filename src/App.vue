<template>
  <div id="app">
    <Navbar />
    <Graph />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Graph from "./components/Graph.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Graph,
  },
};
</script>
