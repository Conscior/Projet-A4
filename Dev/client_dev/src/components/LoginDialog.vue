<template>
  <q-dialog v-model="dialogStore.login">
    <q-card style="width: 700px; max-width: 80vw">
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
        </q-avatar>

        <q-toolbar-title
          ><span class="text-weight-bold">Login / Signup</span></q-toolbar-title
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
          <q-tab name="login" label="Login" />
          <q-tab name="signup" label="SignUp" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <LoginComponent />
          </q-tab-panel>

          <q-tab-panel name="signup">
            <SignupComponent />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useDialogStore } from "stores/dialog";
import LoginComponent from "components/LoginComponent.vue";
import SignupComponent from "components/SignupComponent.vue";

export default defineComponent({
  name: "LoginDialog",
  components: {
    LoginComponent,
    SignupComponent,
  },
  setup() {
    const dialogStore = useDialogStore()

    return {
      dialogStore,
      tab: ref("login"),
    };
  },
});
</script>

<style></style>
