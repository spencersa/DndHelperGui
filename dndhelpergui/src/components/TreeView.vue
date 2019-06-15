<template>
  <div>
    <span>
      <div :class="{item: hasChildren}" @click="toggle" @dblclick="changeType">
        {{ index + 1 + " - " + model.name }} {{model.children ? ' - 1d' + model.children.length : '' }}
        <span
          class="item"
          v-if="hasChildren"
        >[{{ open ? '-' : '+' }}]</span>
      </div>
    </span>
    <div v-show="open" v-if="hasChildren">
      <tree-view
        v-for="(model, index) in model.children"
        :key="index"
        :model="model"
        :index="index"
        :depth="depth + 1"
        :style="indent"
      ></tree-view>
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
    id: String,
    index: Number,
    depth: Number
  },
  data: function() {
    return {
      open: false
    };
  },
  computed: {
    hasChildren: function() {
      return this.model.children && this.model.children.length;
    },
    indent: function() {
      return { transform: `translate(${this.depth * 30}px)` };
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
  }
};
</script>

<style scoped>
.item {
  cursor: pointer;
  font-weight: bold;
}
</style>
