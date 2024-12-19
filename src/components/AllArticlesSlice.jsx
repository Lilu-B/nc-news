import React from 'react';
import { useState, useEffect } from 'react';
import { fetchArticles } from '../api';
import ArticleCard from '../components/ArticleCard';
import { Link } from "react-router-dom";

function AllArticlesSlice() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true); 
    setError(null);

    fetchArticles()
      .then((fetchedArticles) => {
        setArticles(fetchedArticles.slice(0, 6));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Our Articles:</h2>
      {isLoading ? (
        <p>Loading articles...</p>
      ) : (
        <div className="articles-list">
          {articles.map((article) => (
            <Link to={`/articles/${article.article_id}`} key={article.article_id}>
                <ArticleCard 
                    key={article.article_id}
                    title={article.title}
                    article_img_url={article.article_img_url}
                    author={article.author}
                    votes={article.votes}
                    comment_count={article.comment_count}
                    created_at={article.created_at}
                />
            </Link>
          ))}
        </div>
      )}
        <Link to="/articles" className="view-all-btn">View all...</Link>
    </section>
  )}

  export default AllArticlesSlice