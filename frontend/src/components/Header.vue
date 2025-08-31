<!-- This is the implementation of the Header Component -->
<template>
  <header class="header">
    <nav>
      <ul>
        <li v-for="button in buttons" :key="button.text">
          <button @click="buttonEventHandler(button.event)">
            {{ button.text }}
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      buttons: [
        { text: 'Upload', event: 'upload' },
        { text: 'Import', event: 'import' },
      ]
    }
  },
  methods: {
    // Implementation of button event listener
    buttonEventHandler(event) {
      console.log(`Button event: ${event}`)
      switch (event) {
        case 'upload':
          //TODO: Implement API call logic here
          break
        case 'import':
          //TODO: Implement API call logic here
          break
        default:
          console.warn(`Unknown event: ${event}`)
      }
    },
  },
}
</script>

<style scoped>
.header {
  width: 50vw;
  padding: 1em;
  background: linear-gradient(180deg, #aee8f75e, #fdfdfd98);
  justify-content: center;
  margin: 0 auto;
  display: flex;
  border-radius: 6px;
  position: sticky;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 2em;
  padding: 0;
  margin: 0;
  align-items: center;
}

nav button {
  background: none;
  border: none;
  color: grey;
  font-size: 1em;
  cursor: pointer;
}

nav button:hover {
  color: black;
  text-decoration: underline;
  transform: translateY(-1px);
}
</style>
