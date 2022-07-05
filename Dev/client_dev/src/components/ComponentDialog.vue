<template>
  <q-dialog v-model="dialogStore.component">
    <q-card style="width: 700px; max-width: 80vw">
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
        </q-avatar>

        <q-toolbar-title
          ><span class="text-weight-bold"
            >Create Component</span
          ></q-toolbar-title
        >

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="create" label="Create" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="create">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input filled v-model="name" label="Name" />
              <q-input filled v-model="img" label="Image" />
              <q-input filled v-model="url" label="NPM Url" />

              <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useDialogStore } from "stores/dialog";
import ComponentService from "../services/Component";

export default defineComponent({
  name: "LoginDialog",
  setup() {
    const $q = useQuasar();
    const dialogStore = useDialogStore();
    const name = ref("");
    const img = ref("");
    const url = ref("");

    return {
      dialogStore,
      tab: ref("create"),

      name,
      img,
      url,

      async onSubmit() {
        try {
          const res = await ComponentService.postComponent(
            name.value,
            img.value,
            url.value
          );
          console.log(res);
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Success !",
          });
          dialogStore.switchComponent();
        } catch (error) {
          console.log(error);
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Failed.",
          });
        }
      },

      onReset() {
        name.value = null;
        img.value = null;
        url.value = false;
      },
    };
  },
});
</script>

<style></style>
