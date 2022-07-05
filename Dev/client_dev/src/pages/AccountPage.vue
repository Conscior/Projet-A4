<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">{{ email }}</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ lname + ' ' + fname }}</div>
              <div class="text-caption text-grey" >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa quod, illo id velit beatae eius quos, temporibus amet cum tempora minus adipisci hic iusto itaque ratione nobis dicta magnam sit.
                <!-- Sales and Marketing Executive | Graduate and past committee |
                Keynote speaker on Selling and Recruiting Topics -->
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/boy-avatar.png"
              />
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-form class="q-gutter-md" @submit="onSubmit">
              <q-input filled v-model="fname" label="First Name" />

              <q-input filled v-model="lname" label="Last Name" />

              <q-input filled v-model="email" label="Email" />

              <q-select
                filled
                v-model="gender"
                :options="genderOptions"
                label="Gender"
              />

              <div>
                <q-btn label="Update" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import UserService from "../services/User";

export default defineComponent({
  name: "AccountPage",
  setup() {
    const $q = useQuasar();
    const user = $q.cookies.get("dev-user");
    const fname = ref(user.fname);
    const lname = ref(user.lname);
    const email = ref(user.email);
    const gender = ref(user.gender);

    return {
      fname,
      lname,
      email,
      gender,
      genderOptions: ["Male", "Female"],

      async onSubmit() {
        try {
          await UserService.update(
            fname.value,
            lname.value,
            email.value,
            gender.value.toLowerCase()
          ).then((result) => {
            const user = result.user[1];
            $q.cookies.set("dev-user", user);
          });

          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Changes applied",
          });
        } catch (error) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Something went wrong",
          });
        }
      },
    };
  },
});
</script>

<style scoped></style>
