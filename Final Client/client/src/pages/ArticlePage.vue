<template>
  <q-page class="flex" style="justify-content: center">
    <div
      v-if="article"
      class="fit row wrap justify-evenly items-start content-start q-col-gutter-xl"
    >
      <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-5 q-mt-xl">
        <q-carousel
          arrows
          swipeable
          animated
          v-model="slide"
          infinite
          thumbnails
          :autoplay="2500"
        >
          <q-carousel-slide
            style="border-radius: 15px"
            :name="1"
            img-src="https://cdn.quasar.dev/img/mountains.jpg"
          />
          <q-carousel-slide
            style="border-radius: 15px"
            :name="2"
            img-src="https://cdn.quasar.dev/img/parallax1.jpg"
          />
          <q-carousel-slide
            style="border-radius: 15px"
            :name="3"
            img-src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
          <q-carousel-slide
            style="border-radius: 15px"
            :name="4"
            img-src="https://cdn.quasar.dev/img/quasar.jpg"
          />
        </q-carousel>
      </div>

      <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-5 q-my-xl">
        <h5>
          {{ article.restorer_details.name }}
        </h5>
        <h3>
          {{ article.name }}
        </h3>
        <p>
          {{ article.description }}
        </p>
        <div class="text-subtitle1">$・{{ article.price }}</div>
        <div class="row justify-between content-start">
          <q-btn class="col-2" @click="quantity > 0 ? quantity-- : null"
            >-</q-btn
          >
          <q-input
            class="col-4"
            v-model.number="quantity"
            type="number"
            filled
            style="max-width: 200px"
          />
          <q-btn class="col-2" @click="quantity++">+</q-btn>
          <q-btn class="col-3" @click="addToCart">Add to cart</q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useShoppingCartStore } from "stores/shoppingCart";
import ArticleService from "../services/Article";

export default defineComponent({
  name: "ArticlePage",
  data() {
    const slide = ref(1);
    return {
      slide,
      quantity: ref(1),

      article: ref(null),
      error: ref(""),
    };
  },
  methods: {
    addToCart: function () {
      const shoppingCartStore = useShoppingCartStore();
      let article = JSON.parse(JSON.stringify(this.article))
      article.quantity = this.quantity
      article.total = this.quantity * article.price
      shoppingCartStore.addArticle(article)
    },
  },
  async created() {
    try {
      const res = await ArticleService.getArticle(this.$route.params.id);
      this.article = ref(res);
    } catch (error) {
      this.error = error.message;
    }
  },
  // setup() {
  //   return {
  //     slide: ref(1),
  //     quantity: ref(1),
  //   };
  // },
});
</script>
