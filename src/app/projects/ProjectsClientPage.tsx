"use client"

import CategoryTabs from "@/components/CategoryTabs"
import PlaylistCard from "@/components/PlaylistCard"
import BottomNavBar from "@/components/BottomNavBar"
import { projects } from "@/lib/data"
import { InView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProjectsClientPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#121212] to-black text-white pb-20">
      <CategoryTabs />

      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Tous mes projets</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <InView key={project.slug} threshold={0.2} triggerOnce>
              {({ inView, ref }) => (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={`/project/${project.slug}`}
                    onClick={(e) => {
                      e.preventDefault()
                      // Animation sur la carte
                      const card = e.currentTarget.querySelector(".playlist-card-container")
                      if (card) {
                        card.classList.add("playlist-card-clicked")
                      }
                      // Navigation immédiate sans setTimeout
                      router.push(`/project/${project.slug}`)
                    }}
                  >
                    <div className="playlist-card-container">
                      <PlaylistCard slug={project.slug} title={project.title} cover={project.cover} />
                    </div>
                  </Link>
                </motion.div>
              )}
            </InView>
          ))}
        </div>
      </div>

      <BottomNavBar />
    </main>
  )
}
