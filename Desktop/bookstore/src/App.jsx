"use client";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import NewReleases from "./pages/NewReleases";
import BestSellers from "./pages/BestSellers";
import BookDetails from "./components/BookDetails";
import LoginModal from "./components/LoginModal";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import BookList from "./components/BookList";
import ParentComponent from "./components/ParentComponent";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [books, setBooks] = useState([]); // State to store books

  function App() {
    return (
      <div className="App">
        <ParentComponent />
      </div>
    );
  }


  // Fetch books from the API
  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the fetched books
        setBooks(data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);
  
  const handleBookSelect = (book) => {
    setSelectedBook(book);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToResults = () => {
    setSelectedBook(null);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleAddToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]); // Add book to cart
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <Navbar onLoginClick={toggleLoginModal} />

        {selectedBook ? (
          <div className="container mx-auto px-4 py-8">
            <BookDetails
              book={selectedBook}
              onBack={handleBackToResults}
              onAddToCart={handleAddToCart}
            />
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Home books={books} onBookSelect={handleBookSelect} />}
            />
            <Route
              path="/categories"
              element={<Categories books={books} onBookSelect={handleBookSelect} />}
            />
            <Route
              path="/new-releases"
              element={<NewReleases books={books} onBookSelect={handleBookSelect} />}
            />
            <Route
              path="/best-sellers"
              element={<BestSellers books={books} onBookSelect={handleBookSelect} />}
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
            <Route path="/books" element={<BookList books={books} onBookSelect={(book) => console.log(book)} />} />
          </Routes>
        )}

        {isLoginModalOpen && <LoginModal onClose={toggleLoginModal} />}
      </div>
    </Router>
  );
}

export default App;
