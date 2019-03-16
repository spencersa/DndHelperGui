<template>
  <div class="box">
    <h1 v-show="loading">Loading...</h1>
    <div class="row" v-for="table in tableData" :key="table._id">
      <rollable-table :table="table"></rollable-table>
    </div>
  </div>
</template>

<script>
import DndHelperApi from "@/services/api/DndHelperApi";
import RollableTable from "./RollableTable";

export default {
  name: "rollable-tables",
  components: {
    "rollable-table": RollableTable
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
.box {
  display: flex;
  flex-wrap: wrap;
}

.box .row {
  flex: 1 1 25%;
  padding: 10px;
}
</style>
