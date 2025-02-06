const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: './config/.env' });

// Create Express app
const app = express();
const PORT = process.env.PORT || 6000;

// Middleware to parse JSON
app.use(express.json());

// Add this line for Mongoose compatibility
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Load the User model
const User = require('./models/User');

// GET: Retrieve all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Find all users
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
});

// POST: Add a new user
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;

  // Validation
  if (!name || !email || !age) {
    return res.status(400).json({ message: 'Name, email, and age are required' });
  }

  const user = new User({ name, email, age });

  try {
    const newUser = await user.save(); // Save user to the database
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update a user by ID
app.put('/users/:id', async (req, res) => {
  const { name, email, age } = req.body;

  // Optional validation for fields to be updated
  if (!name && !email && !age) {
    return res.status(400).json({ message: 'At least one field is required to update' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', deletedUserId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
