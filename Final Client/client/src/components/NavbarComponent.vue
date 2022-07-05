<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title class="q-mx-md"> CESI Eats </q-toolbar-title>

      <q-space />

      <q-tabs shrink>
        <q-route-tab
          v-for="tab in links"
          :key="tab.title"
          :label="tab.title"
          :to="tab.link"
          exact
        />
      </q-tabs>

      <div class="q-mx-lg">
        <q-btn
          class="q-mr-xs"
          flat
          round
          icon="shopping_cart"
          @click="dialogStore.switchShoppingCart"
        />
        <q-btn flat round icon="person" @click="AccountFunc" />
      </div>
    </q-toolbar>

    <LoginDialog ref="loginComponent" />
    <ShoppingCartDialog />
  </q-header>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import { useDrawerStore } from "stores/drawer";
import { useDialogStore } from "stores/dialog";
import LoginDialog from "components/LoginDialog.vue";
import ShoppingCartDialog from "src/components/ShoppingCartDialog.vue";

const links = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Articles",
    link: "/articles",
  },
  {
    title: "Orders",
    link: "/orders",
  },
  {
    title: "About",
    link: "/about",
  },
];

export default defineComponent({
  name: "NavbarComponent",
  components: {
    LoginDialog,
    ShoppingCartDialog,
  },
  setup() {
    const $q = useQuasar();

    const drawerStore = useDrawerStore();
    const dialogStore = useDialogStore();

    const AccountFunc = () => {
      if ($q.cookies.get("client-jwt") && $q.cookies.get("client-user")) {
        drawerStore.switch();
      } else {
        dialogStore.switchLogin();
      }
    };

    return { links, drawerStore, dialogStore, AccountFunc };
  },
});
</script>
