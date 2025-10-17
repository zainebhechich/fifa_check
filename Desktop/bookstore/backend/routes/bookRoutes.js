const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { getBooks, createBook } = require('../controllers/bookController');

router.get('/', getBooks);
router.post('/', createBook);

const books = [
    { title: 'Book 1', author: 'Author 1' },
    { title: 'Book 2', author: 'Author 2' },
  ];
  
  router.get('/api/books', (req, res) => {
    res.json(books);
  });

// GET all books
router.get('/books', async (req, res) => {
    try {
      const books = await Book.find(); // Fetches all books from MongoDB
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;