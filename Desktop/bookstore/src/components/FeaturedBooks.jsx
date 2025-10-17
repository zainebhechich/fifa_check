"use client"

import { motion } from "framer-motion"
import { DollarSign } from "lucide-react"

export default function FeaturedBooks({ books, onBookSelect }) {
  if (!books || books.length === 0) {
    return null
  }

  const getBookCover = (book, size = "M") => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg`
    }
    return "/abstract-book-cover.png"
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
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section>
      <motion.h2
        className="text-3xl font-bold mb-8 text-slate-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Featured Books
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {books.slice(0, 4).map((book) => (
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
                <div className="text-sm text-slate-600 mt-1 line-clamp-1">{book.author_name.join(", ")}</div>
              )}
              <div className="mt-auto pt-2 flex items-center text-indigo-600 font-medium">
                <DollarSign className="h-4 w-4 mr-1" />
                {getBookPrice(book)}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
