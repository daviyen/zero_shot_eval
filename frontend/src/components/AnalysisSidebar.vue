<!-- This is the implementation of the AnalysisSidebar component -->
<template>
  <el-aside class="analysis-sidebar">
    <!--- Entity Input section -->
    <div class="entityInput">
      <el-divider>Add Custom Entity</el-divider>
      <!--- Add user generated custom entities... -->
      <div class="customEntityControls">
        <el-input placeholder="Entity Name..." v-model="customEntity.name" style="width: 150px;" />
        <el-color-picker v-model="customEntity.color" :predefine="colorStore.predefinedColors" />
        <el-button type="primary" @click="addEntity" :disabled="!customEntity.name">Add</el-button>
      </div>
      <!-- Remaining dividers -->
      <el-divider>Entity List</el-divider>
      <ul>
        <li v-for="entity in entityStore.entities" :key="entity.name" :style="{ color: entity.color }">
          {{ entity.name }}
        </li>
      </ul>
      <el-divider>Span Analysis</el-divider>
      <el-divider>Additional</el-divider>
    </div>
  </el-aside>
</template>

<script setup>
import { ref, watch } from "vue";
import { useImportStore } from "@/stores/importStore.js";
import { useColorStore } from "@/stores/colorStore.js";
import { useEntityStore } from "@/stores/entityStore.js";

const importStore = useImportStore();
const colorStore = useColorStore();
const entityStore = useEntityStore();

const customEntity = ref({
  name: "",
  color: colorStore.predefinedColors[8]
})

/**
 * Add a custom entity to the entity list.
 */
function addEntity() {
  if (customEntity.value && customEntity.value.name) {
    entityStore.entities.push({
      name: customEntity.value.name,
      color: customEntity.value.color
    });
    if (importStore.getSelectedFile) {
      importStore.getSelectedFile.labels.push(customEntity.value.name);
    }

    customEntity.value.name = "";
    customEntity.value.color = colorStore.predefinedColors[8];
    console.log("Custom entity added." + JSON.stringify(entityStore.entities));
  }
}

/**
 * Watch for changes in the selected file and update the entity list accordingly.
 */
watch(() => importStore.getSelectedFile, (newFile) => {
  if (newFile && newFile.labels) {
    entityStore.setEntities(newFile.labels.map((label, idx) => ({
      name: label,
      color: colorStore.predefinedColors[idx % colorStore.predefinedColors.length]
    })));
  }
});
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

ul {
  list-style-type: none;
  padding-left: 2em;
}

li {
  padding-top: 0.5em;
  color: black;
  font-family: var(--el-font-family);
  font-size: var(--el-font-size-base);
  font-weight: var(--el-font-weight-primary);
}
</style>
