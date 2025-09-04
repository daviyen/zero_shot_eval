<template>
  <div id="app">
    <header>
      <Header />
    </header>
    <main>
      <InputPanel class="inputPanel" />
    </main>
  </div>
</template>
<script setup>
import Header from './components/Header.vue'
import InputPanel from './components/InputPanel.vue';
</script>

<style>
.inputPanel {
  top: 5em;
}
</style>
