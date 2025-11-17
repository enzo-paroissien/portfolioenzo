"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { projects } from "@/lib/data"
import { skills } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"

export default function SearchClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<{
    projects: typeof projects
    skills: { category: string; skill: string; icon: string }[]
  }>({
    projects: [],
    skills: [],
  })
  const [isSearching, setIsSearching] = useState(false)

  // Effectuer la recherche lorsque la requête change
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ projects: [], skills: [] })
      setIsSearching(false)
      return
    }

    setIsSearching(true)

    // Recherche avec un léger délai pour éviter trop de recherches pendant la frappe
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim()

      // Rechercher dans les projets
      const filteredProjects = projects.filter(
        (project) => project.title.toLowerCase().includes(query) || project.lyrics.toLowerCase().includes(query),
      )

      // Rechercher dans les compétences
      const filteredSkills: { category: string; skill: string; icon: string }[] = []

      // Parcourir les catégories de compétences
      Object.entries(skills).forEach(([key, category]) => {
        category.skills.forEach((skill) => {
          if (skill.toLowerCase().includes(query) || category.title.toLowerCase().includes(query)) {
            filteredSkills.push({
              category: category.title,
              skill: skill,
              icon: category.icon,
            })
          }
        })
      })

      setSearchResults({
        projects: filteredProjects,
        skills: filteredSkills,
      })
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const hasResults = searchResults.projects.length > 0 || searchResults.skills.length > 0
  const hasSearched = searchQuery.trim() !== ""

  return (
    <div className="px-4 py-6">
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Recherchez des projets ou compétences"
          className="bg-[#242424] text-white w-full pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          aria-label="Rechercher"
        />
        {searchQuery && (
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setSearchQuery("")}
            aria-label="Effacer la recherche"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 hover:text-white"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isSearching && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1DB954]"></div>
          </div>
        )}

        {!isSearching && hasSearched && !hasResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col items-center justify-center h-[50vh] text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500 mb-4"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <h2 className="text-xl font-medium mb-2">Aucun résultat trouvé</h2>
            <p className="text-gray-400 max-w-md">Le contenu recherché n'existe pas</p>
          </motion.div>
        )}

        {!isSearching && hasSearched && hasResults && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
            {/* Résultats des projets */}
            {searchResults.projects.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Projets</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {searchResults.projects.map((project, index) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link href={`/project/${project.slug}`} className="block">
                        <div className="bg-[#181818] p-3 rounded-md hover:bg-[#282828] transition-all duration-300">
                          <div className="relative w-full aspect-square rounded-md overflow-hidden shadow-lg mb-3">
                            <Image
                              src={project.cover || "/placeholder.svg?height=300&width=300"}
                              alt={project.title}
                              fill
                              className="object-contain bg-[#181818]"
                            />
                          </div>
                          <h3 className="font-medium text-white truncate">{project.title}</h3>
                          <p className="text-[#B3B3B3] text-sm mt-1">Projet</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Résultats des compétences */}
            {searchResults.skills.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Compétences</h2>
                <div className="space-y-2">
                  {searchResults.skills.map((skillItem, index) => (
                    <motion.div
                      key={`${skillItem.category}-${skillItem.skill}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link href="/skills" className="block">
                        <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all duration-300 flex items-center space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-[#333333] rounded-md flex items-center justify-center">
                            <span className="text-xl">{skillItem.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{skillItem.skill}</h3>
                            <p className="text-[#B3B3B3] text-sm">{skillItem.category}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {!isSearching && !hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col items-center justify-center h-[50vh] text-center"
          >
            <Search className="h-16 w-16 text-gray-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Recherchez dans mon portfolio</h2>
            <p className="text-gray-400 max-w-md">Trouvez des projets, compétences ou informations spécifiques</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
