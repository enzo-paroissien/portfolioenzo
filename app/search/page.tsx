import CategoryTabs from "@/components/CategoryTabs"
import BottomNavBar from "@/components/BottomNavBar"
import SearchClient from "./SearchClient"

export const metadata = {
  title: "Recherche | Portfolio",
  description: "Recherchez dans mon portfolio",
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#121212] to-black text-white pb-20">
      <CategoryTabs />
      <SearchClient />
      <BottomNavBar />
    </main>
  )
}
