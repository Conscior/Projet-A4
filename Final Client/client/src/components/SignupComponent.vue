<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input filled v-model="fname" label="First Name" lazy-rules />

    <q-input filled v-model="lname" label="First Name" lazy-rules />

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

    <q-select filled v-model="gender" :options="genderOptions" label="Gender" />

    <q-input filled v-model="phone" label="Phone" />
    <q-input filled v-model="address" label="Address" />

    <q-toggle v-model="accept" label="I accept the license and terms" />

    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useDialogStore } from "stores/dialog";
import UserService from "../services/User";

export default defineComponent({
  name: "SignupComponent",
  setup() {
    const $q = useQuasar();
    const dialogStore = useDialogStore();

    const isPwd = ref(true);

    const fname = ref("");
    const lname = ref("");
    const email = ref("");
    const password = ref("");
    const gender = ref(null);
    const phone = ref("");
    const address = ref("");

    const accept = ref(false);

    return {
      dialogStore,

      password,
      isPwd,

      fname,
      lname,
      email,
      gender,
      genderOptions: ["Male", "Female"],
      phone,
      address,
      accept,

      async onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          try {
            const res = await UserService.signup(
              fname.value,
              lname.value,
              email.value,
              password.value,
              gender.value.toLowerCase(),
              phone.value,
              address.value
            );
            dialogStore.switchLogin();
            $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Submitted",
            });
          } catch (error) {
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "Something went wrong",
            });
          }
        }
      },

      onReset() {
        fname.value = null;
        lname.value = null;
        email.value = null;
        password.value = null;
        gender.value = null;
        accept.value = false;
        isPwd.value = true;
        phone.value = null;
        address.value = null;
      },
    };
  },
});
</script>
