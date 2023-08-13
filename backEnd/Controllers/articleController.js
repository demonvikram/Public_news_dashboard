const Article = require("../models/Article");

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newArticle = new Article({ title, content });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const likeArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    article.likes += 1;
    await article.save();
    res.json({ likes: article.likes });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getTopArticles = async (req, res) => {
  try {
    const topArticles = await Article.find().sort({ likes: -1 }).limit(7);
    res.json(topArticles);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getArticles, createArticle, likeArticle, getTopArticles };
