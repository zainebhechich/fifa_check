"use client"

import { Book, User, Star, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

export default function BookGrid({ books, onBookSelect, view = "grid" }) {
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-100">
        <Book className="h-16 w-16 mx-auto text-slate-300 mb-4" />
        <h3 className="text-2xl font-medium text-slate-700">No books found</h3>
        <p className="text-slate-500 mt-2">Try searching for a different term</p>
      </div>
    )
  }

  const getBookCover = (book, size = "M") => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg`
    }
    return "/abstract-book-cover.png"
  }

  const getRatingStars = (rating) => {
    if (!rating) return null

    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <div className="flex items-center gap-1 mt-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-4 w-4 text-yellow-400" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="h-4 w-4 text-yellow-400" />
        ))}
        <span className="text-xs text-slate-500 ml-1">{rating.toFixed(1)}</span>
      </div>
    )
  }

  // Generate a random price based on the book's edition count or a default range
  const getBookPrice = (book) => {
    const basePrice = book.edition_count ? Math.min(book.edition_count, 30) : 15
    const randomFactor = 0.8 + Math.random() * 0.4 // Random factor between 0.8 and 1.2
    return (basePrice * randomFactor).toFixed(2)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  }

  if (view === "list") {
    return (
      <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
        {books.map((book) => (
          <motion.div
            key={book.key}
            variants={item}
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer bg-white rounded-xl border border-slate-200"
            onClick={() => onBookSelect(book)}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          >
            <div className="flex">
              <div className="w-32 h-48 flex-shrink-0 bg-slate-100">
                <img
                  src={getBookCover(book, "M") || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/abstract-book-cover.png"
                  }}
                />
              </div>
              <div className="p-5 flex-1">
                <h3 className="font-semibold text-xl line-clamp-1 text-slate-800">{book.title}</h3>
                {book.author_name && (
                  <div className="flex items-center text-sm text-slate-600 mt-2">
                    <User className="h-4 w-4 mr-1" />
                    <span className="line-clamp-1">{book.author_name.join(", ")}</span>
                  </div>
                )}

                {book.ratings_average && getRatingStars(book.ratings_average)}

                <div className="flex justify-between items-center mt-3">
                  <div className="flex flex-wrap gap-2">
                    {book.first_publish_year && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">
                        {book.first_publish_year}
                      </span>
                    )}
                    {book.edition_count && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">
                        {book.edition_count} editions
                      </span>
                    )}
                    {book.language && book.language[0] && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">
                        {book.language[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-indigo-600 font-medium">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {getBookPrice(book)}
                  </div>
                </div>

                {book.subject && book.subject.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {book.subject.slice(0, 3).map((subject, index) => (
                        <span key={index} className="text-xs text-blue-600">
                          {subject}
                          {index < Math.min(book.subject.length, 3) - 1 ? "," : ""}
                        </span>
                      ))}
                      {book.subject.length > 3 && (
                        <span className="text-xs text-slate-500">+{book.subject.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {books.map((book) => (
        <motion.div
          key={book.key}
          variants={item}
          className="overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full flex flex-col bg-white rounded-xl border border-slate-200 group"
          onClick={() => onBookSelect(book)}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="h-64 overflow-hidden bg-slate-100 relative">
            <img
              src={getBookCover(book, "M") || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = "/abstract-book-cover.png"
              }}
            />
            {book.first_publish_year && (
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium">
                {book.first_publish_year}
              </div>
            )}
            {Math.random() > 0.7 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                SALE
              </div>
            )}
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-semibold text-lg line-clamp-2 text-slate-800 group-hover:text-indigo-600 transition-colors">
              {book.title}
            </h3>
            {book.author_name && (
              <div className="flex items-center text-sm text-slate-600 mt-1">
                <User className="h-3 w-3 mr-1" />
                <span className="line-clamp-1">{book.author_name.join(", ")}</span>
              </div>
            )}

            {book.ratings_average && getRatingStars(book.ratings_average)}

            <div className="mt-auto pt-3 flex justify-between items-center">
              <div className="flex flex-wrap gap-1">
                {book.edition_count && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">
                    {book.edition_count} editions
                  </span>
                )}
                {book.language && book.language[0] && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">
                    {book.language[0].toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex items-center text-indigo-600 font-medium">
                <DollarSign className="h-4 w-4 mr-1" />
                {getBookPrice(book)}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
