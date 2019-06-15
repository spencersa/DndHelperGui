<template>
  <div class="rollable-table">
    <h2>{{tableName}}</h2>
    <div>
      <button class="button-accept" v-on:click="getRandomValue(tableValues)">Get Random</button>
      <button class="button-add" v-on:click="showModal()">Add Item</button>
      <transition name="fade">
        <div v-if="randomData" class="random-data top-bottom-padding">{{randomData}}</div>
      </transition>
    </div>
    <table v-if="tableValues">
      <tbody>
        <tr v-for="(value, index) in tableValues.slice(0, numberOfElementsToShow)" :key="value.id">
          <tree-view :model="value" :id="tableName" :index="index" :depth="1"></tree-view>
        </tr>
      </tbody>
    </table>
    <div v-show="tableValues.length > numberOfElementsToShow" class="top-bottom-padding">
      <button v-on:click="numberOfElementsToShow = tableValues.length">Show All</button>
    </div>

    <modal
      :table="this.table"
      :tableName="this.tableName"
      v-show="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script>
import TreeView from "./TreeView";
import DndHelperApi from "@/services/api/DndHelperApi";
import ModalVue from "./Modal.vue";

export default {
  name: "rollable-table",
  components: {
    "tree-view": TreeView,
    modal: ModalVue
  },
  props: {
    table: Object
  },
  data() {
    return {
      randomData: "",
      numberOfElementsToShow: 10,
      tableName: "",
      tableValues: [],
      isModalVisible: false
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
      this.randomData = this.getRandom(values);
    },
    getRandom: function(values) {
      var data = values[Math.floor(Math.random() * values.length)];
      if (data.children !== undefined && data.children !== null) {
        return data.name + ": " + this.getRandom(data.children);
      }
      return data.name;
    },
    showModal: function() {
      this.isModalVisible = true;
    },
    closeModal: function() {
      this.isModalVisible = false;
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
  color: #58180d;
  border-bottom: 2px solid #c9ad6a;
}

thead {
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #e0e5c1;
}

table {
  margin: 10px;
}

button {
  cursor: pointer;
  color: black;
  margin: 20px;
  display: inline-block;
  border-style: solid;
  border-image-outset: 21px 17px;
  border-image-repeat: stretch;
  border-image-source: url("../assets/buttonBoarder.png");
  border-image-slice: 150 200 150 200;
  border-image-width: 47px;
}

button:hover {
  background: #434343;
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>