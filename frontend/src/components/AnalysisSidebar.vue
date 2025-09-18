<!-- This is the implementation of the AnalysisSidebar component -->
<template>
  <el-aside class="analysis-sidebar">
    <!--- Entity Input section -->
    <div class="entityInput">
      <el-divider>Add Custom Entity</el-divider>
      <!--- Add user generated custom entities... -->
      <div class="customEntityControls">
        <el-input placeholder="Entity Name..." v-model="customEntity.name" style="width: 150px;" />
        <el-color-picker v-model="customEntity.color" :predefine="predefineColors" />
        <el-button type="primary" @click="addEntity" :disabled="!customEntity.name">Add</el-button>
      </div>
      <!-- Remaining dividers -->
      <el-divider>Entity List</el-divider>
      <ul>
        <li v-for="entity in entities" :key="entity.name">
          {{ entity.name }}
        </li>
      </ul>
      <el-divider>Span Analysis</el-divider>
      <el-divider>Additional(?)</el-divider>
    </div>
  </el-aside>
</template>

<script setup>
import { ref, watch } from "vue";
import { useImportStore } from "@/stores/importStore.js";
import { useOutputStore } from "@/stores/outputStore.js";

const importStore = useImportStore();
const outputStore = useOutputStore();

const customEntity = ref({
  name: "",
  color: "rgb(0, 128, 128)"
})
const entities = ref([]);
const usedColors = ref([]);

// Predefined colors for the color picker
const predefineColors = ref([
  "rgb(128, 0, 128)",
  "rgb(0, 128, 128)",
  "rgb(128, 128, 0)",
  "rgb(0, 128, 0)",
  "rgb(0, 0, 128)",
  "rgb(128, 0, 0)",
  "rgb(255, 120, 0)",
])

/**
 * Add a custom entity to the entity list.
 */
function addEntity() {
  if (customEntity.value) {
    entities.value.push({ ...customEntity.value });
    customEntity.value.name = "";
    customEntity.value.color = "rgb(0, 128, 128)";
  }
}

watch (() => importStore.getSelectedFile, (newFile) => {
  if(newFile && newFile.labels) {
    entities.value = newFile.labels.map(label => ({
      name: label,
      color: "TODO"
    }))
  }
})
</script>

<style>
.analysis-sidebar {
  position: fixed;
  top: 7em;
  right: 2em;
  bottom: 2em;
  height: 80vh;
  box-shadow: -2px 0 5px var(--el-border-color-light);
  border-radius: 6px;
  overflow-y: auto;
}

.customEntityControls {
  display: flex;
  align-items: center;
  gap: 0.5em;
  flex-wrap: wrap;
  left: 1em;
  margin-left: 1em;
}
</style>
