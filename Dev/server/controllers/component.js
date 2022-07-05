const Component = require("../models/Component");

const get_components = async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const get_components = async (req, res) => {
//   const user_id = req.user_id;
//   try {
//     const components = await Component.find({ user_id });
//     res.json(components);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const post_component = async (req, res) => {
  const user_id = req.user_id;
  const { name, img, url } = req.body;
  try {
    const component = await Component.create({
      user_id,
      name,
      img,
      url,
    });
    res.status(200).json({ component });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { get_components, post_component };
