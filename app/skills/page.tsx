"use client"

import { NavBar } from "@/components/navbar"
import RadialOrbitalTimeline from "@/components/radial-orbital-timeline"
import { Home, Briefcase, Mail, Zap, Code, Palette, Lightbulb } from "lucide-react"

export default function SkillsPage() {
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Project", url: "/project", icon: Briefcase },
    { name: "Contact", url: "/contact", icon: Mail },
    { name: "Skills", url: "/skills", icon: Zap },
  ]

  const skillsData = [
    {
      id: 1,
      title: "IA",
      date: "2024",
      content: "Artificial Intelligence and LLM Integration",
      category: "Tech",
      icon: Code,
      relatedIds: [2, 3],
      status: "completed" as const,
      energy: 95,
      subcategories: [
        "🔧 Développement & intégration IA",
        "Landing pages IA",
        "Agents conversationnels",
        "Intégration LLM",
        "🧠 Conception & optimisation IA",
        "Prompt-engineering",
      ],
    },
    {
      id: 2,
      title: "Marketing",
      date: "2023",
      content: "Marketing Strategy and Analysis",
      category: "Strategy",
      icon: Lightbulb,
      relatedIds: [1, 4],
      status: "completed" as const,
      energy: 88,
      subcategories: [
        "📊 Analyse & recherche",
        "Études de marché",
        "Analyses SWOT",
        "📈 Stratégie & croissance",
        "Stratégies 360°",
        "Growth hacking",
      ],
    },
    {
      id: 3,
      title: "Branding",
      date: "2023",
      content: "Visual Identity and Communication",
      category: "Design",
      icon: Palette,
      relatedIds: [1, 5],
      status: "completed" as const,
      energy: 92,
      subcategories: [
        "🎨 Identité visuelle",
        "Logo & identité",
        "Direction artistique",
        "🗣️ Communication & présence digitale",
        "Communication",
        "Sites web",
      ],
    },
    {
      id: 4,
      title: "Development",
      date: "2023",
      content: "Full-stack Web Development",
      category: "Tech",
      icon: Code,
      relatedIds: [2, 6],
      status: "in-progress" as const,
      energy: 90,
      subcategories: [
        "Frontend Development",
        "React & TypeScript",
        "Backend Development",
        "Node.js & Express",
        "Database Design",
        "API Development",
      ],
    },
    {
      id: 5,
      title: "Design",
      date: "2022",
      content: "UI/UX and Creative Design",
      category: "Design",
      icon: Palette,
      relatedIds: [3],
      status: "completed" as const,
      energy: 87,
      subcategories: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Design Systems", "Responsive Design"],
    },
    {
      id: 6,
      title: "Problem Solving",
      date: "2024",
      content: "Analyzing and solving complex problems",
      category: "Soft Skills",
      icon: Lightbulb,
      relatedIds: [4],
      status: "in-progress" as const,
      energy: 85,
      subcategories: [
        "Critical Thinking",
        "Analytical Skills",
        "Debugging",
        "Optimization",
        "Testing & QA",
        "Documentation",
      ],
    },
  ]

  return (
    <main>
      <NavBar items={navItems} />
      <RadialOrbitalTimeline timelineData={skillsData} />
    </main>
  )
}
