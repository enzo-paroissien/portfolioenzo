"use client"

import { useState } from "react"
import CategoryTabs from "@/components/CategoryTabs"
import BottomNavBar from "@/components/BottomNavBar"
import { skills } from "@/lib/data"
import { Folder, Mic2, Palette } from "lucide-react"
import { motion } from "framer-motion"

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

export default function SkillsPage() {
  const [expandedSkills, setExpandedSkills] = useState<string[]>([])

  const toggleSkill = (skillName: string) => {
    setExpandedSkills((prev) => (prev.includes(skillName) ? prev.filter((s) => s !== skillName) : [...prev, skillName]))
  }

  const skillCategories = [
    {
      title: "IA",
      icon: <Mic2 className="h-8 w-8 text-purple-400" />,
      skills: skills.ai.skills,
    },
    {
      title: "Marketing",
      icon: <Folder className="h-8 w-8 text-blue-400" />,
      skills: skills.marketing.skills,
    },
    {
      title: "Branding",
      icon: <Palette className="h-8 w-8 text-green-400" />,
      skills: skills.branding.skills,
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#121212] to-black text-white pb-20">
      <CategoryTabs />

      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Bibliothèque de compétences</h1>

        <div className="space-y-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center space-x-3">
                {category.icon}
                <h2 className="text-xl font-bold">{category.title}</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <motion.button
                      onClick={() => toggleSkill(skill)}
                      className="bg-[#181818] hover:bg-[#282828] transition-colors p-4 rounded-md flex items-center space-x-3 text-left w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-12 h-12 bg-[#333333] rounded-md flex items-center justify-center flex-shrink-0">
                        {category.icon}
                      </div>
                      <div>
                        <p className="font-medium">{skill}</p>
                      </div>
                    </motion.button>

                    {expandedSkills.includes(skill) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="bg-[#282828] p-4 rounded-md overflow-hidden"
                      >
                        <p className="text-sm text-gray-300">{skillDescriptions[skill]}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavBar />
    </main>
  )
}
