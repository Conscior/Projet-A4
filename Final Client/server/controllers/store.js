const Store = require("../models/Store");

const get_store_info = async (req, res) => {
  const restorer_id = req.params.id;

  try {
    const restorer_info = await Store.findOne({
      "owner": restorer_id,
    });
    if (restorer_info) {
      res.json(restorer_info);
    } else {
      res.status(404).json({ error: "Store not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = { get_store_info };
