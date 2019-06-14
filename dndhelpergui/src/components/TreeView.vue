<template>
  <div>
    <div :class="{item: hasChildren}" @click="toggle" @dblclick="changeType">
      {{ model.name }} {{model.children ? ' - 1d' + model.children.length : '' }}
      <span
        class="item"
        v-if="hasChildren"
      >[{{ open ? '-' : '+' }}]</span>
    </div>
    <div v-show="open" v-if="hasChildren">
      <tree-view v-for="(model, index) in model.children" :key="index" :model="model"></tree-view>
    </div>
  </div>
</template>

<script>
import TreeView from "./TreeView";
import DndHelperApi from "@/services/api/DndHelperApi";

export default {
  name: "tree-view",
  props: {
    model: Object,
    id: String
  },
  data: function() {
    return {
      open: false
    };
  },
  computed: {
    hasChildren: function() {
      return this.model.children && this.model.children.length;
    }
  },
  methods: {
    toggle: function() {
      if (this.hasChildren) {
        this.open = !this.open;
      }
    },
    changeType: function() {
      if (!this.hasChildren) {
        Vue.set(this.model, "children", []);
        this.addChild();
        this.open = true;
      }
    }
    // addChild: function() {
    //   var uploadJson = this.model;
    //   console.log(uploadJson);
    //   var documentModel = {
    //     collectionName: "Test",
    //     documentId: this.id,
    //     json: this.model
    //   };
    //   DndHelperApi.upsertTable(documentModel);
    // }
  }
};
</script>

<style scoped>
.item {
  cursor: pointer;
  font-weight: bold;
}
</style>
