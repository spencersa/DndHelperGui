<template>
  <div id="app">
    <img src="./assets/logo.png">
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
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
