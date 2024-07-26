const posts = require("../database/posts");

module.exports = async (req, res) => {
  try {
    const postID = req.params.id;
    const { localUsername } = req.body;
    const post = await posts.findById(postID);
    post.likes++;
    post.likedBy.push(localUsername);
    await post.save();
    res.json({ message: "Post liked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error liking post" });
  }
};
