<template>
  <q-page class="q-pa-md">
    <div class="column items-center">
      <h3>Orders</h3>
    </div>

    <div class="row q-pb-lg">
      <div class="col">
        <q-table
          style="height: 100%"
          :rows="orders"
          :columns="columns"
          row-key="ref"
          no-data-label="You have no orders on your name."
          virtual-scroll
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="sm"
                  color="primary"
                  round
                  dense
                  :to="'/orders/' + props.row._id"
                  icon="info"
                />
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import Order from "../services/Order";

const columns = [
  {
    name: "ref",
    required: true,
    label: "Ref",
    align: "center",
    field: (row) => row.ref,
    format: (val) => `Ord/${val}`,
  },
  { name: "restorer", label: "Restorer", field: "restorer", sortable: true },
  { name: "delivrer", label: "Delivrer", field: "delivrer", sortable: true },
  { name: "total_ttc", label: "Price", field: "total_ttc", sortable: true },
  { name: "date", label: "Date", field: "date", sortable: true },
];

export default defineComponent({
  name: "OrdersPage",
  methods: {
    getOrderInfo: function (order) {
      this.$router.push("/orders/" + order._id);
    },
  },
  data() {
    const orders = [];
    return {
      orders,
    };
  },
  async created() {
    const $q = useQuasar();
    const res = await Order.getOrders();

    if (res) {
      const data = [];
      res.forEach((order) => {
        data.push({
          ...order,
          restorer: "test",
          delivrer: "test",
          total_ttc: order.details.pricing.total_ttc,
          date: order.createdAt,
        });
      });
      this.orders = data;
    } else {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: "Login failed.",
      });
    }
  },
  setup() {
    return {
      columns,
      articles: [],
    };
  },
});
</script>
