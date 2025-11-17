"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function ContactButton() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => {
      router.push("/contact")
    }, 300)
  }

  return (
    <motion.button
      className="relative overflow-hidden rounded-full px-8 py-3 font-medium text-white shadow-lg"
      style={{
        backgroundImage: isClicked
          ? "linear-gradient(90deg, #1DB954, #4a0072, #ff5e62)"
          : isHovered
            ? "linear-gradient(90deg, #1DB954, #4a0072)"
            : "linear-gradient(90deg, #1DB954, #1ed760)",
        backgroundSize: "200% 100%",
        backgroundPosition: isClicked ? "100% 0%" : isHovered ? "50% 0%" : "0% 0%",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 0.3,
        backgroundPosition: {
          duration: 0.8,
          ease: "easeOut",
        },
      }}
    >
      <span className="relative z-10">Me contacter</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#4a0072] via-[#9c0063] to-[#ff5e62]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClicked ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
