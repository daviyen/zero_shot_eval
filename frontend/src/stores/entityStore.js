/**
 * Pinia store for managing entity data.
 */
import { defineStore } from "pinia";
import { ref } from "vue";

export const useEntityStore = defineStore("entity", {
  state: () => ({
    entities: ref([]),
    selectedModel: "med",
    predictedEntities: ref([]),
  }),
  actions: {
    setEntities(payload) {
      this.entities = payload;
    },
    setSelectedModel(model) {
      this.selectedModel = model;
    },
    setPredictedEntities(entities) {
      this.predictedEntities = entities;
    },
    addEntity(name, color) {
      this.entities.push({ name, color });
    },
    removeEntity(name) {
      this.entities = this.entities.filter(e => e.name !== name);
    }
  },
  getters: {
    getEntities: (state) => state.entities,
    getSelectedModel: (state) => state.selectedModel,
    getPredictedEntities: (state) => state.predictedEntities,
  },
});
