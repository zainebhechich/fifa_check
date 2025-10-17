const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  description: String,
  price: Number,
  imageUrl: String
});

module.exports = mongoose.model('Book', bookSchema);