<template>
  <div>
    <q-item clickable to="/" exact>
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Home</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable @click="accountClick" exact>
      <q-item-section avatar>
        <q-icon name="person" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Account</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable to="/components" exact>
      <q-item-section avatar>
        <q-icon name="apps" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Components</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from 'vue-router'
import { useDialogStore } from "stores/dialog";

export default defineComponent({
  name: "EssentialLink",
  setup() {
    const $q = useQuasar();
    const router = useRouter()
    const dialogStore = useDialogStore()
    return {
      dialogStore,

      accountClick: () => {
        if ($q.cookies.get("dev-jwt") && $q.cookies.get("dev-user")) {
          router.push({path: '/account'})
      } else {
        dialogStore.switchLogin();
      }
      }
    }
  }
});
</script>
