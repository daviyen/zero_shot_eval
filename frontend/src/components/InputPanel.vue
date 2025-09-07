<!-- This is the implementation of the input panel component -->
<template>
  <div class="input-panel">
    <RichTextEditor />
    <el-button type="primary" id="run-button">Run</el-button>
    <div class="navigate-buttons">
      <el-button type="primary">&lt;&lt;</el-button>
      <el-button type="primary">&gt;&gt;</el-button>
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

.navigate-buttons {
  position: absolute;
  bottom: 1em;
  right: 1em;
}

.input-panel {
  width: 50vw;
  padding: 1em;
  position: relative;
}
</style>
