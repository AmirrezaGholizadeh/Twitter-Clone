const users = require("../database/users");
const posts = require("../database/posts");

module.exports = async (req, res) => {
  try {
    const number_of_users = await users.countDocuments({});
    const post_data = await posts.find().sort({ createdAt: -1 });
    res.json({ number_of_users, post_data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};
