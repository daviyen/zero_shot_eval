<template>
  <div class="file-explorer">
    <el-table
      :data="importStore.getFileList"
      @row-click="rowClickHander"
      :current-row="importStore.getSelectedFile || null"
      >
      <el-table-column prop="filename" label="Filename" width="180" />
    </el-table>
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

</script>

<style scoped>
.file-explorer {
  background: var(--el-bg-color-light);
  height: 90vh;
  width: 20vw;
  overflow-y: auto;
}
</style>
