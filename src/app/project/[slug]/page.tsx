"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Play, Pause } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import BottomNavBar from "@/components/BottomNavBar"
import { projects } from "@/lib/data"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: scrollRef })
  const [isPlaying, setIsPlaying] = useState(false)
  const [showLyrics, setShowLyrics] = useState(false)

  // Animation pour l'opacité du header basée sur le scroll
  const headerOpacity = useTransform(scrollY, [0, 150], [0, 1])
  const imageScale = useTransform(scrollY, [0, 150], [1, 0.8])
  const imageOpacity = useTransform(scrollY, [0, 150], [1, 0.3])

  // Définir le dégradé de couleurs en fonction du projet
  let gradientStyle = "from-black via-black to-black"
  let accentColor = "#1DB954" // Couleur Spotify par défaut
  let bgColor = "bg-[#121212]"

  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    router.push("/")
    return null
  }

  // Dégradé spécifique pour chaque projet
  if (project.slug === "bdd3m") {
    gradientStyle = "from-[#000000]/95 via-[#1a1a1a]/90 to-[#2a2a2a]/95"
    accentColor = "#ff4b4b"
    bgColor = "bg-[#000000]"
  } else if (project.slug === "bddbinko") {
    gradientStyle = "from-[#2b5876]/90 via-[#1a1a2a]/80 to-[#4e4376]/90"
    accentColor = "#4e4376"
  } else if (project.slug === "unfly") {
    // Nouveau dégradé adapté à l'image Unfly (noir, gris foncé, avec accent blanc)
    gradientStyle = "from-[#0a0a0a]/95 via-[#1a1a1a]/90 to-[#2a2a2a]/95"
    accentColor = "#ffffff"
    bgColor = "bg-[#0a0a0a]"
  } else if (project.slug === "tete") {
    gradientStyle = "from-[#4a0072]/90 via-[#9c0063]/80 to-[#ff5e62]/90"
    accentColor = "#ff5e62"
    bgColor = "bg-[#4a0072]"
  } else if (project.slug === "histia") {
    // Nouveau dégradé adapté à l'image Her Third Place (bordeaux/doré)
    gradientStyle = "from-[#6b0f1a]/90 via-[#8a0f23]/80 to-[#a71b34]/90"
    accentColor = "#d4af37" // Or/doré
    bgColor = "bg-[#6b0f1a]"
  } else if (project.slug === "htp") {
    gradientStyle = "from-[#8e2de2]/90 via-[#6a11cb]/80 to-[#4a00e0]/90"
    accentColor = "#6a11cb"
  }

  // Basculer entre l'affichage de l'image et des paroles
  const toggleLyrics = () => {
    setShowLyrics(!showLyrics)
    if (!showLyrics && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: 300,
          behavior: "smooth",
        })
      }, 100)
    }
  }

  return (
    <motion.main
      className={`min-h-screen ${bgColor} bg-gradient-to-b ${gradientStyle} text-white`}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header fixe avec le titre du projet */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-md"
        style={{ opacity: headerOpacity }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-lg font-bold">{project.title}</h1>
          </div>
          <button
            onClick={toggleLyrics}
            className="text-sm font-medium bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
          >
            {showLyrics ? "Voir image" : "Voir paroles"}
          </button>
        </div>
      </motion.div>

      {/* Contenu scrollable */}
      <div
        ref={scrollRef}
        className="h-screen overflow-y-auto pt-16 pb-20 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Section image du projet */}
        <div className="px-4 py-6">
          <motion.div
            className="relative aspect-square max-w-sm mx-auto rounded-lg overflow-hidden shadow-2xl"
            style={{
              scale: imageScale,
              opacity: imageOpacity,
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradientStyle} -z-10 blur-xl opacity-50`}
              style={{ transform: "scale(1.2)" }}
            />
            <Image
              src={project.cover || "/placeholder.svg?height=500&width=500"}
              alt={project.title}
              fill
              className={`object-contain p-2 ${
                project.slug === "unfly" ? "bg-[#0a0a0a]" : project.slug === "histia" ? "bg-[#6b0f1a]" : ""
              }`}
              priority
            />
          </motion.div>

          {/* Informations du projet */}
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <p className="text-gray-400 text-sm mt-1">Projet</p>

            {/* Bouton play/pause */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`rounded-full p-3 shadow-lg transition-colors ${
                  project.slug === "unfly" ? "text-black" : ""
                }`}
                style={{ backgroundColor: accentColor }}
              >
                {isPlaying ? (
                  <Pause
                    className={`h-6 w-6 ${project.slug === "unfly" || project.slug === "histia" ? "text-black" : ""}`}
                    fill="black"
                  />
                ) : (
                  <Play
                    className={`h-6 w-6 ${project.slug === "unfly" || project.slug === "histia" ? "text-black" : ""}`}
                    fill="black"
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="h-px bg-white/10 my-6 mx-4" />

        {/* Section paroles */}
        <div className="px-6 pb-20">
          <h3 className="text-xl font-bold mb-6">Paroles</h3>
          <div className="space-y-6 text-white/80">
            {project.lyrics.split("\n\n").map((paragraph, index) => (
              <div key={index} className="space-y-2">
                {paragraph.split("\n").map((line, lineIndex) => (
                  <p
                    key={`${index}-${lineIndex}`}
                    className={`text-lg ${
                      line.trim().startsWith("•") || line.trim().startsWith("    •")
                        ? "pl-8 relative before:content-['•'] before:absolute before:left-0 before:text-[#1DB954]"
                        : line.trim().startsWith("    ")
                          ? "pl-8"
                          : ""
                    }`}
                  >
                    {line.trim().startsWith("•") || line.trim().startsWith("    •")
                      ? line.replace(/^(\s*)•\s*/, "")
                      : line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavBar />
    </motion.main>
  )
}
