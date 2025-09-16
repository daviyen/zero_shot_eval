import { defineStore } from "pinia";

export const useImportStore = defineStore("import", {
  state: () => {
    return { fileList: [] }
  },
  actions: {
    setFileList(payload) {
      this.fileList = payload;
    }
  },
  getters: {
    getFileList: (state) => state.fileList
  }
})
