<!-- This is the implementation of the input panel component -->
<template>
  <div class="input-panel">
    <EditorContent v-if=editor :editor="editor" class="text-editor" />
    <el-button type="primary" id="run-button" @click="runNER">Run</el-button>
    <div class="navigate-buttons">
      <div class="files">{{ importStore.getSelectedFile ? importStore.getSelectedFile.filename : "No file selected..." }}</div>
      <el-button type="primary" @click="fileScrollingHandler('prev')">&lt;&lt;</el-button>
      <el-button type="primary" @click="fileScrollingHandler('fwd')">&gt;&gt;</el-button>
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"
import { useImportStore } from "@/stores/importStore";
import { useOutputStore } from "@/stores/outputStore";
import { watch } from 'vue';

const importStore = useImportStore();
const outputStore = useOutputStore();

// Define initial props
const props = defineProps({
  content: {
    type: String,
    default: "<p>Import file(s) from the system or write something...</p>",
  },
  labels: {
    type: Array,
    default: [],
  },
  type: {
    type: String,
    default: "",
  }
})

// Initialize the editor and its placeholder
const editor = useEditor({
  extensions: [
    StarterKit
  ],
  content: props.content || "",
})

// Watch for file selection and update editor content
watch(() => importStore.getSelectedFile, (newFile) => {
  if (editor.value && newFile) {
    editor.value.commands.setContent(newFile.text, false);
  }
});
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
        text: editor.value ? editor.value.getText() : "",
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
.files {
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

.text-editor {
  border: 1px solid;
  border-radius: 6px;
  min-height: 200px;
  line-height: 0.8em;
  box-shadow: 0 2px 6px var(--el-border-color-light);
  border: 0.5px solid var(--el-border-color-light);
  line-height: 1.2em;
  color: black;
  font-family: var(--el-font-family);
  font-size: var(--el-font-size-base);
  font-weight: var(--el-font-weight-primary);
}

.ProseMirror {
  padding: 0 1em;
}

.ProseMirror:focus {
  outline: none;
}
</style>
