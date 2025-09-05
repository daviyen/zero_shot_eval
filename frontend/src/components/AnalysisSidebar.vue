<!-- This is the implementation of the Analysis Sidebar component -->
<template>
  <aside class="analysisSidebar">
    <!--- Entity Input section -->
    <div class="entityInput">
      <h3>Add Custom Entity</h3>
      <input type="text" placeholder="Entity Name" v-model="customEntity.name" />
      <el-color-picker v-model="customEntity.color" :predefine="predefineColors" />
      <el-button type="primary" @click="addEntity" :disabled="!customEntity.name.trim()">Add</el-button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const customEntity = ref({
  name: '',
  color: 'rgb(0, 128, 128)'
})
const entities = ref([]); // Move this to a pinia store
const predefineColors = ref([
  'rgb(128, 0, 128)',
  'rgb(0, 128, 128)',
  'rgb(128, 128, 0)',
  'rgb(0, 128, 0)',
  'rgb(0, 0, 128)',
  'rgb(128, 0, 0)',
  'rgb(255, 120, 0)',
])

function addEntity() {
  if (customEntity.value.trim()) {
    entities.value.push({ ...customEntity.value });
    customEntity.value.name = '';
    customEntity.value.color = 'rgb(0, 128, 128)';
  }
}
</script>

<style>
.analysisSidebar {
  position: fixed;
  top: 7em;
  right: 2em;
  bottom: 2em;
  width: 60vh;
  height: 70vh;
  box-shadow: -2px 0 5px #9c9c9c;
  border-radius: 6px;
  overflow-y: auto;
}
</style>
