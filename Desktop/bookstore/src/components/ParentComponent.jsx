import React from "react";
import BookDetails from "./BookDetails";

const ParentComponent = () => {
  const handleAddToCart = (book) => {
    console.log("Book added to cart:", book);
    // Add your cart logic here
  };

  const book = {
    title: "The Great Gatsby",
    description: "A novel set in the Jazz Age that explores themes of wealth, love, and the American Dream.",
    details: "Published in 1925, this book is a classic of American literature.",
    editions: ["First Edition", "Second Edition", "Collector's Edition"],
    author_name: ["F. Scott Fitzgerald"],
    author_key: ["OL12345A"],
    first_publish_year: 1925,
    language: ["en"],
    edition_count: 3,
  };

  return (
    <BookDetails
      book={book}
      onBack={() => console.log("Back to results")}
      onAddToCart={handleAddToCart}
    />
  );
};

export default ParentComponent;