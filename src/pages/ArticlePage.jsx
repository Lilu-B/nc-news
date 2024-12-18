import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleById, fetchCommentsByArticleId } from "../api";

function ArticlePage() {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      fetchArticleById(article_id)
        .then((fetchedArticle) => {
          setArticle(fetchedArticle);
        })
        .catch((err) => {
          console.error(err);
        });
  
      fetchCommentsByArticleId(article_id)
        .then((fetchedComments) => {
          setComments(fetchedComments);
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

        <p>Created: {new Date(article.created_at).toLocaleString()}</p>
        <div className="article-content">{article.body}</div>
  
        <div className="comments-section">
          <h3>Comments</h3>
          {comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.comment_id} className="comment-card">
                <p><strong>{comment.author}</strong> <em>{new Date(comment.created_at).toLocaleString()}</em></p>
                <p>{comment.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
  

  

export default ArticlePage;
