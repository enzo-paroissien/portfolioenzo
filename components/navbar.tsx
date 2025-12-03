"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, Mail, Zap, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Project", url: "/project", icon: Briefcase },
  { name: "News IA", url: "/news-ia", icon: Bot },
  { name: "Contact", url: "/contact", icon: Mail },
  { name: "Skills", url: "/skills", icon: Zap },
]

interface NavBarProps {
  className?: string
}

export function NavBar({ className }: NavBarProps) {
  const items = navItems
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(items.find((item) => item.url === pathname)?.name || items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setActiveTab(items.find((item) => item.url === pathname)?.name || items[0].name)
  }, [pathname, items])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-1/2 -translate-x-1/2 z-50 bottom-6 sm:bottom-auto sm:top-6",
        className,
      )}
    >
      <div className="pointer-events-auto flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-white",
                isActive && "bg-muted text-black",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
