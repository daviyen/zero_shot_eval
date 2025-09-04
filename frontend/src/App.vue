<template>
  <div id="app">
    <header>
      <Header />
    </header>
    <main>
      <InputPanel class="inputPanel" />
      <OutputPanel class="outputPanel" />
    </main>
  </div>
</template>
<script setup>
import Header from './components/Header.vue'
import InputPanel from './components/InputPanel.vue';
import OutputPanel from './components/OutputPanel.vue';
</script>

<style>
.inputPanel {
  top: 5em;
}

.outputPanel {
  top: 5em;
}
</style>
