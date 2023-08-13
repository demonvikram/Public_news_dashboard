import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("/api/articles").then((response) => {
      setArticles(response.data);
    });
  }, []);

  const handleShare = () => {
    // Implement share logic, e.g., using axios to send article data to the server
    // After sharing, update the article list
    const newArticle = { title, content };
    axios.post("/api/articles", newArticle).then((response) => {
      setArticles([...articles, response.data]);
    });
  };

  const handleLike = (articleId) => {
    // Implement like logic, e.g., using axios to send like request to the server
    // After liking, update the article likes count
    axios.post(`/api/articles/${articleId}/like`).then((response) => {
      const updatedArticles = articles.map((article) =>
        article._id === articleId ? { ...article, likes: response.data.likes } : article
      );
      setArticles(updatedArticles);
    });
  };

  return (
    <div>
      <h1>News Feed</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleShare}>Share</button>
      </div>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <p>Likes: {article.likes}</p>
            <button onClick={() => handleLike(article._id)}>Like</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
