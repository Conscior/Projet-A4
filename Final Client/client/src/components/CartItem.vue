<template>
  <div class="col-6">
    <q-img
      class="fit"
      style="height: 100%"
      src="https://cdn.quasar.dev/img/parallax2.jpg"
    >
      <div class="row no-wrap absolute-bottom">
        <q-btn
          class="col-4"
          color="primary"
          flat
          label="-"
          @click="shoppingCartStore.decrementQty(index)"
        />
        <q-input
          dark
          v-model="item.quantity"
          class="col-4"
          input-class="text-center"
          dense
          borderless
          readonly
        />
        <q-btn
          class="col-4"
          color="primary"
          flat
          label="+"
          @click="shoppingCartStore.incrementQty(index)"
        />
      </div>
    </q-img>
  </div>

  <div class="col-5">
    <q-list
      class="column justify-start"
      bordered
      separator
      style="height: 100%"
    >
      <q-item class="col">
        <q-item-section>{{ item.article_name }}</q-item-section>
      </q-item>

      <q-item class="col">
        <q-item-section>
          <q-item-label>Seller</q-item-label>
          <q-item-label caption>{{ item.restorer_name }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="col">
        <q-item-section>
          <q-item-label overline>Price</q-item-label>
          <q-item-label>{{ item.price }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <div class="col-1 row no-wrap items-end">
    <q-btn
      class="col"
      flat
      dense
      round
      color="primary"
      icon="delete"
      @click="deleteItem"
    />
    <!-- <q-btn class="col" flat dense round color="primary" icon="shopping_cart" /> -->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useShoppingCartStore } from "stores/shoppingCart";

export default defineComponent({
  name: "CartItem",
  props: {
    item: Object,
    index: Number,
  },
  created() {
    console.log(this.item)
  },
  setup(props) {
    const shoppingCartStore = useShoppingCartStore();

    return {
      shoppingCartStore,

      deleteItem: () => {
        shoppingCartStore.deleteItem(props.index);
      },
      // incrementQty: () => {
      //   shoppingCartStore.
      // },
      // incrementQty: () => {},
    };
  },
});
</script>
