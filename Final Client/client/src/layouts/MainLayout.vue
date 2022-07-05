<template>
  <q-layout view="lHh Lpr lFf">
    <NavbarComponent />
    <RightDrawerComponent />

    <FooterComponent />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import NavbarComponent from "components/NavbarComponent.vue";
import FooterComponent from "components/FooterComponent.vue";
import RightDrawerComponent from "components/RightDrawerComponent.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    NavbarComponent,
    FooterComponent,
    RightDrawerComponent,
  },
});
</script>
