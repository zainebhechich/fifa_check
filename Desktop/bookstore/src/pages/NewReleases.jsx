"use client"

import { useState, useEffect } from "react"
import { Loader2, Calendar } from "lucide-react"
import BookGrid from "../components/BookGrid"
import { motion } from "framer-motion"

export default function NewReleases({ onBookSelect }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeframe, setTimeframe] = useState("month")

  useEffect(() => {
    fetchNewReleases()
  }, [timeframe])

  const fetchNewReleases = async () => {
    setLoading(true)
    setError(null)

    try {
      // Get current year and month
      const now = new Date()
      const currentYear = now.getFullYear()
      let query = ""

      // Create query based on timeframe
      if (timeframe === "week") {
        query = `first_publish_year=${currentYear}`
      } else if (timeframe === "month") {
        query = `first_publish_year=${currentYear}`
      } else if (timeframe === "year") {
        query = `first_publish_year=${currentYear}`
      }

      // For demo purposes, we'll use a search with sorting by newest
      const url = `https://openlibrary.org/search.json?${query}&sort=new&limit=16`
      const response = await fetch(url)
      const data = await response.json()

      if (data.docs && data.docs.length > 0) {
        setBooks(data.docs)
      } else {
        setBooks([])
      }
    } catch (err) {
      setError("Failed to fetch new releases. Please try again.")
      console.error("Error fetching new releases:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">New Releases</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">Discover the latest and greatest books hot off the press</p>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              timeframe === "week" ? "bg-indigo-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50"
            } border border-slate-200`}
            onClick={() => setTimeframe("week")}
          >
            This Week
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              timeframe === "month" ? "bg-indigo-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50"
            } border-t border-b border-slate-200`}
            onClick={() => setTimeframe("month")}
          >
            This Month
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              timeframe === "year" ? "bg-indigo-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50"
            } border border-slate-200`}
            onClick={() => setTimeframe("year")}
          >
            This Year
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl mb-8 flex items-center"
      >
        <Calendar className="h-10 w-10 text-indigo-600 mr-4" />
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {timeframe === "week"
              ? "Released This Week"
              : timeframe === "month"
                ? "Released This Month"
                : "Released This Year"}
          </h2>
          <p className="text-slate-600">The newest additions to our collection, fresh from the publishers</p>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
      ) : books.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-100">
          <Calendar className="h-16 w-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-2xl font-medium text-slate-700">No new releases found</h3>
          <p className="text-slate-500 mt-2">Check back soon for updates</p>
        </div>
      ) : (
        <BookGrid books={books} onBookSelect={onBookSelect} view="grid" />
      )}
    </div>
  )
}
