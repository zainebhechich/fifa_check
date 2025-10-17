"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { BookOpen, Search, Menu, X, User } from "lucide-react"
import { motion } from "framer-motion"
import { HoverBorderGradient } from "./ui/HoverBorderGradient"

export default function Navbar({ onLoginClick }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-2 focus:outline-none group">
              <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition-colors">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                <div className="absolute inset-0 rounded-full border border-indigo-200 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
              </div>
              <span className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                Luminary
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" isActive={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/categories" isActive={location.pathname === "/categories"}>
              Categories
            </NavLink>
            <NavLink to="/new-releases" isActive={location.pathname === "/new-releases"}>
              New Releases
            </NavLink>
            <NavLink to="/best-sellers" isActive={location.pathname === "/best-sellers"}>
              Best Sellers
            </NavLink>

            <div className="flex items-center space-x-3">
              <HoverBorderGradient
                as={Link}
                to="/"
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-800 transition-all"
                containerClassName="rounded-full"
                from="rgb(79, 70, 229)"
                to="rgb(219, 39, 119)"
                fromOpacity={0.5}
                toOpacity={0.5}
              >
                <Search className="h-4 w-4 mr-2 inline-block" /> Search
              </HoverBorderGradient>

              <button
                onClick={onLoginClick}
                className="flex items-center space-x-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={onLoginClick}
              className="flex items-center space-x-1 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm transition-colors"
            >
              <User className="h-4 w-4" />
            </button>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-slate-200"
        >
          <div className="container mx-auto px-4 py-3 space-y-1">
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/categories" onClick={() => setIsMobileMenuOpen(false)}>
              Categories
            </MobileNavLink>
            <MobileNavLink to="/new-releases" onClick={() => setIsMobileMenuOpen(false)}>
              New Releases
            </MobileNavLink>
            <MobileNavLink to="/best-sellers" onClick={() => setIsMobileMenuOpen(false)}>
              Best Sellers
            </MobileNavLink>
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Search className="h-4 w-4 mr-2" /> Search
            </MobileNavLink>
          </div>
        </motion.div>
      )}
    </header>
  )
}

function NavLink({ to, isActive, children }) {
  return (
    <Link
      to={to}
      className={`text-slate-600 hover:text-indigo-600 font-medium transition-colors relative group ${
        isActive ? "text-indigo-600" : ""
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      ></span>
    </Link>
  )
}

function MobileNavLink({ to, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block py-2 px-3 text-slate-700 hover:bg-slate-50 rounded-md transition-colors flex items-center"
    >
      {children}
    </Link>
  )
}
