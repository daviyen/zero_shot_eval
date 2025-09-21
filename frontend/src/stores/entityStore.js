/**
 * Pinia store for managing entity data.
 */
import { defineStore } from "pinia";
import { ref } from "vue";

export const useEntityStore = defineStore("entity", () =>{
  const entities = ref([]);
  function setEntities(payload) {
    entities.value = payload;
  }
  function removeEntity(name) {
    entities.value = entities.value.filter(e => e.name !== name);
  }
  return { entities, setEntities, removeEntity };
  }
);
