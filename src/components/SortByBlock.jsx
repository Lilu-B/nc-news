import React from "react";

function SortBy({ sortBy, order, onSortChange, onOrderChange }) {
  return (
    <div className="sort-options">
      <label>
        Sort By:
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="created_at">Date</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comments</option>
        </select>
      </label>
      <label>
        Order:
        <select value={order} onChange={(e) => onOrderChange(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </div>
  );
}

export default SortBy;
