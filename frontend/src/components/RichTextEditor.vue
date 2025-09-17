<!-- Implementation of the Rich Text Editor using TipTap (https://tiptap.dev/product/editor) -->
<template>
  <div>
    <EditorContent v-if=editor :editor="editor" class="text-editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { watch } from "vue"
import { useImportStore } from "@/stores/importStore"

const importStore = useImportStore();

// Define initial props
const props = defineProps({
  content: {
    type: String,
    default: "",
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
    StarterKit,
    Placeholder.configure({
      placeholder: props.type === "input" ? "Type your text here or import from the system..." : "GLiNER output...",
    }),
  ],
  content: props.content || "",
})

/**
 * Watches for changes in the selected file from the FIle Explorer.
 * Then adjusts the input Panel accordingly.
 */
watch(() => importStore.getSelectedFile, (newFile) => {
  if( editor.value && props.type === "input") {
    editor.value.commands.setContent(newFile.text, false);
  }
})
</script>

<style>
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

p.is-empty::before {
  content: attr(data-placeholder);
  color: var(--primary-gray);
}
</style>
