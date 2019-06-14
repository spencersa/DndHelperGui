<template>
  <div id="app">
    <rollable-tables></rollable-tables>
  </div>
</template>

<script>
import RollableTables from "./components/RollableTables.vue";

export default {
  name: "App",
  components: {
    "rollable-tables": RollableTables
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
  background-color: #EEE5CE;
  background-image: url("./assets/background-image.jpg");
  margin-left: 10%;
  margin-right: 10%;
}

</style>
