<!-- This is the implementation of the input panel component -->
<template>
  <div class="output-panel">
    <RichTextEditor />
    <button id="run-button">Save</button>
    <div class="slider-container">
      <input type="range" min="1" max="100" v-model="similarity" id="similarity-slider" />
      <span>Similarity: {{ similarity }}%</span>
    </div>
    <button id="export-button">Export</button>
  </div>
</template>

<script setup>
import RichTextEditor from './RichTextEditor.vue';
import { ref } from 'vue';

const similarity = ref(40);

</script>

<style scoped>
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
