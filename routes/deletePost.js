const posts = require("../database/posts");

module.exports = async (req, res) => {
  try {
    const postID = req.params.id;
    const deletePost = await posts.findByIdAndDelete(postID);

    if (deletePost) {
      return res.json({ message: "User deleted successfully" });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {}
};
