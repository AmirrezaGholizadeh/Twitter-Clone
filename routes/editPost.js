const posts = require("../database/posts");

module.exports = async (req, res) => {
  const postID = req.params.id;
  const { textAreaContent } = req.body;

  try {
    const updatePost = await posts.findByIdAndUpdate(
      postID,
      { $set: { Content: textAreaContent } },
      {
        new: true,
      }
    );
    res.json({ message: "Successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
