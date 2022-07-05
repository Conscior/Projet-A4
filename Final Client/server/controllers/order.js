const Order = require("../models/Order");

const get_order = async (req, res) => {
  const user_id = req.user_id;
  const order_id = req.params.id;

  try {
    const order = await Order.findOne({
      "customer_details.id": user_id,
      "_id": order_id,
    });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const get_orders = async (req, res) => {
  const id = req.user_id;
  try {
    const orders = await Order.find({ "customer_details.id": id });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const post_order = async (req, res) => {
  const { status, details, restorer_details, customer_details } = req.body;
  try {
    const order = await Order.create({
      status,
      details,
      restorer_details,
      customer_details,
    });
    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { get_order, get_orders, post_order };
