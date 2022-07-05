import { defineStore } from "pinia";

export const useDialogStore = defineStore("dialog", {
  state: () => {
    return {
      login: false,
      shoppingCart: false
    };
  },
  actions: {
    switchLogin() {
      this.login = !this.login;
    },
    switchShoppingCart() {
      this.shoppingCart = !this.shoppingCart
    }
  },
});
