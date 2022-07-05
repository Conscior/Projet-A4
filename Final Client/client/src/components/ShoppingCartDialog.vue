<template>
  <q-dialog v-model="dialogStore.shoppingCart" full-height position="right">
    <q-card class="column no-wrap no-scroll">
      <q-card-section class="col-1">
        <div class="text-h6">My Cart</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="scroll col-9" style="width: 500px">
        <div
          v-for="(item, index) in shoppingCartStore.articles"
          :key="item._id"
          class="row wrap q-my-xs"
          style="width: 100%"
        >
          <CartItem :item="item" :index="index" />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions class="col-2 row no-wrap" align="center">
        <q-btn class="col-6" flat label="Checkout" color="primary" v-close-popup @click="cartCheckout" />
        <q-btn class="col-6" flat label="Clear" color="primary" v-close-popup @click="shoppingCartStore.clearCart" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useDialogStore } from "stores/dialog";
import { useShoppingCartStore } from "stores/shoppingCart";
import CartItem from "components/CartItem.vue";

export default defineComponent({
  name: "ShoppingCartDialog",
  components: {
    CartItem,
  },
  methods: {
    cartCheckout: function () {
      this.$router.push('/cart')
    }
  },
  setup() {
    const dialogStore = useDialogStore();
    const shoppingCartStore = useShoppingCartStore();
    const quantity = ref(0);

    return {
      dialogStore,
      shoppingCartStore,
      quantity,
    };
  },
});
</script>

<style></style>
