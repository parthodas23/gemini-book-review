const express = require('express');
const router = express.Router();
const { searchBooks } = require('../services/googleBooksService.js');

// get /api/books/search?q=hobbit
router.get('/search', async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const books = await searchBooks(q);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;