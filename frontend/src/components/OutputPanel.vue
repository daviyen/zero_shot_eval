<!-- This is the implementation of the OutputPanel component -->
<template>
  <div class="output-panel">
    <EditorContent v-if=editor :editor="editor" class="text-editor" />
      <div class="slider-wrapper">
        <el-slider v-model="similarity" style="width: 200px;" />
        <div class="slider-info">
          <span>Similarity: {{ similarity }}%</span>
          <el-tooltip :content="showGroundTruth ? 'Show GLiNER output.' : 'Show ground truth.'" placement="top">
            <el-checkbox label="Toggle Ground Truth" id="toggle-ground-truth" v-model="showGroundTruth" />
          </el-tooltip>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"
import { ref } from 'vue';

// Initialize state variables
const similarity = ref(40);
const showGroundTruth = ref(false);

const props = defineProps({
  content: {
    type: String,
    default: "<p>GLiNER output...</p>",
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
  content: props.content ? props.content : null,
})
</script>

<style scoped>
.output-panel {
  width: 50vw;
  padding: 1em;
}


.slider-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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
