<template>
  <div class="file-explorer">
    <el-table
      :data="importStore.getFileList"
      @row-click="rowClickHander"
      :current-row="importStore.getSelectedFile || null"
      >
      <el-table-column prop="filename" label="Filename" width="180"/>
    </el-table>
    <el-button type="danger" @click="closeFileExplorer" id="close-button" :disabled="importStore.getFileList.length === 0">
      Close
    </el-button>
  </div>
</template>

<script setup>
import { useImportStore } from "../stores/importStore.js";
const importStore = useImportStore();

/**
 * Handle row click events in the file explorer.
 * @param row - clicked row
 */
function rowClickHander(row) {
  //console.log("Row clicked: ", row);
  importStore.setSelectedFile(row);
}

/**
 * Clearing import data inside of File Explorer.
 */
function closeFileExplorer() {
  importStore.setFileList([]);
  importStore.setSelectedFile(null);
}

</script>

<style scoped>
.file-explorer {
  background: var(--el-bg-color-light);
  height: 70vh;
  width: 20vw;
  overflow-y: auto;
}

#close-button {
  top: 1em;
  right: 1em;
}
</style>
