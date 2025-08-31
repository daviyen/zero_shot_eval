<!-- This is the implementation of the input panel component -->
<template>
  <div class="input-panel">
    <RichTextEditor />
    <button id="run-button">Run</button>
    <div class="navigate-button">
      <button>&lt;&lt;</button>
      <button>&gt;&gt;</button>
    </div>
  </div>
</template>

<script setup>
import RichTextEditor from './RichTextEditor.vue';

</script>

<style scoped>
#run-button {
  margin-top: 0.5em;
}

.navigate-button {
  position: absolute;
  bottom: 1em;
  right: 1em;
}

.input-panel {
  width: 50vw;
  padding: 1em;
  box-sizing: border-box;
  position: relative;
}
</style>
