const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  likes: { type: Number, default: 0 },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
