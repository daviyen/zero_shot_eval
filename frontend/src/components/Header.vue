<!-- This is the implementation of the Header component -->
<template>
  <el-header class="header">
    <nav>
      <el-button @click="buttonEventListener('upload')" style="margin-right: 1em;">
         Upload
      </el-button>
      <el-button @click="buttonEventListener('import')" style="margin-right: 1em;">
         Import
      </el-button>
      <!-- Invisible file input which accepts JSON files and  is being triggered inside the buttonEventListener -->
      <input ref="fileInput" type="file" @change="fileInputHandler" multiple accept=".json"  id="fileInput">
    </nav>
  </el-header>
</template>

<script setup>
import { ref } from "vue"
import { checkUploadFormat } from "../scripts/formatChecker.js"

const fileInput = ref(null);
const API_URL = import.meta.env.VITE_API_URL || "";

/**
 * Handles the button click events.
 * @param event - button event
 * @returns void
 */
function buttonEventListener(event) {
  //console.log(`Button event: ${event}`)
  switch (event) {
    case "upload":
      fileInput.value.click();
      break;
    case "import":
      break
    default:
      console.warn(`Unknown event: ${event}`)
  }
}

/**
 * Handles file input event by checking for a correct format and uploads valid JSON files to the DB.
 * @param event - file(s) input
 * @returns void
 */
function fileInputHandler(event) {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    checkUploadFormat(file).then(isValid => {
      if (isValid) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target.result);
            //console.log("Uploading file to " + API_URL);
            fetch(`${API_URL}/upload`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(json),
            })
              .then(res => res.json())
              .catch(err => {
                console.error(`Upload failed: ${file.name}`, err);
              });
          } catch (err) {
            console.warn("ERROR: ", err);
          }
        };
        reader.readAsText(file);
      } else {
        console.warn(`File "${file.name}" has an invalid format. Skipping upload.`);
      }
    });
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

#fileInput {
  display: none;
}
</style>
