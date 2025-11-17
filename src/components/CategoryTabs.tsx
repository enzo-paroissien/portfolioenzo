"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-mobile"

type Category = {
  label: string
  href: string
  targetId?: string
  highlight?: boolean
}

const categories: Category[] = [
  { label: "About Me", href: "/about", targetId: "about-section" },
  { label: "Projets", href: "/projects", targetId: "projects-section" },
  { label: "Compétences", href: "/skills", targetId: "skills-section" },
  { label: "Me contacter", href: "/contact", highlight: true },
]

export default function CategoryTabs() {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleAboutMeClick = () => {
    if (isMobile && pathname === "/") {
      router.push("/about")
    } else {
      scrollToSection("about-section")
    }
  }

  return (
    <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm px-2 py-2">
      <div
        className="flex space-x-1 overflow-x-auto scrollbar-hide min-w-0"
        role="tablist"
        aria-label="Catégories de navigation"
      >
        {categories.map((category) => {
          const isActive = pathname === category.href || (pathname === "/" && category.href === "/projects")
          const isContact = category.highlight

          return (
            <div key={category.label} className="flex-shrink-0">
              {isMobile && pathname === "/" && !isContact && category.label === "About Me" ? (
                <button
                  onClick={handleAboutMeClick}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
                    isActive ? "bg-white text-black animate-pulse" : "bg-[#2a2a2a] text-white hover:bg-[#333333]",
                  )}
                  role="tab"
                  aria-selected={isActive}
                >
                  {category.label}
                </button>
              ) : isMobile && pathname === "/" && !isContact ? (
                <button
                  onClick={() => category.targetId && scrollToSection(category.targetId)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
                    isActive
                      ? "bg-white text-black animate-pulse"
                      : isContact
                        ? "bg-gradient-to-r from-[#1DB954] to-[#0d8a3e] text-white hover:opacity-90"
                        : "bg-[#2a2a2a] text-white hover:bg-[#333333]",
                  )}
                  role="tab"
                  aria-selected={isActive}
                >
                  {category.label}
                </button>
              ) : (
                <Link
                  href={category.href}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 inline-block",
                    isActive
                      ? "bg-white text-black animate-pulse"
                      : isContact
                        ? "bg-gradient-to-r from-[#1DB954] to-[#0d8a3e] text-white hover:opacity-90"
                        : "bg-[#2a2a2a] text-white hover:bg-[#333333]",
                  )}
                  role="tab"
                  aria-selected={isActive}
                >
                  {category.label}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
