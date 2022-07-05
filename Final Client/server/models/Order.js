const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    ref: {
      type: Number,
      default: 0,
    },
    details: {
      lines: [
        {
          id: Number,
          article_name: String,
          price: Number,
          quantity: Number,
          total: Number,
        },
      ],
      pricing: {
        discount: Number,
        service_fee: Number,
        delivery_fee: Number,
        total: Number,
        total_ttc: Number,
      },
      address: {
        name: String,
        note: String,
        latitude: Number,
        longitude: Number,
        latitudeDelta: Number,
        longitudeDelta: Number,
      },
    },
    customer_details: {
      id: Number,
      name: String,
      phone: String,
    },
    restorer_details: {
      id: Number,
      name: String,
      address: String,
      latitude: Number,
      longitude: Number,
      latitudeDelta: Number,
      longitudeDelta: Number,
    },
    delivery_details: {
      name: String,
      phone: String,
    },
    status: [
      {
        step: String,
      },
    ],
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  last_record = await Order.find().sort({ _id: -1 }).limit(1);
  console.log(last_record[0]);
  if (last_record) {
    this.ref = last_record[0].ref + 1;
    // this.ref = 999
  } else {
    this.ref = 0;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
