<template>
  <div>
    {{table.Name}}
    <div>
      <button v-on:click="getRandomValue(table.Value)">Get Random</button>
      <div v-if="randomData" class="top-bottom-padding">
        {{randomData}}
      </div>
    </div>
    <ul v-for="value in table.Value.slice(0, numberOfElementsToShow)" :key="value.id">
      <tree-view :model="value" :id="table.Name"></tree-view>
    </ul>
    <div class="top-bottom-padding">
      <button v-on:click="numberOfElementsToShow = table.Value.count">Show All</button>
    </div>
  </div>
</template>

<script>
import TreeView from "./TreeView";

export default {
  name: "rollable-table",
  components: {
    "tree-view": TreeView
  },
  props: {
    table: Object
  },
  data() {
    return {
      randomData: "",
      numberOfElementsToShow: 10
    };
  },
  methods: {
    getTableValues(value) {
      return value;
    },
    getRandomValue: function(values) {
      this.randomData = "";
      this.randomData = this.getRandom(values);
    },
    getRandom: function(values) {
      var data = values[Math.floor(Math.random() * values.length)];
      if (data.children !== undefined && data.children !== null) {
        return data.name + ":" + this.getRandom(data.children);
      }
      return data.name;
    }
  }
};
</script>

<style scoped>
  .top-bottom-padding {
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>