import React from 'react';
import { useState, useEffect } from 'react';
import { fetchArticles } from '../api';
import ArticleCard from '../components/ArticleCard';
import { Link } from "react-router-dom";

function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading articles:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading articles...</p>;

  return (
    <section>
      <h2>All Articles</h2>
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
    </section>
  );
}

export default AllArticles;
