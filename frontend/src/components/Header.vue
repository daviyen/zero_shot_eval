<!-- This is the implementation of the Header component -->
<template>
  <el-header class="header">
    <nav>
      <el-button v-for="(button, index) in buttons" :key="index" @click="buttonEventListener(button.event)"
        style="margin-right: 1em;">
        {{ button.text }}
      </el-button>
    </nav>
  </el-header>
</template>

<script setup>
import { ref } from "vue"

// Initialize state variables. More Buttons can be added here.
const buttons = ref([
  { text: "Upload", event: "upload" },
  { text: "Import", event: "import" },
])

// Implementation of Button event listener
function buttonEventListener(event) {
  console.log(`Button event: ${event}`)
  switch (event) {
    case "upload":
      //TODO: Implement API call logic here
      break
    case "import":
      //TODO: Implement API call logic here
      break
    default:
      console.warn(`Unknown event: ${event}`)
  }
}
</script>

<style scoped>
.header {
  width: 50vw;
  padding: 1em;
  background: linear-gradient(180deg, var(--primary-blue), #fdfdfd9d);
  justify-content: center;
  margin: 0 auto;
  display: flex;
  border-radius: 6px;
}
</style>
