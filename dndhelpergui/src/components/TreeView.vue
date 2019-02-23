<template>
  <li>
    <div :class="{bold: hasChildren}" @click="toggle" @dblclick="changeType">
      {{ model.name }} {{model.children ? ' - ' + model.children.length : '' }}
      <span v-if="hasChildren">[{{ open ? '-' : '+' }}]</span>
    </div>
    <ul v-show="open" v-if="hasChildren">
      <tree-view class="item" v-for="(model, index) in model.children" :key="index" :model="model"></tree-view>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
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
    },
    addChild: function() {
      var documentModel = {
        collectionName: "Test",
        documentId: this.id,
        json: this.model
      }
      DndHelperApi.upsertTable(documentModel);
    }
  }
};
</script>
