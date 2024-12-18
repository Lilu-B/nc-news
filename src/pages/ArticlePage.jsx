import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleById, 
    fetchCommentsByArticleId,
    updateArticleVotes } from "../api";

function ArticlePage() {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [plusVotes, setPlusVotes] = useState(0);

  
    useEffect(() => {
        setIsLoading(true);
        setError(null);

        fetchArticleById(article_id)
            .then((fetchedArticle) => {
                setArticle(fetchedArticle);
                setIsLoading(false);
        })
            .catch((err) => {
                console.error("Error fetching article:", err);
                setError("Failed to load article.");
                setIsLoading(false);
        });
    
        fetchCommentsByArticleId(article_id)
            .then((fetchedComments) => {
                setComments(fetchedComments);
                setIsLoading(false); 
            })
            .catch((err) => {
                console.error("Error fetching comments:", err);
                setError("Failed to load comments."); 
                setIsLoading(false);
            });
    }, [article_id]); 

    const handleVoteClick = () => {
        if (!article) return;
    
        const voteChange = hasVoted ? -1 : 1;
        const updatedVotes = plusVotes + voteChange;
    
        setPlusVotes(updatedVotes);
        setHasVoted(!hasVoted);
    
        updateArticleVotes(article_id, voteChange).catch((err) => {
          console.error("Voting failed:", err);
          setError("Failed to update vote.");
    
          setPlusVotes((prevVotes) => prevVotes - voteChange);
          setHasVoted((prevHasVoted) => !prevHasVoted);
        });
    };
  
    if (isLoading) return <p>Loading article...</p>; 
    if (!article) return <p>Article not found</p>; 
    if (error) return <p>{error}</p>;
  
    return (
        <div className="single-article">
            <h1>{article.title}</h1>
            <img src={article.article_img_url} alt={`Image for ${article.title}`} />

            <div className="article-info">
                <p>Author: {article.author}</p>
                <p>Votes: {article.votes}</p>
                <p>Created: {new Date(article.created_at).toLocaleString()}</p>
            </div>

            <div className="article-content">
                <div className="article-votes">
                    <span
                        className={`vote-star ${hasVoted ? "voted" : ""}`}
                        onClick={handleVoteClick}
                        title={hasVoted ? "Remove your vote" : "Add your vote"}
                    > ★ </span>
                    <p className="vote-count">{plusVotes}</p>
                </div>
                {article.body}
            </div>
    
            <div className="comments-section">
            <h3>Comments</h3>
            {comments.length === 0 ? (
                <p>No comments yet</p>
            ) : (
                comments.map((comment) => (
                <div key={comment.comment_id} className="comment-card">
                    <p><strong>{comment.author}</strong> <em>{new Date(comment.created_at).toLocaleString()}</em></p>
                    <p className="comment-txt">{comment.body}</p>
                </div>
                ))
            )}
            </div>
        </div>
    );
  }
  

  

export default ArticlePage;
