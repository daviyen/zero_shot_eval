<!-- This is the Application entry point -->
<template>
  <div id="app">
    <header>
      <Header />
    </header>
    <el-main>
      <InputPanel class="inputPanel" />
      <OutputPanel class="outputPanel" />
    </el-main>
    <AnalysisSidebar />
  </div>
</template>
<script setup>
import AnalysisSidebar from './components/AnalysisSidebar.vue';
import Header from './components/Header.vue';
import InputPanel from './components/InputPanel.vue';
import OutputPanel from './components/OutputPanel.vue';
</script>

<style>
.inputPanel {
  top: 5em;
}

.outputPanel {
  margin-top: 5em;
}
</style>
