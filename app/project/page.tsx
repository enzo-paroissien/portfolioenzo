"use client"

import { FocusCards } from "@/components/focus-cards"
import { NavBar } from "@/components/navbar"
import { Home, Briefcase, Mail, Zap } from "lucide-react"

export default function ProjectPage() {
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Project", url: "/project", icon: Briefcase },
    { name: "Contact", url: "/contact", icon: Mail },
    { name: "Skills", url: "/skills", icon: Zap },
  ]

  const projects = [
    {
      title: "UNFFLY",
      src: "/project-unffly.png",
      onClick: () => window.open("#", "_blank"),
    },
    {
      title: "Brand Partners",
      src: "/project-malt-make.png",
      onClick: () => window.open("#", "_blank"),
    },
    {
      title: "Timeline Design",
      src: "/project-timeline.png",
      onClick: () => window.open("#", "_blank"),
    },
  ]

  return (
    <main>
      <NavBar items={navItems} />
      <section className="min-h-screen pt-32 pb-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-16 text-center text-white" style={{ WebkitTextStroke: "1px white" }}>
            My Projects
          </h1>
          <FocusCards cards={projects} />
        </div>
      </section>
    </main>
  )
}
