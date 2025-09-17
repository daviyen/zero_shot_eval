<!-- This is the implementation of the input panel component -->
<template>
  <div class="input-panel">
    <RichTextEditor type="input"/>
    <el-button type="primary" id="run-button" @click="runNER">Run</el-button>
    <div class="navigate-buttons">
      <el-button type="primary">&lt;&lt;</el-button>
      <el-button type="primary">&gt;&gt;</el-button>
    </div>
  </div>
</template>

<script setup>
import RichTextEditor from "./RichTextEditor.vue";
import { useImportStore } from "../stores/importStore.js";
/**
 * Function to call the NER API to perform a zero-shot NER.
 * TODO: Replace hardcoded API-calls with dynamic input.
 *  */
async function runNER() {
  try {
    const response = await fetch("http://localhost:3000/api/ner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // changes here
        text: "Hans Peter lives in Berlin and works for Deutsche Bahn.",
        labels: ["Person", "Location"]
      }),
    });
    if (!response.ok) {
      const error = await response.text();
      console.error("Request failed. ERROR:", error);
      return;
    }
    const data = await response.json();
    console.log("Entities:", data.entities);
  } catch (err) {
    console.error("SOME ERROR:", err);
  }
}

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
