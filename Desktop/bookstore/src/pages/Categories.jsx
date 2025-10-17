"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import BookGrid from "../components/BookGrid"
import { motion } from "framer-motion"

export default function Categories({ onBookSelect }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const categories = [
    { name: "Fiction", query: "fiction", color: "bg-blue-100 text-blue-800", icon: "📚" },
    { name: "Science Fiction", query: "science fiction", color: "bg-purple-100 text-purple-800", icon: "🚀" },
    { name: "Fantasy", query: "fantasy", color: "bg-indigo-100 text-indigo-800", icon: "🧙" },
    { name: "Mystery", query: "mystery", color: "bg-red-100 text-red-800", icon: "🔍" },
    { name: "Romance", query: "romance", color: "bg-pink-100 text-pink-800", icon: "❤️" },
    { name: "Biography", query: "biography", color: "bg-green-100 text-green-800", icon: "👤" },
    { name: "History", query: "history", color: "bg-amber-100 text-amber-800", icon: "🏛️" },
    { name: "Self-Help", query: "self-help", color: "bg-teal-100 text-teal-800", icon: "🧠" },
    { name: "Business", query: "business", color: "bg-cyan-100 text-cyan-800", icon: "💼" },
    { name: "Cooking", query: "cooking", color: "bg-lime-100 text-lime-800", icon: "🍳" },
    { name: "Travel", query: "travel", color: "bg-orange-100 text-orange-800", icon: "✈️" },
    { name: "Children's", query: "children's", color: "bg-emerald-100 text-emerald-800", icon: "🧸" },
  ]

  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryBooks(selectedCategory.query)
    }
  }, [selectedCategory])

  const fetchCategoryBooks = async (query) => {
    setLoading(true)
    setError(null)

    try {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12&sort=rating`
      const response = await fetch(url)
      const data = await response.json()

      if (data.docs && data.docs.length > 0) {
        setBooks(data.docs)
      } else {
        setBooks([])
      }
    } catch (err) {
      setError("Failed to fetch books. Please try again.")
      console.error("Error fetching books:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    window.scrollTo({ top: 0, behavior: "smooth" })
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
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Browse by Category</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Explore our extensive collection of books across various genres and categories
        </p>
      </div>

      {selectedCategory ? (
        <div>
          <div className="mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Categories
            </button>
          </div>

          <div className={`p-6 rounded-xl mb-8 ${selectedCategory.color}`}>
            <h2 className="text-2xl font-bold flex items-center">
              <span className="mr-2">{selectedCategory.icon}</span>
              {selectedCategory.name}
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
          ) : (
            <BookGrid books={books} onBookSelect={onBookSelect} view="grid" />
          )}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={item}
              className={`${category.color} p-6 rounded-xl hover:shadow-lg transition-all cursor-pointer`}
              onClick={() => handleCategorySelect(category)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="text-xl font-bold">{category.name}</h3>
              <p className="mt-1 text-sm opacity-80">Explore our collection of {category.name.toLowerCase()} books</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
