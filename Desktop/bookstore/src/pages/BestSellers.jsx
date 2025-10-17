"use client"

import { useState, useEffect } from "react"
import { Loader2, Award, TrendingUp } from "lucide-react"
import BookGrid from "../components/BookGrid"
import { motion } from "framer-motion"

export default function BestSellers({ onBookSelect }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "fiction", name: "Fiction" },
    { id: "nonfiction", name: "Non-Fiction" },
    { id: "mystery", name: "Mystery" },
    { id: "romance", name: "Romance" },
    { id: "fantasy", name: "Fantasy" },
  ]

  useEffect(() => {
    fetchBestSellers()
  }, [category])

  const fetchBestSellers = async () => {
    setLoading(true)
    setError(null)

    try {
      let query = "bestseller"
      if (category !== "all") {
        query += ` ${category}`
      }

      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&sort=rating&limit=16`
      const response = await fetch(url)
      const data = await response.json()

      if (data.docs && data.docs.length > 0) {
        setBooks(data.docs)
      } else {
        setBooks([])
      }
    } catch (err) {
      setError("Failed to fetch bestsellers. Please try again.")
      console.error("Error fetching bestsellers:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Bestsellers</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Explore the most popular books that readers can't get enough of
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-4 py-2 text-sm font-medium rounded-full ${
                category === cat.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl mb-8 flex items-center"
      >
        <Award className="h-10 w-10 text-amber-600 mr-4" />
        <div>
          <h2 className="text-xl font-bold text-slate-800">Top Rated Books</h2>
          <p className="text-slate-600">The most highly rated and popular books among our readers</p>
        </div>
      </motion.div>

      <div className="mb-8">
        <div className="flex items-center text-slate-600 mb-4">
          <TrendingUp className="h-5 w-5 mr-2" />
          <span>
            Trending in {category === "all" ? "All Categories" : categories.find((c) => c.id === category)?.name}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
      ) : books.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-100">
          <Award className="h-16 w-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-2xl font-medium text-slate-700">No bestsellers found</h3>
          <p className="text-slate-500 mt-2">Try a different category</p>
        </div>
      ) : (
        <BookGrid books={books} onBookSelect={onBookSelect} view="grid" />
      )}
    </div>
  )
}
