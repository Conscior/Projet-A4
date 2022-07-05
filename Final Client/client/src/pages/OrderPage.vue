<template>
  <q-page class="q-pa-md">
    <div class="column items-center">
      <div class="col">
        <q-stepper v-model="orderStep" ref="stepper" color="primary" header-nav animated>
          <q-step
            :name="1"
            title="Waiting for restorer confirmation"
            icon="settings"
            :done="orderStep > 1"
          >
          </q-step>

          <q-step
            :name="2"
            title="Waiting for delivery man confirmation"
            caption="Optional"
            icon="create_new_folder"
            :done="orderStep > 2"
          >
          </q-step>

          <q-step :name="3" title="Ongoing delivery" icon="assignment">
          </q-step>

          <q-step :name="4" title="Paid" icon="add_comment">
          </q-step>
        </q-stepper>
      </div>
      <div class="col">
        <h3>Order: {{order.ref}}</h3>
      </div>
    </div>

    <!-- Order Summary -->
    <div class="row">
      <div class="col-8">
        <q-table
          style="height: 100%"
          :rows="order_lines"
          :columns="columns"
          row-key="_id"
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
                  {{ pricing.total }}
                </q-item-section>
              </q-item>

              <q-item class="q-mx-md">
                <q-item-section class="absolute-left">
                  Service fee
                </q-item-section>
                <q-item-section class="absolute-right">
                  {{ pricing.service_fees }}
                </q-item-section>
              </q-item>

              <q-item class="q-mx-md">
                <q-item-section class="absolute-left">
                  Delivery fee
                </q-item-section>
                <q-item-section class="absolute-right">
                  {{ pricing.delivery_fee }}
                </q-item-section>
              </q-item>

              <q-item class="q-mx-md">
                <q-item-section class="absolute-left"> Total </q-item-section>
                <q-item-section class="absolute-right">
                  {{ pricing.total_ttc }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import OrderService from "../services/Order";

const columns = [
  {
    name: "article_name",
    required: true,
    label: "Article",
    align: "center",
    field: (row) => row.article_name,
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
  name: "OrderPage",
  data() {
    return {
      columns,

      order: false,
      order_lines: [],
      pricing: false,
    };
  },
  async created() {
    const order_id = this.$route.params.id;
    try {
      const res = await OrderService.getOrder(order_id);
      this.order = res;
      this.order_lines = res.details.lines;
      this.pricing = res.details.pricing;
    } catch (error) {
    }
  },
  setup() {
    return {
      orderStep: ref(1),
    }
  }
});
</script>
