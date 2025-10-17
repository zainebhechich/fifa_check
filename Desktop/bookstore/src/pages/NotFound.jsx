"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { BookX, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <BookX className="h-12 w-12 text-red-500" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 15 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center"
            >
              !
            </motion.div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-slate-800 mb-4">Page Not Found</h1>
        <p className="text-slate-600 mb-8">Sorry, the page you're looking for doesn't exist or has been moved.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/categories"
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 py-3 px-6 rounded-lg transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 p-6 bg-white rounded-xl border border-slate-200 max-w-lg w-full"
      >
        <h2 className="text-lg font-medium text-slate-800 mb-4">Looking for something to read?</h2>
        <p className="text-slate-600 mb-4">Try exploring our popular categories or check out the latest releases.</p>
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/new-releases"
            className="text-center py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-slate-700"
          >
            New Releases
          </Link>
          <Link
            to="/best-sellers"
            className="text-center py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-slate-700"
          >
            Best Sellers
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
