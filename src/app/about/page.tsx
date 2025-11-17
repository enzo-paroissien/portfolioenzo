import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Play } from "lucide-react"
import CategoryTabs from "@/components/CategoryTabs"
import BottomNavBar from "@/components/BottomNavBar"
import { aboutMe } from "@/lib/data"

export const metadata = {
  title: "About Me | Portfolio",
  description: "En savoir plus sur Enzo Paroissien",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <CategoryTabs />

      <Link href="/" className="inline-flex items-center text-white p-4">
        <ChevronLeft className="h-5 w-5 mr-1" />
        Retour
      </Link>

      <div className="relative">
        {/* Header with rounded blue background */}
        <div className="bg-[#004b3c] rounded-b-[40px] pt-6 pb-20 px-4">
          <div className="flex justify-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M7oZzBndQwjf8BCAgaXjZ3Ro4haMHh.png"
                alt="Enzo Paroissien"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Profile info */}
        <div className="px-4 -mt-10">
          <div className="bg-[#121212] rounded-xl p-4 shadow-lg">
            <h1 className="text-2xl font-bold mb-1">Enzo Paroissien</h1>
            <p className="text-gray-400 text-sm mb-4">Épisode : Présentation</p>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">{aboutMe.bio}</p>
            </div>

            <div className="mt-6 flex justify-center">
              <button className="bg-[#1DB954] text-black font-medium rounded-full px-8 py-3 flex items-center">
                <Play className="h-5 w-5 mr-2" fill="black" />
                Écouter
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNavBar />
    </main>
  )
}
