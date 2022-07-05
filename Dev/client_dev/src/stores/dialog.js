import { defineStore } from "pinia";

export const useDialogStore = defineStore("dialog", {
  state: () => {
    return {
      login: false,
      component: false,
    };
  },
  actions: {
    switchLogin() {
      this.login = !this.login;
    },
    switchComponent() {
      this.component = !this.component;
    }
  },
});
