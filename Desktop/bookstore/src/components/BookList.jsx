import React, { useState } from "react";
import { Heart, BookOpen, User, Info } from "lucide-react"; // Assuming you're using Lucide icons

const BookList = ({ books, onBookSelect }) => {
  const [savedBooks, setSavedBooks] = useState([]); // State to track saved books
  const [expandedSections, setExpandedSections] = useState({}); // State to track expanded sections for each book

  // Toggle save status for a book
  const toggleSaveBook = (bookId) => {
    setSavedBooks((prevSavedBooks) => {
      const updatedSavedBooks = prevSavedBooks.includes(bookId)
        ? prevSavedBooks.filter((id) => id !== bookId) // Remove if already saved
        : [...prevSavedBooks, bookId]; // Add if not saved

      console.log("Updated Saved Books:", updatedSavedBooks); // Log the updated state
      return updatedSavedBooks;
    });
  };

  // Toggle expanded section for a book
  const toggleSection = (bookId, section) => {
    setExpandedSections((prevSections) => ({
      ...prevSections,
      [bookId]: {
        ...prevSections[bookId],
        [section]: !prevSections[bookId]?.[section], // Toggle the specific section
      },
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => {
          console.log("Book ID:", book.id); // Log the book ID
          return (
            <div
              key={book.id}
              className="p-4 border rounded shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-sm text-gray-800">${book.price}</p>
              <p className="text-sm text-gray-500">{book.category}</p>

              {/* Save Button */}
              <button
                style={{
                  color: savedBooks.includes(book.id) ? "red" : "gray",
                }}
                onClick={() => toggleSaveBook(book.id)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    savedBooks.includes(book.id) ? "fill-current" : ""
                  }`}
                />
                <span>Save</span>
              </button>

              {/* Details Section */}
              <button
                className="mt-2 flex items-center gap-2 text-blue-500 hover:text-blue-700"
                onClick={() => toggleSection(book.id, "details")}
              >
                <Info className="h-5 w-5" />
                <span>{expandedSections[book.id]?.details ? "Hide Details" : "Show Details"}</span>
              </button>
              {expandedSections[book.id]?.details && (
                <div className="mt-4 bg-gray-100 p-4 rounded">
                  <h4 className="text-lg font-bold mb-2">Details</h4>
                  <p className="text-sm text-gray-600">{book.description || "No description available."}</p>
                </div>
              )}

              {/* Editions Section */}
              <button
                className="mt-2 flex items-center gap-2 text-blue-500 hover:text-blue-700"
                onClick={() => toggleSection(book.id, "editions")}
              >
                <BookOpen className="h-5 w-5" />
                <span>{expandedSections[book.id]?.editions ? "Hide Editions" : "Show Editions"}</span>
              </button>
              {expandedSections[book.id]?.editions && (
                <div className="mt-4 bg-gray-100 p-4 rounded">
                  <h4 className="text-lg font-bold mb-2">Editions</h4>
                  {book.editions && book.editions.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {book.editions.map((edition, index) => (
                        <li key={index}>{edition}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">No editions available.</p>
                  )}
                </div>
              )}

              {/* Author Section */}
              <button
                className="mt-2 flex items-center gap-2 text-blue-500 hover:text-blue-700"
                onClick={() => toggleSection(book.id, "author")}
              >
                <User className="h-5 w-5" />
                <span>{expandedSections[book.id]?.author ? "Hide Author" : "Show Author"}</span>
              </button>
              {expandedSections[book.id]?.author && (
                <div className="mt-4 bg-gray-100 p-4 rounded">
                  <h4 className="text-lg font-bold mb-2">Author</h4>
                  <p className="text-sm text-gray-600">{book.author || "No author information available."}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookList;
