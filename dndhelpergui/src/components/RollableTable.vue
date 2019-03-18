<template>
  <div class="rollable-table">
    <h2>{{tableName}}</h2>
    <div>
      <button class="button-accept" v-on:click="getRandomValue(tableValues)">Get Random</button>
      <button class="button-add" v-on:click="addChild">Add Item</button>
      <div v-if="randomData" class="random-data top-bottom-padding">{{randomData}}</div>
    </div>
    <table v-if="tableValues">
      <thead>
        <tr>
          <td>
            1d{{tableValues.length}}
          </td>
          <td>
            {{tableName}}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in tableValues.slice(0, numberOfElementsToShow)" :key="value.id">
          <td style="width: 25%;">{{index + 1}}</td>
          <tree-view style="width: 75%;" :model="value" :id="tableName"></tree-view>
        </tr>
      </tbody>
    </table>
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
      tableValues: []
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
  padding-top: 10px;
  padding-bottom: 10px;
}

.rollable-table {
  border-radius: 25px;
  padding: 10px;
}

.random-data {
  margin: 10px;
  background-color: #faf7ea;
  border-style: solid;
  border-width: 7px;
  border-image: url("../assets/dataBorder.png") 12 stretch;
  border-image-outset: 4px;
  box-shadow: 0 0 6px #faf7ea;
}

h2 {
  color: #58180D;
  border-bottom: 2px solid #c9ad6a;
}

thead {
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #e0e5c1
}

table {
  margin: 10px;
}

</style>