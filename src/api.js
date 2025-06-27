import axios from 'axios';
import buildQueryParams from '../src/components/SortByParams';

const BASE_URL = 'https://project-news-liliia.onrender.com/api';


export const fetchArticles = () => {
  return axios.get(`${BASE_URL}/articles`)
    .then((response) => response.data.articles);
};

export const fetchArticleById = (article_id) => {
  return axios.get(`${BASE_URL}/articles/${article_id}`)
    .then((response) => response.data.article);
};

export const fetchCommentsByArticleId = (article_id) => {
  return axios.get(`${BASE_URL}/articles/${article_id}/comments`)
    .then((response) => response.data.comments);
};


export const fetchArticlesWithParams = ({ topic, sortBy = 'created_at', order = 'desc' } = {}) => {
  const query = new URLSearchParams({
    sort_by: sortBy,
    order: order,
    ...(topic && { topic }),
  }).toString();

  return axios.get(`${BASE_URL}/articles?${query}`)
    .then((response) => response.data.articles)
    .catch((error) => {
      console.error("Error fetching articles:", error);
      throw new Error("Failed to load articles.");
    });
};

export const updateArticleVotes = (article_id, inc_votes) => {
  return axios.patch(`${BASE_URL}/articles/${article_id}`, { inc_votes })
    .then((response) => response.data.article);
};

export const postComment = (article_id, commentData) => {
  return axios.post(`${BASE_URL}/articles/${article_id}/comments`, commentData)
    .then((response) => response.data.comment);
};

export const deleteComment = (comment_id) => {
  return axios.delete(`${BASE_URL}/comments/${comment_id}`)
    .then(() => null);
};

export const fetchTopics = () => {
  return axios.get(`${BASE_URL}/topics`)
    .then((response) => response.data.topics);
};
