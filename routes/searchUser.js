const posts = require("../database/posts");

module.exports = async (req, res) => {
  try {
    const user = req.params.id;
    const userPosts = await posts.find({ Author: user });
    res.json({ userPosts: userPosts.length });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
