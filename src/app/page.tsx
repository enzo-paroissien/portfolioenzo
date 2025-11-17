"use client"

import CategoryTabs from "@/components/CategoryTabs"
import PlaylistCard from "@/components/PlaylistCard"
import BottomNavBar from "@/components/BottomNavBar"
import ContactButton from "@/components/ContactButton"
import { projects, skills } from "@/lib/data"
import { InView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Folder, Mic2, Palette } from "lucide-react"
import { useState } from "react"

const skillDescriptions: Record<string, string> = {
  "Landing pages IA":
    "Création de landing pages optimisées utilisant des outils d'IA pour générer rapidement des pages performantes et attrayantes.",
  "Agents conversationnels":
    "Développement de chatbots intelligents capables de comprendre et répondre aux demandes des utilisateurs de manière naturelle.",
  "Prompt-engineering":
    "Art de formuler des instructions précises pour maximiser la qualité et la pertinence des réponses des modèles d'IA.",
  "Intégration LLM":
    "Intégration de grands modèles de langage dans les applications pour ajouter des capacités de traitement du langage naturel.",
  "Études de marché":
    "Analyse approfondie des tendances, concurrents et comportements des consommateurs pour éclairer les stratégies commerciales.",
  "Analyses SWOT":
    "Évaluation des forces, faiblesses, opportunités et menaces pour développer des stratégies commerciales solides.",
  "Stratégies 360°":
    "Approche holistique du marketing couvrant tous les canaux et touchpoints pour maximiser l'impact des campagnes.",
  "Growth hacking":
    "Techniques créatives et data-driven pour accélérer la croissance et l'acquisition d'utilisateurs de manière économique.",
  "Logo & identité":
    "Création d'identités visuelles uniques et cohérentes qui reflètent l'essence et les valeurs d'une marque.",
  "Direction artistique":
    "Pilotage de la vision créative globale d'un projet ou d'une marque pour assurer la cohérence visuelle et narrative.",
  Communication:
    "Développement de messages clairs et impactants pour communiquer efficacement avec les audiences cibles.",
  "Sites web": "Conception et développement de sites web performants, esthétiques et orientés vers la conversion.",
}

export default function Home() {
  const router = useRouter()
  const [expandedSkills, setExpandedSkills] = useState<string[]>([])

  const toggleSkill = (skillName: string) => {
    setExpandedSkills((prev) => (prev.includes(skillName) ? prev.filter((s) => s !== skillName) : [...prev, skillName]))
  }

  const skillIcons = {
    "AI Lab": <Mic2 className="h-8 w-8 text-purple-400" />,
    "Marketing Hub": <Folder className="h-8 w-8 text-blue-400" />,
    "Branding Studio": <Palette className="h-8 w-8 text-green-400" />,
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#121212] to-black text-white pb-20">
      <CategoryTabs />

      <section id="about-section" className="py-6">
        <div className="px-4">
          <h2 className="text-2xl font-bold mb-4">Bienvenue</h2>
          <p className="text-gray-300">
            Découvrez mon portfolio inspiré par Spotify. Naviguez entre les sections pour en savoir plus sur moi et mes
            projets.
          </p>
          <div className="mt-6 flex justify-center">
            <ContactButton />
          </div>
        </div>
      </section>

      <section id="projects-section" className="py-6">
        <div className="px-4">
          <h2 className="text-2xl font-bold mb-4">Projets récents</h2>

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
                        const card = e.currentTarget.querySelector(".playlist-card-container")
                        if (card) {
                          card.classList.add("playlist-card-clicked")
                        }
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
      </section>

      <section id="skills-section" className="py-6">
        <div className="px-4">
          <h2 className="text-2xl font-bold mb-4">Compétences</h2>

          <InView threshold={0.2} triggerOnce>
            {({ inView, ref }) => (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {Object.entries(skills).map(([key, category], categoryIndex) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3">
                      {skillIcons[category.title] || (
                        <div className="h-8 w-8 flex items-center justify-center">{category.icon}</div>
                      )}
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.button
                          key={skillIndex}
                          onClick={() => toggleSkill(skill)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                          className="bg-[#181818] hover:bg-[#282828] transition-colors p-4 rounded-md flex items-center space-x-3 text-left"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="w-10 h-10 bg-[#333333] rounded-md flex items-center justify-center">
                            {skillIcons[category.title] || <div>{category.icon}</div>}
                          </div>
                          <div>
                            <p className="font-medium">{skill}</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {category.skills.map((skill) =>
                        expandedSkills.includes(skill) ? (
                          <motion.div
                            key={`desc-${skill}`}
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="bg-[#282828] p-4 rounded-md overflow-hidden"
                          >
                            <p className="text-sm text-gray-300">{skillDescriptions[skill]}</p>
                          </motion.div>
                        ) : null,
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </InView>

          <div className="mt-4 text-center">
            <Link
              href="/skills"
              className="inline-block mt-4 px-6 py-2 bg-[#1DB954] text-black font-medium rounded-full hover:bg-opacity-80 transition-colors"
            >
              Voir toutes les compétences
            </Link>
          </div>
        </div>
      </section>

      <BottomNavBar />
    </main>
  )
}
