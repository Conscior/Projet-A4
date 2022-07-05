<template>
  <q-page style="justify-content: center" class="flex">
    <q-btn class="q-ma-md" style="height: 50px" color="primary" label="Add Component" @click="dialogStore.switchComponent"/>
    <div
      class="fit row wrap justify-start items-start content-start q-col-gutter-md q-my-md"
    >
      <div
        class="col-xs-10 col-sm-6 col-md-4"
        v-for="component in components"
        :key="component._id"
        v-bind="component"
      >
        <ComponentCard :component="component" />
      </div>
    </div>
    <ComponentDialog />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useDialogStore } from "stores/dialog";
import ComponentCard from "components/ComponentCard.vue";
import ComponentDialog from "components/ComponentDialog.vue";
import ComponentService from "../services/Component";

export default defineComponent({
  name: "ComponentsPage",
  components: {
    ComponentCard,
    ComponentDialog
  },
  data() {
    const dialogStore = useDialogStore();
    return {
      dialogStore,

      components: [],
      error: "",
    };
  },
  async created() {
    try {
      this.components = await ComponentService.getComponents();
    } catch (error) {
      console.log(error)
    }
  },
});
</script>
