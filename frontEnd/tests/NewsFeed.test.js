import React from "react";
import { render } from "@testing-library/react";
import NewsFeed from "../components/NewsFeed";

test("NewsFeed displays news articles correctly", () => {
  const articles = [
    { title: "Article 1", content: "Content 1" },
    { title: "Article 2", content: "Content 2" },
  ];

  const { getByText } = render(<NewsFeed articles={articles} />);

  articles.forEach((article) => {
    expect(getByText(article.title)).toBeInTheDocument();
    expect(getByText(article.content)).toBeInTheDocument();
  });
});
