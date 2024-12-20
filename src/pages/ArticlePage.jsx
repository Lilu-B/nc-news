import React from "react";
import CommentsBlock from "../components/CommentsBlock";
import VoteHandler from "../components/VoteHandler";
import Header from '../components/Header';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleById, 
    fetchCommentsByArticleId,
    postComment, deleteComment } from "../api";

function ArticlePage() {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateVotes = (voteChange) => {
        setArticle((prevArticle) => ({
            ...prevArticle,
            votes: prevArticle.votes + voteChange
        }));
    };

    const { plusVotes, hasVoted, handleVoteClick, error: voteError } = VoteHandler(
        article_id, 
        article ? article.votes : 0,
        updateVotes
    );

  
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
        <>
        <Header></Header>
        <div className="single-article">

            <h1>"{article.title}"</h1>
            <img src={article.article_img_url} alt={`Image for ${article.title}`} />

            <div className="article-info">
                <p>Author: {article.author}</p>
                <p>Votes: {article.votes}</p>
                <p>Created: {new Date(article.created_at).toLocaleString()}</p>
            </div>


            <div className="article-content">
                <div className="article-votes">
                    <span
                        className={`vote-star ${hasVoted ? "voted" : ""} ${isLoading ? "disabled" : ""}`}
                        onClick={!isLoading ? handleVoteClick : null}
                        title={hasVoted ? "Remove your vote" : "Add your vote"}
                    > ★ </span>
                    <p className="vote-count">{plusVotes}</p>
                </div>
                {article.body}
                {voteError && <p className="error-message">{voteError}</p>}
            </div>

            <CommentsBlock
                comments={comments}
                newComment={newComment}
                username={username}
                handleCommentSubmit={handleCommentSubmit}
                handleDeleteComment={handleDeleteComment}
                setNewComment={setNewComment}
                setUsername={setUsername}
                error={error}
                isLoading={isLoading}
            />
        </div>
        </>
    );
  }
  

  

export default ArticlePage;
