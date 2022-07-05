<template>
  <q-page style="justify-content: center" class="flex">
    <div
      class="fit row wrap justify-start items-start content-start q-col-gutter-md q-my-md"
    >
      <div
        class="col-xs-10 col-sm-6 col-md-4"
        v-for="article in articles"
        :key="article._id"
        v-bind="article"
      >
        <ArticleCard :article="article" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import ArticleCard from "components/ArticleCard.vue";
import ArticleService from "../services/Article";

export default defineComponent({
  name: "ArticlesPage",
  data() {
    return {
      articles: [],
      error: "",
    };
  },
  async created() {
    try {
      this.articles = await ArticleService.getArticles();
    } catch (error) {
      this.error = error.message;
    }
  },
  components: {
    ArticleCard,
  },
});
</script>
