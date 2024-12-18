import axios from 'axios';

const BASE_URL = 'https://project-news-liliia.onrender.com/api';

export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/articles`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const fetchArticleById = (article_id) => {
  return axios.get(`${BASE_URL}/articles/${article_id}`)
    .then((response) => response.data.article);
};

export const fetchCommentsByArticleId = (article_id) => {
  return axios.get(`${BASE_URL}/articles/${article_id}/comments`)
    .then((response) => response.data.comments);
};