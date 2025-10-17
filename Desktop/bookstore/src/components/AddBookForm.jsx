import React, { useState } from 'react';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = { title, author, description, price };

    fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    })
      .then(response => response.json())
      .then(data => {
        setMessage('Book added successfully!');
        console.log('Book created:', data);
      })
      .catch(error => {
        setMessage('Error adding book');
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
        <button type="submit">Add Book</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddBookForm;
