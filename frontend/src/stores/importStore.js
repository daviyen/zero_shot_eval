/**
 * Pinia store for managing import-related state, including file list and selected file.
 */
import { defineStore } from "pinia";

export const useImportStore = defineStore("import", {
  state: () => ({
    fileList: [],
    selectedFile: null,
  }),
  actions: {
    setFileList(payload) {
      this.fileList = payload;
    },
    setSelectedFile(file) {
      this.selectedFile = file;
    },
    updateSelectedFileText(newText) {
      if (this.selectedFile) {
        this.selectedFile.text = newText;
      }
    },
  },
  getters: {
    getFileList: (state) => state.fileList,
    getSelectedFile: (state) => state.selectedFile,
  },
});
