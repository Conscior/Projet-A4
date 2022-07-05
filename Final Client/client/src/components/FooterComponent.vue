<template>
  <q-footer elevated>
    <q-toolbar class="column">
      <div class="row no-wrap col q-gutter-md">
        <q-btn class="col" padding="md" flat rounded color="white" icon="facebook" />
        <q-btn class="col" padding="md" flat rounded color="white" icon="instagram" />
      </div>
      <div class="col"></div>
      <q-separator />
      <div class="col">2022 - CESI EATS</div>
    </q-toolbar>
  </q-footer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",
});
</script>
