const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    Author: { type: String, required: true },
    Content: { type: String, required: true },
    likes: { type: Number },
    likedBy: [{ type: String}],
    createdAt: { type: Date, default: Date.now}, 
  },
  { collection: "posts" }
);


const model = mongoose.model("Post", PostSchema);

module.exports = model;


