
<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <div class="modal-close" @click="close">X</div>
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
          <p>Value to add:</p>
          <input v-model="newValue">
        </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <span>
            <button type="button" class="button add" v-on:click="addChild(newValue)">Add</button>
            <button type="button" class="button cancel" @click="close">Close</button>
          </span>
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
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-close {
  float: right;
  cursor: pointer;
}

.modal-close:hover {
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.button {
  color: #fff !important;
  text-transform: uppercase;
  padding: 15px;
  border-radius: 5px;
  display: inline-block;
  border: none;
}

.add {
  background: #60a3bc;
  float: left;
}

.cancel {
  background: #ed3330;
  float: right;
}

.button:hover {
  background: #434343;
  cursor: pointer;
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
}
</style>