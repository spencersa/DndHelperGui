
<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <button type="button" class="btn-close" @click="close">x</button>
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
          <p>Value to add:</p>
          {{table}}
          {{tableName}}
          <input v-model="newValue">
        </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button type="button" class v-on:click="addChild(newValue)">Add</button>
          <button type="button" class @click="close">Close</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
import DndHelperApi from "@/services/api/DndHelperApi";

export default {
  name: "modal",
  props: {
    newValue: Object,
    table: Object,
    tableName: String
  },
  methods: {
    close() {
      this.$emit("close");
    },
    addChild: function(newValue) {
      this.table[this.tableName].push({ name: newValue });
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

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>