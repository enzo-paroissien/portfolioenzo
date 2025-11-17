"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

interface PlaylistCardProps {
  slug?: string
  title: string
  cover: string
  description?: string
  recentlyPlayed?: boolean
}

export function PlaylistCard({ slug = "", title, cover, description, recentlyPlayed }: PlaylistCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    // Réinitialiser l'état après l'animation
    setTimeout(() => setIsClicked(false), 300)
  }

  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isClicked
          ? {
              scale: [1.05, 0.97, 1.02, 1],
              rotate: [0, -1, 1, 0],
              y: [0, -5, 0],
            }
          : {}
      }
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {isClicked && (
        <motion.div
          className="absolute inset-0 rounded-md z-10"
          style={{ backgroundColor: "rgba(29, 185, 84, 0.2)" }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <div className="block">
        <div className="relative aspect-square rounded-md overflow-hidden shadow-lg">
          <Image
            src={cover || "/placeholder.svg?height=300&width=300"}
            alt={title}
            fill
            className="object-contain bg-[#181818]"
          />

          {isHovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#1DB954] rounded-full p-3 shadow-lg"
              >
                <Play className="text-black h-6 w-6" fill="black" />
              </motion.div>
            </div>
          )}
        </div>

        <div className="mt-2">
          <h3 className="font-medium text-white truncate">{title}</h3>
          {description && <p className="text-[#B3B3B3] text-sm truncate">{description}</p>}
        </div>

        {isHovered && (
          <div className="w-full h-1 bg-[#535353] rounded-full mt-1 overflow-hidden">
            <motion.div
              className="h-full bg-[#1DB954]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Ajouter également un export par défaut pour la compatibilité
export default PlaylistCard
