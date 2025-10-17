"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("q")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery, searchType)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
      </div>

      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="w-full sm:w-[180px] px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        <option value="q">All</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Search
      </button>
    </form>
  )
}
