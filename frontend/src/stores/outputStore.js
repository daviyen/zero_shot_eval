/**
 * Pinia store for managing output data including entity list and text.
 */
import { defineStore } from "pinia";

export const useOutputStore = defineStore("output", {
  state: () => ({
    entityList: [],
    text: "",
  }),
  actions: {
    setEntityList(payload) {
      this.entityList = payload;
    },
    setText(payload) {
      this.text = payload;
    }
  },
  getters: {
    getEntityList: (state) => state.entityList,
    getText: (state) => state.text,
  }
});
