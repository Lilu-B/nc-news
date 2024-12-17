import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleById } from "../api";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <div className="single-article">
      <h1>{article.title}</h1>
      <img src={article.article_img_url} alt={`Image for ${article.title}`} />
      <p>Author: {article.author}</p>
      <p>Votes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
      <p>Created: {new Date(article.created_at).toLocaleString()}</p>
      <div className="article-content">{article.body}</div>
    </div>
  );
}

export default ArticlePage;
