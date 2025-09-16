<!-- This is the Application entry point -->
<template>
  <div id="app">
    <header>
      <Header />
    </header>
    <div class="main">
      <div class="panels">
        <InputPanel id="inputPanel" />
        <OutputPanel id="outputPanel" />
      </div>
      <FileExplorer id="fileExplorer" />
      <AnalysisSidebar />
    </div>
  </div>
</template>

<script setup>
import AnalysisSidebar from "./components/AnalysisSidebar.vue";
import Header from "./components/Header.vue";
import InputPanel from "./components/InputPanel.vue";
import OutputPanel from "./components/OutputPanel.vue";
import FileExplorer from "./components/FileExplorer.vue";
</script>

<style>
#inputPanel {
  top: 5em;
}

#outputPanel {
  margin-top: 5em;
}

#fileExplorer {
  margin-left: 5em;
  margin-top: 7em;
}

.main {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.panels {
  display: flex;
  flex-direction: column;
}
</style>
