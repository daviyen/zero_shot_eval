<!-- Implementation of the Rich Text Editor using TipTap (https://tiptap.dev/product/editor) -->
<template>
  <div>
    <editor-content :editor="editor" class="text-editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

// Define initial props
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  labels: {
    type: Array,
    default: () => [],
  },
})

// Initialize the editor and its placeholder
const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: 'Raw user input or import something from the system...',
    }),
  ],
  content: props.content || '',
})

</script>

<style>
.text-editor {
  border: 1px solid;
  border-radius: 6px;
  min-height: 200px;
  line-height: 0.8em;
  box-shadow: 0 2px 6px #bbbbbb;
  border: 0.5px solid var(--primary-blue);
  line-height: 1.2em;
  color: black;
}

.ProseMirror:focus {
  outline: none;
}

p.is-empty::before {
  content: attr(data-placeholder);
  color: var(--primary-gray);
}
</style>
