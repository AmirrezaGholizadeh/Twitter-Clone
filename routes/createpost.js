const posts = require("../database/posts");

module.exports = async (req, res) => {
  try {
    const {content, author } = req.body;
    if (content && author) {
      const new_post = await posts.create({
        Author: author,
        Content: content,
        likes: 0,
      });
    } else throw error;

    return res.json("Successful");
  } catch (error) {
    return res.json("Unsuccessful");
  }
};
