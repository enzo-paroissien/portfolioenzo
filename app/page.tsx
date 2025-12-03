import { HeroSection } from "@/components/hero-section"
import { NavBar } from "@/components/navbar"
import { Home, Briefcase, Mail, Zap } from "lucide-react"

export default function Page() {
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Project", url: "/project", icon: Briefcase },
    { name: "Contact", url: "/contact", icon: Mail },
    { name: "Skills", url: "/skills", icon: Zap },
  ]

  return (
    <main>
      <NavBar items={navItems} />
      <HeroSection />
    </main>
  )
}
