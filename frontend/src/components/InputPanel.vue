<!-- This is the implementation of the input panel component -->
<template>
  <div class="input-panel">
    <RichTextEditor type="input"/>
    <el-button type="primary" id="run-button" @click="runNER">Run</el-button>
    <div class="navigate-buttons">
      <div class="file">{{ importStore.getSelectedFile ? importStore.getSelectedFile.filename : "No file selected..." }}</div>
      <el-button type="primary" @click="fileScrollingHandler('prev')">&lt;&lt;</el-button>
      <el-button type="primary" @click="fileScrollingHandler('fwd')">&gt;&gt;</el-button>
    </div>
  </div>
</template>

<script setup>
import RichTextEditor from "./RichTextEditor.vue";
import { useImportStore } from "@/stores/importStore";
import { useOutputStore } from "@/stores/outputStore";

const importStore = useImportStore();
const outputStore = useOutputStore();

/**
 * Function to call the NER API to perform a zero-shot NER.
 * TODO: Replace hardcoded API-calls with dynamic input.
 *  */
async function runNER() {
  try {
    //console.log("Running zero-shot NER for file: " + importStore.getSelectedFile);
    const response = await fetch("http://localhost:3000/api/ner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: importStore.getSelectedFile.text || "",
        labels: importStore.getSelectedFile.labels || [],
      }),
    });
    const data = await response.json();
    console.log("Data: ", data.entityList);
    outputStore.setEntityList(JSON.stringify(data.entityList) || []);
  } catch (err) {
    console.error("SOME ERROR:", err);
  }
}

function fileScrollingHandler(dir) {
  let currentFileIndex = importStore.getFileList.findIndex(file => file._id === importStore.getSelectedFile._id);
  switch(dir) {
    case "prev":
      if( currentFileIndex >= 1 && currentFileIndex < importStore.getFileList.length ) {
      importStore.setSelectedFile(importStore.getFileList[currentFileIndex - 1]);
      }
      break;
    case "fwd":
      if( currentFileIndex < importStore.getFileList.length - 1 ) {
      importStore.setSelectedFile(importStore.getFileList[currentFileIndex + 1]);
      }
      break;
  }
}

</script>

<style scoped>
.file {
  text-align: center;
  margin-right: 18vw;
}

#run-button {
  margin-top: 0.5em;
}

.navigate-buttons {
  position: absolute;
  bottom: 1em;
  right: 1em;
  display: flex;
  align-items: center;
}

.input-panel {
  width: 50vw;
  padding: 1em;
  position: relative;
}
</style>
