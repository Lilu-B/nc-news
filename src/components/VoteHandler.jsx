import { useState } from "react";
import { updateArticleVotes } from "../api";

function VoteHandler (article_id, initialVotes = 0, onVotesUpdate) {
  const [plusVotes, setPlusVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);

  const handleVoteClick = () => {
    const voteChange = hasVoted ? -1 : 1;
    const updatedVotes = plusVotes + voteChange;

    setPlusVotes(updatedVotes);
    setHasVoted(!hasVoted);

    updateArticleVotes(article_id, voteChange)
        .then(() => {
            if (onVotesUpdate) {
                onVotesUpdate(voteChange);
            }
        })
        .catch((err) => {
            console.error("Voting failed:", err);
            setError("Failed to update vote.");
            setPlusVotes((prevVotes) => prevVotes - voteChange);
            setHasVoted((prevHasVoted) => !prevHasVoted);
    });
  };

  return { plusVotes, hasVoted, handleVoteClick, error };
};

export default VoteHandler;
