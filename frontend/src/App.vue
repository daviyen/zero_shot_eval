<template>
  <div id="app">
    <header>
      <Header />
    </header>
    <main>

      <body>
        <div class="input-panel">
          <InputPanel />
        </div>
      </body>
    </main>
  </div>
</template>
<script setup>
import Header from './components/Header.vue'
import InputPanel from './components/InputPanel.vue';
</script>

<style scoped>
.input-panel {
  width: 75%;
  padding: 1em;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
