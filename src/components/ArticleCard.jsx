import React from 'react';

function ArticleCard({ title, author, votes, comment_count, created_at, article_img_url }) {
  return (
    <div className="article-card">
      <h3>{title}</h3>
      <img src={article_img_url} alt={`Image for ${title}`} />
      <p>Author: {author}</p>
      <p>Votes: {votes}</p>
      <p>Comments: {comment_count}</p>
      <p>Created: {new Date(created_at).toLocaleString()}</p>
    </div>
  );
}

export default ArticleCard;

