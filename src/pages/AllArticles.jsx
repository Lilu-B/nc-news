import React from 'react';
import { useState, useEffect } from 'react';
import { fetchArticlesWithParams } from '../api';
import ArticleCard from '../components/ArticleCard';
import SortBy from '../components/SortByBlock';
import { Link } from "react-router-dom";
import Header from '../components/Header';

function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    setIsLoading(true); 
    setError(null);

    fetchArticlesWithParams({ sortBy, order })
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles.");
        setIsLoading(false);
      });
  }, [sortBy, order]);

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <Header></Header>
      <section>
        <h2>All Articles:</h2>
        <SortBy
              sortBy={sortBy}
              order={order}
              onSortChange={setSortBy}
              onOrderChange={setOrder}
        />
  
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
    </>
  );
}

export default AllArticles;
