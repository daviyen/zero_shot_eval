import { defineStore } from "pinia";

export const useOutputStore = defineStore("output", {
  state: () => ({
    entityList: [],
  }),
  actions: {
    setEntityList(payload) {
      this.entityList = payload;
    }
  },
  getters: {
    getEntityList: (state) => state.entityList,
  }
});
