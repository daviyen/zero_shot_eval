<!-- This is the implementation of the OutputPanel component -->
<template>
  <div class="output-panel">
    <EditorContent v-if=editor :editor="editor" class="text-editor" />
      <div class="slider-wrapper">
        <el-slider v-model="similarity" style="width: 200px;" />
        <div class="slider-info">
          <span>Similarity: {{ similarity }}%</span>
          <!--- Commented out for now, implement later if helpful for evaluation...
          <el-tooltip :content="showGroundTruth ? 'Show GLiNER output.' : 'Show ground truth.'" placement="top">
            <el-checkbox label="Toggle Ground Truth" id="toggle-ground-truth" v-model="showGroundTruth" />
          </el-tooltip>
           --->
        </div>
      </div>
    </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"
import { ref } from 'vue';
import { useOutputStore } from "@/stores/outputStore";
import { watch } from 'vue';
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { useEntityStore } from "@/stores/entityStore";

// Initialize state variables
const similarity = ref(40);
const outputStore = useOutputStore();
const entityStore = useEntityStore();

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
    StarterKit,
    TextStyle,
    Color
  ],
  content: props.content ? props.content : null,
})

/**
 * Watch for changes in the output text and entity list to update the editor content and highlight entities.
 * @param newText - new text content
 * @param newEntityList - new entity JSON list
 */
watch(() => outputStore.getText, (newText) => {
  if (editor.value && newText) {
    editor.value.commands.setContent(newText);
    editor.value.commands.unsetColor();

    const entitiesAsValidJSON = JSON.parse(outputStore.getEntityList);
    console.log("Entities as valid JSON: ", entitiesAsValidJSON);
    for (const entity of entitiesAsValidJSON) {
      const baseColor = entityStore.entities.find( e => e.name.toLowerCase() === entity.label.toLowerCase())?.color || "rgb(0, 0, 0)";
      //console.log("BaseColor: " + baseColor  + " for entity: " + entity.label + " with score: " + entity.score + " and text from: " + entity.start + " to: " + entity.end);
      editor.value.commands.setTextSelection({ from: entity.start + 1, to: entity.end + 1 });
      // TODO: MAYBE ADJUST ALPHA VALUE TO SIMILARITY VALUE LATER (TOOK TOO LONG)
      editor.value.commands.setColor(baseColor);
    }
  }
});
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

</style>
