<template>
  <q-drawer
    v-model="drawerStore.rightDrawerOpen"
    side="right"
    overlay
    :width="200"
    :breakpoint="400"
  >
    <q-scroll-area
      style="
        height: calc(100% - 150px);
        margin-top: 150px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list padding>
        <q-item clickable v-ripple to="/account">
          <q-item-section avatar>
            <q-icon name="manage_accounts" />
          </q-item-section>

          <q-item-section>Account</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <q-img
      class="absolute-top"
      src="https://cdn.quasar.dev/img/material.png"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div class="text-weight-bold">
          {{ cookies.get("client-user") ? cookies.get("client-user").fname : '' }}
        </div>
        <div class="text-weight-bold">
          {{ cookies.get("client-user") ? cookies.get("client-user").lname : '' }}
        </div>
        <div>{{ cookies.get("client-user") ? cookies.get("client-user").email : '' }}</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script>
import { defineComponent} from "vue";
import { useQuasar } from "quasar";
import { useDrawerStore } from "stores/drawer";
import UserService from "../services/User";
import LoginDialog from "components/LoginDialog.vue";

export default defineComponent({
  name: "RightDrawerComponent",
  components: {
    LoginDialog,
  },
  methods: {
    logout: () => {
      const drawerStore = useDrawerStore();
      UserService.logout();
      drawerStore.switch();
    },
  },
  setup() {
    const $q = useQuasar();
    const cookies = $q.cookies;

    const drawerStore = useDrawerStore();
    return { drawerStore, UserService, cookies };
  },
});
</script>
