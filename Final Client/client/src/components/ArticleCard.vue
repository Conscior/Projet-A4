<template>
  <q-card>
    <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg">
      <div class="absolute-bottom text-subtitle2 text-center">
        {{ article.name }}
      </div>
    </q-img>

    <q-card-section>
      <q-btn
        fab
        color="primary"
        icon="place"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />
      <div class="row no-wrap items-center">
        <div v-if="article.restorer_details" class="col text-h6 ellipsis">{{ article.restorer_details.name }}</div>
        <div
          class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
        >
          <q-icon name="place" />
          250 ft
        </div>
      </div>

      <q-rating readonly :model-value="5" :max="5" size="32px" />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">$・{{ article.price }}</div>
      <div class="text-caption text-grey">
        {{ article.description }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat color="primary" :to="'/article/' + article._id"
        >Purchase</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent} from "vue";

export default defineComponent({
  name: "ArticleCard",
  props: {
    article: Object,
  },
  created() {
    console.log(this.article)
  },
});
</script>
