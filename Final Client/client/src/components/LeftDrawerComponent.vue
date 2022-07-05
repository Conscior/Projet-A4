<template>
  <q-drawer :model-value="true" bordered :mini="drawerStore.leftDrawerMini">
    <q-list>
      <q-item-label header>
        {{ header }}
      </q-item-label>

      <EssentialLink v-for="link in links" :key="link.title" v-bind="link" />
    </q-list>
  </q-drawer>
</template>

<script>
import { defineComponent } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useDrawerStore } from "stores/drawer";

export default defineComponent({
  name: "LeftDrawerComponent",
  props: {
    header: String,
    links: Array,
  },
  components: {
    EssentialLink,
  },
  setup() {
    const drawerStore = useDrawerStore();
    return { drawerStore };
  },
});
</script>
