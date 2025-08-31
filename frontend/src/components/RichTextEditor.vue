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
  width: 100%;
  line-height: 0.8em;
  box-shadow: 0 2px 6px #bbbbbb;
  border: 0.5px solid #ffffff;
  transition: all 0.25s ease;
  line-height: 1.2em;
  color: black;
}

.ProseMirror:focus {
  outline: none;
  border: none;
  box-shadow: none;
}

p.is-empty::before {
  content: attr(data-placeholder);
  color: gray;
}
</style>
