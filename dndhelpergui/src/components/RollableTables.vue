<template>
  <div>
    <h1 v-show="loading">Loading...</h1>
    <div v-for="table in tableData" :key="table.Name">
      {{table.Name}}
      <ul v-for="value in table.Value" :key="value.id">
        <tree-view :model="value"></tree-view>
      </ul>
      <hr>
    </div>
  </div>
</template>

<script>
import DndHelperApi from "@/services/api/DndHelperApi";
import TreeView from "./TreeView";

export default {
  name: "rollable-tables",
  components: {
    "tree-view": TreeView
  },
  data() {
    return {
      loading: true,
      tableData: [],
      errors: []
    };
  },
  created() {
    DndHelperApi.getAllTables()
      .then(data => {
        this.tableData = data;
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.loading = false;
      });
  },
  filters: {
    json: value => {
      return JSON.stringify(value, null, 2);
    }
  },
  methods: {
    getTableValues(value) {
      return value;
    }
  }
};
</script>

<style>
</style>
