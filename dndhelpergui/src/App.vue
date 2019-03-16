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
}

button {
  color: #fff;
  text-transform: uppercase;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  cursor: pointer;
}

.button-accept {
  background: #2506d4;
}

.button-add {
  background: #157202;
}

button:hover {
  background: #434343;
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
}
</style>
