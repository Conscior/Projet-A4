<template>
  <q-card>
    <q-img :src="component.img">
      <div class="absolute-bottom text-subtitle2 text-center">
        {{ component.name }}
      </div>
    </q-img>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">
        <q-btn flat style="primary" label="Link" :href="'//' + component.url" target="_blank" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent} from "vue";

export default defineComponent({
  name: "ComponentCard",
  props: {
    component: Object,
  }
});
</script>
