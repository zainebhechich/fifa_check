"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Book,
  User,
  Calendar,
  Globe,
  BookOpen,
  Star,
  Heart,
  Share2,
  ExternalLink,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { motion } from "framer-motion";

export default function BookDetails({ book, onBack, onAddToCart }) {
  const [activeTab, setActiveTab] = useState("details");
  const [quantity, setQuantity] = useState(1);
  const [isSaved, setIsSaved] = useState(false); // State to track if the book is saved

  const handleSave = () => {
    setIsSaved((prev) => !prev); // Toggle the saved state
    console.log(isSaved ? "Book removed from saved list" : "Book saved:", book);
  };

  // Fallback for missing book data
  if (!book || Object.keys(book).length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p>No book details available.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back
        </button>
      </div>
    );
  }

  const getBookCover = (book, size = "L") => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg`;
    }
    return "/abstract-book-cover.png";
  };

  const getAuthorImage = (authorKey, size = "M") => {
    if (!authorKey) return null;
    return `https://covers.openlibrary.org/a/olid/${authorKey}-${size}.jpg`;
  };

  const getRatingStars = (rating) => {
    if (!rating) return null;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-5 w-5 text-yellow-400" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="h-5 w-5 text-yellow-400" />
        ))}
        <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getBookPrice = () => {
    const basePrice = book.edition_count ? Math.min(book.edition_count, 30) : 15;
    const randomFactor = 0.8 + Math.random() * 0.4;
    return (basePrice * randomFactor).toFixed(2);
  };

  const bookPrice = getBookPrice();
  const isOnSale = Math.random() > 0.7;
  const originalPrice = isOnSale ? (Number.parseFloat(bookPrice) * 1.25).toFixed(2) : null;

  return (
    <div>
      <button
        className="mb-6 flex items-center text-slate-600 hover:text-slate-900 transition-colors"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to results
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="sticky top-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl overflow-hidden shadow-md bg-white border border-slate-200"
            >
              <img
                src={getBookCover(book) || "/placeholder.svg"}
                alt={book.title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = "/abstract-book-cover.png";
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 bg-white p-4 rounded-xl border border-slate-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600">Price:</span>
                <div className="flex items-center">
                  {isOnSale && (
                    <span className="line-through text-slate-400 mr-2">
                      ${originalPrice}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-slate-800">
                    ${bookPrice}
                  </span>
                </div>
              </div>

              {isOnSale && (
                <div className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded mb-3 inline-block">
                  Sale
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-600">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded">
                  <button
                    className="px-3 py-1 text-slate-600 hover:bg-slate-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border-x border-slate-200">
                    {quantity}
                  </span>
                  <button
                    className="px-3 py-1 text-slate-600 hover:bg-slate-100"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-sm text-slate-600 mb-4">
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>In Stock</span>
                </div>
                <div>Free shipping on orders over $35</div>
              </div>

              <div className="space-y-2">
                <button
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
                  onClick={() => onAddToCart({ ...book, quantity })}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>

                <div className="flex gap-2">
                  <button
                    className={`flex-1 flex items-center justify-center gap-2 ${
                      isSaved ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-700"
                    } hover:bg-slate-200 py-2 px-4 rounded-lg transition-colors`}
                    onClick={handleSave}
                  >
                    <Heart className="h-5 w-5" />
                    <span>{isSaved ? "Saved" : "Save"}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-lg transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {book.ia && book.ia.length > 0 && (
              <div className="mt-4">
                <a
                  href={`https://archive.org/details/${book.ia[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors w-full"
                >
                  <Book className="h-5 w-5" />
                  <span>Read Online</span>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
          >
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {book.title}
            </h1>

            {book.author_name && (
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 mr-2 text-slate-500" />
                <span className="text-lg text-slate-600">
                  {book.author_name.join(", ")}
                </span>
              </div>
            )}

            {book.ratings_average && (
              <div className="mb-4">{getRatingStars(book.ratings_average)}</div>
            )}

            <p className="text-slate-600 mb-6">
              {book.description || "No description available."}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {book.first_publish_year && (
                <span className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                  <Calendar className="h-4 w-4" />
                  {book.first_publish_year}
                </span>
              )}

              {book.edition_count && (
                <span className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                  <BookOpen className="h-4 w-4" />
                  {book.edition_count} editions
                </span>
              )}

              {book.language && book.language.length > 0 && (
                <span className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                  <Globe className="h-4 w-4" />
                  {book.language.map((lang) => lang.toUpperCase()).join(", ")}
                </span>
              )}

              <span className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                <DollarSign className="h-4 w-4" />${bookPrice}
              </span>
            </div>

            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="editions">Editions</TabsTrigger>
                <TabsTrigger value="author">Author</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4 space-y-6">
                {book.subject && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Subjects</h3>
                    <div className="flex flex-wrap gap-2">
                      {book.subject.slice(0, 15).map((subject, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                        >
                          {subject}
                        </span>
                      ))}
                      {book.subject.length > 15 && (
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                          +{book.subject.length - 15} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-medium mb-3">About this book</h3>
                  <p className="text-slate-600">
                    This book was first published in{" "}
                    {book.first_publish_year || "unknown year"}
                    {book.language && book.language.length > 0
                      ? ` in ${book.language
                          .map((lang) => lang.toUpperCase())
                          .join(", ")}`
                      : ""}
                    .
                    {book.edition_count
                      ? ` It has been published in ${book.edition_count} editions.`
                      : ""}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">External Links</h3>
                  <div className="space-y-2">
                    <a
                      href={`https://openlibrary.org${book.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Open Library
                    </a>

                    {book.ia && book.ia.length > 0 && (
                      <a
                        href={`https://archive.org/details/${book.ia[0]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Internet Archive
                      </a>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="editions" className="mt-4">
                {book.editions && book.editions.docs && book.editions.docs.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">
                      This work has {book.editions.numFound || "multiple"} editions.
                    </p>
                    <div className="grid gap-4">
                      {book.editions.docs.map((edition, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-medium">{edition.title}</h4>
                          {edition.language && (
                            <p className="text-sm text-slate-600 mt-1">
                              Language:{" "}
                              {edition.language
                                .map((lang) => lang.toUpperCase())
                                .join(", ")}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-medium text-indigo-600">
                              $
                              {(
                                Number.parseFloat(bookPrice) *
                                (0.9 + Math.random() * 0.2)
                              ).toFixed(2)}
                            </span>
                            {edition.ebook_access && (
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-sm ${
                                  edition.ebook_access === "public"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {edition.ebook_access === "public"
                                  ? "Available as eBook"
                                  : edition.ebook_access}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-600">No edition information available.</p>
                )}
              </TabsContent>

              <TabsContent value="author" className="mt-4">
                {book.author_key && book.author_key.length > 0 ? (
                  <div className="space-y-6">
                    {book.author_key.map((key, index) => (
                      <div key={index} className="bg-slate-50 p-5 rounded-xl">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200">
                            <img
                              src={getAuthorImage(key) || "/placeholder.svg"}
                              alt={book.author_name?.[index] || "Author"}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/thoughtful-author.png";
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-medium">
                              {book.author_name?.[index] || "Author"}
                            </h3>
                            <a
                              href={`https://openlibrary.org/authors/${key}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 transition-colors flex items-center mt-2"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View author profile
                            </a>
                            <p className="text-slate-600 mt-3">
                              Author of {book.title} and other works. Click the
                              link above to view more information about this
                              author.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600">No author information available.</p>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      <button
        onClick={() => onAddToCart({ ...book, quantity })}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
}

// ParentComponent.jsx


const ExistingParent = () => {
  const book = {
    title: "The Great Gatsby",
    description: "A novel set in the Jazz Age that explores themes of wealth, love, and the American Dream.",
    author_name: ["F. Scott Fitzgerald"],
    first_publish_year: 1925,
    language: ["en"]
  };

  return (
    <BookDetails
      book={book}
      onBack={() => console.log("Back to results")}
      onAddToCart={(book) => console.log("Book added to cart:", book)}
    />
  );
};

