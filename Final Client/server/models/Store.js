const mongoose = require("mongoose");

/* Creating a schema for the user model. */
const storeSchema = new mongoose.Schema(
    {
        name: { type: String, default: null },
        owner: { type: Number, default: null },
        address: { type: String },
    },

);

const storeModel = mongoose.model("stores", storeSchema);
module.exports = storeModel;