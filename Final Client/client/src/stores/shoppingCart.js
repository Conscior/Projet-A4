import { defineStore } from "pinia";
import { Cookies } from "quasar";
import OrderService from "../services/Order";

export const useShoppingCartStore = defineStore("shoppingCart", {
  state: () => {
    return {
      articles: [],
      pricing: {},
      restorer_details: {},
    };
  },
  actions: {
    addArticle(article) {
      console.log(article);
      // this.updateRestorerDetails(article.restorer_details);
      let new_article = {
        article_name: article.name,
        restorer_name: article.restorer_details.name,
        price: article.price,
        quantity: article.quantity,
        total: article.total,
      };
      // delete new_article.name
      this.articles.push(new_article);
      this.restorer_details = article.restorer_details;
    },
    updatePricing() {
      let total = 0;
      this.articles.forEach((article) => {
        let line_total = article.price * article.quantity;
        article.total = line_total; // Total of each line in an order
        total += line_total; // Total of the order
      });
      this.pricing.total = total;
      this.pricing.service_fees = 100;
      this.pricing.delivery_fee = 150;
      this.pricing.total_ttc = total + 100 + 150;
    },
    // updateRestorerDetails(restorer_details) {
    //   console.log(restorer_details)
    //   if (Object.entries(this.restorer_details).length === 0) {
    //     this.restorer_details = restorer_details
    //   }
    // },
    incrementQty(index) {
      this.articles[index].quantity++;
    },
    decrementQty(index) {
      this.articles[index].quantity--;
    },
    deleteItem(index) {
      this.articles.splice(index, 1);
    },
    clearCart() {
      this.articles = [];
      this.restorer_details = {};
    },
    async checkout() {
      this.updatePricing();
      const user_info = Cookies.get("client-user");
      const details = {
        lines: this.articles,
        pricing: this.pricing,
      };
      const customer_details = {
        id: user_info.id,
        name: user_info.lname + " " + user_info.fname,
        phone: "",
      };
      console.log(restorer_details)
      // const restorer_details = this.restorer_details;
      const restorer_details = false;
      const status = [{ step: "Waiting for restorer confirmation" }];

      await OrderService.postOrder(
        details,
        customer_details,
        restorer_details,
        status
      );
      this.clearCart();
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "shoppingCartArticles",
        storage: localStorage,
        paths: ["articles"],
      },
      { key: "shoppingCartPricing", storage: localStorage, paths: ["pricing"] },
    ],
  },
});
