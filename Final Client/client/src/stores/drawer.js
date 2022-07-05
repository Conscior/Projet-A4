import { defineStore } from "pinia";

export const useDrawerStore = defineStore("drawer", {
  state: () => {
    return {
      rightDrawerOpen: false,
    };
  },
  actions: {
    switch() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    }
  },
});
