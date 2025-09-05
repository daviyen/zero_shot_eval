<!-- This is the implementation of the output panel component -->
<template>
  <div class="output-panel">
    <RichTextEditor />
    <el-button type="primary" id="run-button">Save</el-button>
    <div class="slider-container">
      <el-slider v-model="similarity" id="similarity-slider" />
      <span>Similarity: {{ similarity }}%</span>
      <input type="checkbox" id="toggle-ground-truth" v-model="showGroundTruth"
        :title="showGroundTruth ? 'Show GLiNER output.' : 'Show ground truth.'" />
    </div>
    <el-button type="primary" id="export-button">Export</el-button>
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
  box-sizing: border-box;
  position: relative;
}

#run-button {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

#export-button {
  position: absolute;
  bottom: -1.5em;
  right: 1em;
}

.slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  margin: 1em 0;
  flex-wrap: nowrap;
  width: 100%;
  overflow: hidden;
}


#similarity-slider {
  width: 200px;
  min-width: 150px;
  flex-shrink: 0;
}


#toggle-ground-truth {
  accent-color: var(--primary-blue);
  flex-shrink: 0;
  margin-left: 0.5em;
}
</style>
