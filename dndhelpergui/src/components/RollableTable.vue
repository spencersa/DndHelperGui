<template>
  <div>
    {{table.Name}}
    <div>
      <button v-on:click="getRandomValue(table.Value)">Get Random</button>
      <div v-if="randomData" class="top-bottom-padding">{{randomData}}</div>
    </div>
    <ul v-for="value in table.Value.slice(0, numberOfElementsToShow)" :key="value.id">
      <tree-view :model="value" :id="table.Name"></tree-view>
    </ul>
    <div v-show="table.Value.length > numberOfElementsToShow" class="top-bottom-padding">
      <button v-on:click="numberOfElementsToShow = table.Value.length">Show All</button>
    </div>
    <div v-show="table.Value.length <= numberOfElementsToShow" class="top-bottom-padding">
      <button v-on:click="addChild">Add Item</button>
    </div>
  </div>
</template>

<script>
import TreeView from "./TreeView";
import DndHelperApi from "@/services/api/DndHelperApi";

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
        return data.name + ": " + this.getRandom(data.children);
      }
      return data.name;
    },
    addChild: function() {
      var documentModel = {
        collectionName: "Test",
        documentId: this.table.Name,
        json: this.table
      };
      DndHelperApi.upsertTable(documentModel);
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