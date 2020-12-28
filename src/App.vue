<template>
  <div id="app">
    <Navbar />
    <Table />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Table from "./components/Table.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Table,
  },
 
};
</script>
