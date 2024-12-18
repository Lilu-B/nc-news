import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleById, 
    fetchCommentsByArticleId,
    updateArticleVotes,
    postComment, deleteComment } from "../api";

function ArticlePage() {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [username, setUsername] = useState("");
    const [hasVoted, setHasVoted] = useState(false);
    const [plusVotes, setPlusVotes] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
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
                setArticle(null);
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
    
        updateArticleVotes(article_id, voteChange)
            .catch((err) => {
                console.error("Voting failed:", err);
                setError("Failed to update vote.");
            
                setPlusVotes((prevVotes) => prevVotes - voteChange);
                setHasVoted((prevHasVoted) => !prevHasVoted);
        });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
    
        if (!newComment || !username) {
            setError("Please provide a username and comment.");
            return;
        }
  
        setIsLoading(true);
        setError(null);
    
        const commentData = {
            username,
            body: newComment,
        };
    
        postComment(article_id, commentData)
            .then((addedComment) => {
                setComments([addedComment, ...comments]);
                setNewComment("");
                setUsername("");
                setError("");
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error posting comment:", err);
                if (err.response && err.response.data.msg === "User not found") {
                    setError("Please enter your REGISTERED name or register on the site to add a comment!");
                } else {
                    setError("Failed to post comment.");
                }
                setIsLoading(false);
            });
    };

    const handleDeleteComment = (comment_id) => {
        setIsLoading(true);
        setError(null);
      
        deleteComment(comment_id)
            .then(() => {
                setComments(comments.filter(comment => comment.comment_id !== comment_id));
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error deleting comment:", err);
                setError("Failed to delete comment.");
                setIsLoading(false);
            });
      };
  
    if (isLoading) return <p>Loading article...</p>; 
    if (!article) return <p>Article not found</p>; 
    // if (error) return <p>{error}</p>;
  
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
            <h3>Comments:</h3>


            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Your comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Posting..." : "Post Comment"}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}


            {comments.length === 0 ? (
                <p>No comments yet</p>
            ) : (
                comments.map((comment) => (
                <div key={comment.comment_id} className="comment-card">
                    <p><strong>{comment.author}</strong> <em>{new Date(comment.created_at).toLocaleString()}</em></p>
                    <p className="comment-txt">{comment.body}</p>
                    <button onClick={() => handleDeleteComment(comment.comment_id)}>Delete</button>
                </div>
                ))
            )}
            </div>
        </div>
    );
  }
  

  

export default ArticlePage;
