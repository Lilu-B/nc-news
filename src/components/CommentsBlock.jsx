import React from "react";

function CommentsBlock({
    comments,
    newComment,
    username,
    handleCommentSubmit,
    handleDeleteComment,
    setNewComment,
    setUsername,
    error,
    isLoading,
}) {
    return (
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
                <p>
                <strong>{comment.author}</strong>{" "}
                <em>{new Date(comment.created_at).toLocaleString()}</em>
                </p>
                <p className="comment-txt">{comment.body}</p>
                <button onClick={() => handleDeleteComment(comment.comment_id)}>
                Delete
                </button>
            </div>
            ))
        )}
        </div>
    );
}

export default CommentsBlock;
