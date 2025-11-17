"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Library } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BottomNavBar() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Accueil", href: "/" },
    { icon: Search, label: "Recherche", href: "/search" },
    { icon: Library, label: "Bibliothèque", href: "/skills" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-[#282828] px-2 py-2 z-20">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/" && pathname.startsWith("/project")) ||
            (item.href === "/skills" && pathname === "/skills") ||
            (item.href === "/search" && pathname === "/search")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("flex flex-col items-center p-2", isActive ? "text-white" : "text-gray-400")}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className={cn("h-6 w-6", isActive && "text-white")} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
