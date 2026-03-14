import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const searchBooks = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/books/search`, {
    params: { q: query }
  });
  return response.data;
};

export const generateReview = async (bookData) => {
  const response = await axios.post(`${API_BASE_URL}/reviews/generate`, bookData);
  return response.data;
};