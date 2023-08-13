import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [topArticles, setTopArticles] = useState([]);

  useEffect(() => {
    axios.get("/api/articles/top").then((response) => {
      setTopArticles(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Top Liked Articles</h1>
      <ul>
        {topArticles.map((article) => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <p>Likes: {article.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
