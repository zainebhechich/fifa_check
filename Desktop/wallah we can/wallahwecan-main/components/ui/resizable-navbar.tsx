"use client"

// PHASE 1 i18n fix: normalize alias imports to relative paths
import { cn } from "../../lib/utils"
import { IconX, IconMenu2 } from "@tabler/icons-react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion" // Ensure framer-motion is used
import React, { useRef, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl" // PHASE 1 i18n fix

interface NavbarProps {
  children: React.ReactNode
  className?: string
}

interface NavBodyProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface NavItem {
  name: string
  link: string
  subItems?: { name: string; link: string }[]
}

interface NavItemsProps {
  items: NavItem[]
  className?: string
  onItemClick?: () => void
}

interface MobileNavProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface MobileNavHeaderProps {
  children: React.ReactNode
  className?: string
}

interface MobileNavMenuProps {
  children?: React.ReactNode
  className?: string
  isOpen: boolean
  onCloseAction: () => void
  items: NavItem[] // Ensure items prop is present for mobile menu
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState<boolean>(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  })

  return (
    <motion.div ref={ref} className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
          : child,
      )}
    </motion.div>
  )
}

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%", // Keep 90% for shrinking
        y: visible ? 20 : 0,
        borderRadius: visible ? "9999px" : "0px",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        // Removed max-w-7xl and min-width to allow animation to control width fully
        "relative z-[60] mx-auto hidden w-full flex-row items-center justify-between self-start bg-transparent px-6 py-3 lg:flex dark:bg-transparent",
        visible && "bg-white/90 dark:bg-neutral-950/90",
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null)
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100)
  })
  
  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden lg:flex flex-row items-center space-x-2 text-sm font-medium transition duration-200",
        className,
      )}
    >
      {items.map((item, idx) =>
        item.subItems ? (
          <DropdownMenu key={`dropdown-${idx}`}>
            <DropdownMenuTrigger asChild>
              <a
                onMouseEnter={() => setHovered(idx)}
                onClick={onItemClick}
                className={cn(
                  "relative px-4 py-2 font-semibold cursor-pointer flex items-center gap-1 transition-all duration-200",
                  // Not scrolled state
                  !isScrolled && "text-white drop-shadow-lg hover:text-orange-300",
                  // Scrolled state
                  isScrolled && "text-[rgb(28,52,94)] hover:text-orange-600",
                )}
              >
                {hovered === idx && (
                  <motion.div
                    layoutId="hovered"
                    className={cn(
                      "absolute inset-0 h-full w-full rounded-full backdrop-blur-sm",
                      isScrolled 
                        ? "bg-gradient-to-r from-[rgb(28,52,94)]/20 to-orange-500/20" 
                        : "bg-gradient-to-r from-orange-500/20 to-[rgb(28,52,94)]/20"
                    )}
                  />
                )}
                <span className="relative z-20 whitespace-nowrap">{item.name}</span>
                <ChevronDown className="h-4 w-4 relative z-20" />
              </a>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="dark:bg-neutral-900 dark:border-neutral-800">
              {item.subItems.map((subItem, subIdx) => (
                <DropdownMenuItem key={`sub-link-${subIdx}`} asChild>
                  <Link
                    href={subItem.link}
                    onClick={onItemClick}
                    className="cursor-pointer text-[rgb(28,52,94)] hover:text-orange-600 transition-colors duration-200"
                  >
                    {subItem.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href={item.link}
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className={cn(
              "relative px-4 py-2 font-semibold transition-all duration-200",
              // Not scrolled state
              !isScrolled && "text-white drop-shadow-lg hover:text-orange-300",
              // Scrolled state
              isScrolled && "text-[rgb(28,52,94)] hover:text-orange-600",
            )}
            key={`link-${idx}`}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className={cn(
                  "absolute inset-0 h-full w-full rounded-full backdrop-blur-sm",
                  isScrolled 
                    ? "bg-gradient-to-r from-[rgb(28,52,94)]/20 to-orange-500/20" 
                    : "bg-gradient-to-r from-orange-500/20 to-[rgb(28,52,94)]/20"
                )}
              />
            )}
            <span className="relative z-20 whitespace-nowrap">{item.name}</span>
          </Link>
        ),
      )}
    </motion.div>
  )
}

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "12px" : "0px", // Keep your desired border radius
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-4 py-2 lg:hidden", // Keep your desired padding
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return <div className={cn("flex w-full flex-row items-center justify-between", className)}>{children}</div>
}

export const MobileNavMenu = ({ children, className, isOpen, onCloseAction, items }: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }} // Keep y animation for smoother transition
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
            className,
          )}
        >
          {items.map((item, idx) => (
            <div key={`mobile-item-${idx}`} className="w-full">
              <Link
                href={item.link}
                onClick={onCloseAction}
                className="relative text-[rgb(28,52,94)] hover:text-orange-600 block w-full rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200"
              >
                <span className="block">{item.name}</span>
              </Link>
              {item.subItems && (
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  {item.subItems.map((subItem, subIdx) => (
                    <Link
                      key={`mobile-sub-link-${subIdx}`}
                      href={subItem.link}
                      onClick={onCloseAction}
                      className="relative text-[rgb(28,52,94)]/80 hover:text-orange-500 block w-full rounded-md px-3 py-1 text-sm font-medium hover:bg-gray-50 dark:hover:bg-neutral-850 transition-colors duration-200"
                    >
                      <span className="block">{subItem.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex w-full flex-col gap-4 mt-4 border-t border-gray-200 pt-4 dark:border-neutral-800">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const MobileNavToggle = ({
  isOpen,
  onClickAction,
}: {
  isOpen: boolean
  onClickAction: () => void
}) => {
  return isOpen ? (
    <IconX className="h-6 w-6 text-black dark:text-white" onClick={onClickAction} /> // Keep h-6 w-6
  ) : (
    <IconMenu2 className="h-6 w-6 text-black dark:text-white" onClick={onClickAction} /> // Keep h-6 w-6
  )
}

export const NavbarLogo = () => {
  const tBrand = useTranslations('Common.Brand') // PHASE 1 i18n fix
  return (
    <Link href="/" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black">
      <Image src="/wallah-logo.png" alt={tBrand('wwcLogoAlt')} width={120} height={40} className="object-contain" style={{ width: 'auto', height: 'auto' }} />
    </Link>
  )
}

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "dark" | "gradient"
} & (React.ComponentPropsWithoutRef<"a"> | React.ComponentPropsWithoutRef<"button">)) => {
  const baseStyles =
    "px-4 py-2 rounded-full font-semibold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 text-center text-sm whitespace-nowrap" // Ensure rounded-full and no inline-block

  const variantStyles = {
    primary:
      "bg-orange-600 text-white hover:bg-orange-700 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary:
      "bg-[rgb(28,52,94)] text-white hover:bg-[rgb(35,65,110)] shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-orange-500 to-orange-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  }

  if (href && (Tag as any) === "a") {
    return (
      <Link href={href} className={cn(baseStyles, variantStyles[variant], className)} {...(props as any)}>
        {children}
      </Link>
    )
  }
  return (
    <Tag href={href || undefined} className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </Tag>
  )
}
