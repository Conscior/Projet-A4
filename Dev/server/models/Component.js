const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  user_id: { type: Number },
  name: { type: String },
  img: { type: String }, //url
  url: { type: String }, // npm url
});

const componentModel = mongoose.model("component", componentSchema);
module.exports = componentModel;
