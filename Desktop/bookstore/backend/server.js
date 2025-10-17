// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'your_mongodb_connection_string';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.get('/api/books', (req, res) => {
  res.json({ message: 'Books endpoint is working!' });
});

app.post('/api/books', (req, res) => {
  const { title, author, description, price } = req.body;
  // Add logic to save the book to the database
  res.status(201).json({ message: 'Book added successfully!', book: req.body });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
