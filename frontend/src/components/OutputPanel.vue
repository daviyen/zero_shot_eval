<!-- This is the implementation of the OutputPanel component -->
<template>
  <div class="output-panel">
    <RichTextEditor />
    <div class="action-bar">
      <el-button type="primary" id="run-button">Save</el-button>
      <div class="slider-wrapper">
        <el-slider v-model="similarity" style="width: 200px;" />
        <div class="slider-info">
          <span>Similarity: {{ similarity }}%</span>
          <el-tooltip :content="showGroundTruth ? 'Show GLiNER output.' : 'Show ground truth.'" placement="top">
            <el-checkbox label="Toggle Ground Truth" id="toggle-ground-truth" v-model="showGroundTruth" />
          </el-tooltip>
        </div>
      </div>
      <el-button type="primary" id="export-button">Export</el-button>
    </div>
  </div>
</template>

<script setup>
import RichTextEditor from './RichTextEditor.vue';
import { ref } from 'vue';

// Initialize state variables
const similarity = ref(40);
const showGroundTruth = ref(false);

</script>

<style scoped>
.output-panel {
  width: 50vw;
  padding: 1em;
}

.action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0em;
  gap: 1em;
}

.slider-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

#export-button,
#run-button {
  margin-top: -2em;
}

.slider-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

span {
  color: var(--el-text-color-secondary);
  font-family: var(--el-font-family);
  font-size: var(--el-font-size-base);
  font-weight: var(--el-font-weight-primary);
}

::v-deep(.el-checkbox__label) {
  color: var(--el-text-color-secondary);
  font-family: var(--el-font-family);
  font-size: var(--el-font-size-base);
  font-weight: var(--el-font-weight-primary);
}
</style>
