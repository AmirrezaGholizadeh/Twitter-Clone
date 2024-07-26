const posts = require("../database/posts");

module.exports = async (req, res) => {
  try {
    const postID = req.params.id;
    const postData = await posts.find({ _id: postID });
    res.json({ postData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post data", error });
  }
};
