"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import SearchBar from "../components/SearchBar"
import BookGrid from "../components/BookGrid"
import FeaturedBooks from "../components/FeaturedBooks"
import BookCategories from "../components/BookCategories"
import { TextGenerateEffect } from "../components/ui/TextGenerateEffect"
import { BackgroundBeams } from "../components/ui/BackgroundBeams"
import { SparklesCore } from "../components/ui/SparklesCore"

export default function Home({ onBookSelect }) {
  const [searchResults, setSearchResults] = useState([])
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    fetchFeaturedBooks()
  }, [])

  const fetchFeaturedBooks = async () => {
    try {
      const response = await fetch("https://openlibrary.org/search.json?q=bestseller&limit=4")
      const data = await response.json()
      if (data.docs && data.docs.length > 0) {
        setFeaturedBooks(data.docs)
      }
    } catch (err) {
      console.error("Error fetching featured books:", err)
    }
  }

  const handleSearch = async (query, searchType) => {
    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const url = `https://openlibrary.org/search.json?${searchType}=${encodeURIComponent(query)}&limit=12`
      const response = await fetch(url)
      const data = await response.json()

      if (data.docs && data.docs.length > 0) {
        setSearchResults(data.docs)
      } else {
        setSearchResults([])
      }
    } catch (err) {
      setError("Failed to fetch search results. Please try again.")
      console.error("Error fetching search results:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-12 mb-12 shadow-xl">
        <BackgroundBeams className="z-0" />
        <div className="relative z-10 text-center">
          <div className="mb-2 flex justify-center">
            <div className="relative w-16 h-16">
              <SparklesCore
                id="sparkles"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                particleColor="#fff"
                className="w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">✨</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <TextGenerateEffect words="Discover Your Next Favorite Book" className="inline" />
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Explore our vast collection of books across various genres and find your perfect read
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
      ) : hasSearched ? (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Search Results</h2>
          <BookGrid books={searchResults} onBookSelect={onBookSelect} />
        </div>
      ) : (
        <>
          <div className="mb-12">
            <FeaturedBooks books={featuredBooks} onBookSelect={onBookSelect} />
          </div>

          <div className="mb-12">
            <BookCategories onCategoryClick={handleSearch} />
          </div>
        </>
      )}
    </div>
  )
}
