const Book = require('../models/Book');

// Controller function for GET request (fetch all books)
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();  // Retrieve all books from the database
    res.status(200).json(books);  // Return the books in the response
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch books', error: err });
  }
};

// Controller function for POST request (create a new book)
const createBook = async (req, res) => {
  const { title, author, description, price } = req.body;  // Extract book data from the request body

  // Create a new book document with the data
  const newBook = new Book({
    title,
    author,
    description,
    price,
  });

  try {
    const savedBook = await newBook.save();  // Save the book to the database
    res.status(201).json(savedBook);  // Return the saved book in the response
  } catch (err) {
    res.status(500).json({ message: 'Failed to create book', error: err });
  }
};

module.exports = { getBooks, createBook };
