/**
 * Pinia store for managing predefined colors.
 */
import { defineStore } from "pinia";
import { ref } from "vue";

export const useColorStore = defineStore("color", () =>{
  const predefinedColors = ref([
    "rgba(128, 0, 128, 1)",
    "rgba(0, 128, 128, 1)",
    "rgba(255, 150, 0, 1)",
    "rgba(0, 128, 0, 1)",
    "rgba(100, 50, 150, 1)",
    "rgba(0, 0, 128, 1)",
    "rgba(128, 0, 0, 1)",
    "rgba(255, 120, 0, 1)",
    "rgba(0, 128, 255, 1)",
    "rgba(255, 50, 150, 1)",
    "rgba(0, 150, 50, 1)",
    "rgba(200, 0, 0, 1)",
  ]);
  return { predefinedColors };
});
