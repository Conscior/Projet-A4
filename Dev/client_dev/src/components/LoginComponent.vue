<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input filled v-model="email" label="Email" lazy-rules />

      <q-input
        filled
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        label="Password"
        lazy-rules
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

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
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useDialogStore } from "stores/dialog";
import UserService from "../services/User";

export default defineComponent({
  name: "LoginComponent",
  setup() {
    const $q = useQuasar();
    const dialogStore = useDialogStore();

    const email = ref("");
    const password = ref("");
    const isPwd = ref(true);

    return {
      dialogStore,

      password,
      isPwd,

      email,

      async onSubmit() {
        try {
          const res = await UserService.login(email.value, password.value);
          //Set jwt cookie
          $q.cookies.set("dev-jwt", res.jwt, {
            expires: "3d",
            sameSite: "Strict",
          });
          //Set user info cookie
          $q.cookies.set("dev-user", res.user, {
            expires: "3d",
            sameSite: "Strict",
          });

          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Success !",
          });
          dialogStore.switchLogin();
        } catch (error) {
          console.log(error)
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Login failed.",
          });
        }
      },

      onReset() {
        email.value = null;
        password.value = null;
        accept.value = false;
      },
    };
  },
});
</script>
