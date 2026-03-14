const axios = require('axios');

const searchBooks = async (query) => {
  try {
    // We use the 'volumes' endpoint which is a true search engine.
    // Notice: No 'key' parameter is required for basic searches!
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
      params: {
        q: query,
        maxResults: 10,
        printType: 'books'
      }
    });

    if (!response.data.items) return [];

    return response.data.items.map(book => ({
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || ['Unknown Author'],
      description: book.volumeInfo.description || 'No description available.',
      thumbnail: book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150?text=No+Cover',
      categories: book.volumeInfo.categories || []
    }));
  } catch (error) {
    console.log(error)
    console.error('Search Error:', error.message);
    throw new Error('Failed to fetch book data');
  }
};

module.exports = { searchBooks };