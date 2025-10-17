"use client"

import { motion } from "framer-motion"

export default function BookCategories({ onCategoryClick }) {
  const categories = [
    { name: "Fiction", query: "fiction", color: "bg-blue-100 text-blue-800" },
    { name: "Science Fiction", query: "science fiction", color: "bg-purple-100 text-purple-800" },
    { name: "Fantasy", query: "fantasy", color: "bg-indigo-100 text-indigo-800" },
    { name: "Mystery", query: "mystery", color: "bg-red-100 text-red-800" },
    { name: "Romance", query: "romance", color: "bg-pink-100 text-pink-800" },
    { name: "Biography", query: "biography", color: "bg-green-100 text-green-800" },
    { name: "History", query: "history", color: "bg-amber-100 text-amber-800" },
    { name: "Self-Help", query: "self-help", color: "bg-teal-100 text-teal-800" },
    { name: "Business", query: "business", color: "bg-cyan-100 text-cyan-800" },
    { name: "Cooking", query: "cooking", color: "bg-lime-100 text-lime-800" },
    { name: "Travel", query: "travel", color: "bg-orange-100 text-orange-800" },
    { name: "Children's", query: "children's", color: "bg-emerald-100 text-emerald-800" },
  ]

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
    <section>
      <motion.h2
        className="text-3xl font-bold mb-8 text-slate-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Browse by Category
      </motion.h2>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map((category) => (
          <motion.button
            key={category.name}
            variants={item}
            className={`${category.color} p-4 rounded-xl hover:shadow-md transition-shadow text-center`}
            onClick={() => onCategoryClick(category.query, "q")}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-medium">{category.name}</span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  )
}
