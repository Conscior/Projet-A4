<template>
  <q-page class="q-pa-md">
    <div class="column items-center">
      <h3>SHOPPING CART</h3>
    </div>

    <!-- Order Summary -->
    <div class="row">
      <div class="col-8">
        <q-table
          title="Ref : draft"
          style="height: 100%"
          :rows="articles"
          :columns="columns"
          row-key="name"
          hide-bottom
          virtual-scroll
        />
      </div>
      <div class="col-4">
        <q-card class="my-card">
          <q-card-section class="bg-blue-8 text-white">
            <div class="text-h6">Order Summary</div>
            <div class="text-subtitle2">
              Shipping and additional costs are calculated based on values you
              have entered.
            </div>
          </q-card-section>

          <q-card-actions vertical align="center">
            <q-list
              bordered
              separator
              dense
              class="rounded-borders"
              style="width: 80%"
            >
              <q-item class="q-mx-md">
                <q-item-section class="absolute-left">
                  Subtotal
                </q-item-section>
                <q-item-section class="absolute-right">
                  {{ shoppingCartStore.pricing.total }}
                </q-item-section>
              </q-item>

              <q-item class="q-mx-md">
                <q-item-section class="absolute-left">
                  Service fee
                </q-item-section>
                <q-item-section class="absolute-right"> {{ shoppingCartStore.pricing.service_fees }} </q-item-section>
              </q-item>

              <q-item class="q-mx-md">
                <q-item-section class="absolute-left">
                  Delivery fee
                </q-item-section>
                <q-item-section class="absolute-right"> {{ shoppingCartStore.pricing.delivery_fee }} </q-item-section>
              </q-item>

              <q-item class="q-mx-md">
                <q-item-section class="absolute-left"> Total </q-item-section>
                <q-item-section class="absolute-right"> {{ shoppingCartStore.pricing.total_ttc }} </q-item-section>
              </q-item>
            </q-list>
            <q-btn
              class="q-my-xs"
              label="Checkout"
              color="primary"
              @click="checkout"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from 'vue-router'
import { useShoppingCartStore } from "stores/shoppingCart";
import io from 'socket.io-client';


const columns = [
  {
    name: "item",
    required: true,
    label: "Article",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
  },
  {
    name: "price",
    align: "center",
    label: "Price",
    field: "price",
    sortable: true,
  },
  { name: "quantity", label: "Quantity", field: "quantity", sortable: true },
  { name: "total", label: "Total", field: "total", sortable: true },
];

export default defineComponent({
  name: "ShoppingCartPage",
  data() {
    return {
      articles: [],
      error: "",
      socket: io('http://localhost:3000')
    };
  },
  async created() {
    const shoppingCartStore = useShoppingCartStore();
    this.socket.on("connection")
    try {
      shoppingCartStore.updatePricing();
      this.articles = shoppingCartStore.articles;
    } catch (error) {
      this.error = error.message;
    }
  },
  setup() {
    const $q = useQuasar();
    const router = useRouter()
    const shoppingCartStore = useShoppingCartStore();
    return {
      router,
      shoppingCartStore,

      columns,
      

      checkout: async () => {
        try {
          const res = await shoppingCartStore.checkout();
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Your order has been successfully created.",
          });
          router.push({path: '/orders'})
        } catch (error) {
          console.log(error)
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Something went wrong, Please try again.",
          });
        }
      },
    };
  },
});
</script>
