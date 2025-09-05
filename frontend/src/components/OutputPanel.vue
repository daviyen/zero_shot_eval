<!-- This is the implementation of the output panel component -->
<template>
  <div class="output-panel">
    <RichTextEditor />
    <button id="run-button">Save</button>
    <div class="slider-container">
      <input type="range" min="1" max="100" v-model="similarity" id="similarity-slider" />
      <span>Similarity: {{ similarity }}%</span>
      <input type="checkbox" id="toggle-ground-truth" v-model="showGroundTruth"
        :title="showGroundTruth ? 'Show GLiNER output.' : 'Show ground truth.'" />
    </div>
    <button id="export-button">Export</button>
  </div>
</template>

<script setup>
import RichTextEditor from './RichTextEditor.vue';
import { ref } from 'vue';

// Initialize state references
const similarity = ref(40);
const showGroundTruth = ref(false);

</script>

<style scoped>
#toggle-ground-truth {
  accent-color: var(--primary-blue);
  margin-left: 1em;
  display: block;
  position: relative;
}

#similarity-slider {
  accent-color: var(--primary-blue);
}

#run-button {
  margin-top: 0.5em;
}

#export-button {
  position: absolute;
  bottom: -1.5em;
  right: 1em;
}

.slider-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -2em
}

.output-panel {
  width: 50vw;
  padding: 1em;
  box-sizing: border-box;
  position: relative;
}
</style>
