<template>
  <div class="rollable-table">
    <h2>{{tableName}}</h2>
    <div>
      <button class="button-accept" v-on:click="getRandomValue(tableValues)">Get Random</button>
      <button class="button-add" v-on:click="addChild">Add Item</button>
      <div v-if="randomData" class="top-bottom-padding">{{randomData}}</div>
    </div>
    <ul v-for="value in tableValues.slice(0, numberOfElementsToShow)" :key="value.id">
      <tree-view :model="value" :id="tableName"></tree-view>
    </ul>
    <div v-show="tableValues.length > numberOfElementsToShow" class="top-bottom-padding">
      <button v-on:click="numberOfElementsToShow = tableValues.length">Show All</button>
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
      numberOfElementsToShow: 10,
      tableName: "",
      tableValues: Object
    };
  },
  mounted() {
    this.tableName = Object.keys(this.table)[1];
    this.tableValues = Object.values(this.table)[1];
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
        documentId: this.table._id,
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

.rollable-table {
  border: 1px solid black;
  border-radius: 25px;
  padding: 10px;
}
</style>