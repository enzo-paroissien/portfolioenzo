"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { TrackRow } from "@/components/TrackRow"
import { LyricsPanel } from "@/components/LyricsPanel"
import { useInView } from "react-intersection-observer"

// Données mockées des playlists
const playlistsData = {
  ai: {
    title: "AI Lab",
    cover: "/covers/ai.jpg",
    description: "Landing pages IA, agents, prompt‑engineering",
    tracks: [
      {
        id: 1,
        title: "Chatbot Assistant",
        duration: "3:42",
        lyrics:
          "# Chatbot Assistant\n\nCréation d'un assistant conversationnel basé sur GPT-4 pour une entreprise de service client. Le chatbot est capable de comprendre les intentions des utilisateurs et de fournir des réponses pertinentes.\n\n## Technologies utilisées\n- OpenAI API\n- Next.js\n- Tailwind CSS\n- Vercel AI SDK\n\n## Résultats\n- Réduction de 40% du temps de réponse aux demandes clients\n- Satisfaction client améliorée de 25%",
      },
      {
        id: 2,
        title: "Générateur d'Images IA",
        duration: "4:15",
        lyrics:
          "# Générateur d'Images IA\n\nDéveloppement d'une application web permettant de générer des images à partir de descriptions textuelles. L'application utilise DALL-E 2 et offre des options de personnalisation avancées.\n\n## Technologies utilisées\n- DALL-E 2 API\n- React\n- Node.js\n- MongoDB\n\n## Fonctionnalités\n- Génération d'images haute résolution\n- Édition et retouche des images générées\n- Galerie de sauvegarde des créations",
      },
      {
        id: 3,
        title: "Agent Autonome",
        duration: "5:21",
        lyrics:
          "# Agent Autonome\n\nConception d'un agent IA capable d'effectuer des tâches complexes de manière autonome. L'agent peut rechercher des informations, analyser des données et générer des rapports sans intervention humaine.\n\n## Technologies utilisées\n- LangChain\n- Python\n- FastAPI\n- Vector databases\n\n## Applications\n- Veille concurrentielle automatisée\n- Analyse de tendances de marché\n- Génération de rapports hebdomadaires",
      },
    ],
  },
  mkt: {
    title: "Marketing Hub",
    cover: "/covers/mkt.jpg",
    description: "Études de marché, SWOT, stratégies 360°",
    tracks: [
      {
        id: 1,
        title: "Étude de Marché E-commerce",
        duration: "4:30",
        lyrics:
          "# Étude de Marché E-commerce\n\nAnalyse approfondie du marché e-commerce dans le secteur de la mode durable. L'étude comprend une analyse des concurrents, des tendances du marché et des comportements des consommateurs.\n\n## Méthodologie\n- Analyse quantitative (données de marché)\n- Entretiens qualitatifs avec des experts\n- Sondages consommateurs (échantillon de 500 personnes)\n\n## Livrables\n- Rapport détaillé de 45 pages\n- Présentation exécutive\n- Recommandations stratégiques",
      },
      {
        id: 2,
        title: "Stratégie Marketing 360°",
        duration: "3:55",
        lyrics:
          "# Stratégie Marketing 360°\n\nÉlaboration d'une stratégie marketing omnicanale pour une startup dans le domaine de la santé connectée. La stratégie couvre tous les points de contact avec les clients potentiels.\n\n## Canaux\n- Marketing digital (SEA, SEO, SMO)\n- Relations presse\n- Événementiel\n- Marketing d'influence\n\n## Résultats\n- Augmentation de 65% de la notoriété de la marque\n- Croissance de 40% des leads qualifiés",
      },
      {
        id: 3,
        title: "Analyse SWOT",
        duration: "2:45",
        lyrics:
          "# Analyse SWOT\n\nRéalisation d'une analyse SWOT pour une PME du secteur agroalimentaire souhaitant se développer à l'international. L'analyse a permis d'identifier les opportunités et menaces du marché.\n\n## Forces identifiées\n- Produits de haute qualité\n- Processus de production innovant\n- Équipe expérimentée\n\n## Opportunités\n- Demande croissante pour les produits bio\n- Nouveaux marchés émergents en Asie\n- Partenariats potentiels avec des distributeurs locaux",
      },
    ],
  },
  brand: {
    title: "Branding Studio",
    cover: "/covers/brand.jpg",
    description: "Logo, DA, communication, sites web",
    tracks: [
      {
        id: 1,
        title: "Refonte d'Identité Visuelle",
        duration: "6:12",
        lyrics:
          "# Refonte d'Identité Visuelle\n\nRefonte complète de l'identité visuelle d'une entreprise de services financiers. Le projet comprend la création d'un nouveau logo, d'une charte graphique et de templates pour les communications.\n\n## Éléments livrés\n- Logo (versions principales et alternatives)\n- Charte graphique complète\n- Templates (présentations, documents, signatures email)\n- Guide d'utilisation de la marque\n\n## Impact\n- Image de marque modernisée et cohérente\n- Reconnaissance accrue auprès des clients cibles\n- Satisfaction interne des équipes",
      },
      {
        id: 2,
        title: "Site Web Vitrine",
        duration: "4:48",
        lyrics:
          "# Site Web Vitrine\n\nConception et développement d'un site web vitrine pour un cabinet d'architectes. Le site met en valeur les projets réalisés et communique l'approche unique du cabinet.\n\n## Technologies utilisées\n- Next.js\n- Tailwind CSS\n- Framer Motion\n- Contentful CMS\n\n## Fonctionnalités\n- Portfolio de projets interactif\n- Formulaire de contact\n- Blog d'actualités\n- Version multilingue (FR/EN)",
      },
      {
        id: 3,
        title: "Campagne de Communication",
        duration: "3:33",
        lyrics:
          "# Campagne de Communication\n\nCréation d'une campagne de communication 360° pour le lancement d'un nouveau produit dans le secteur des technologies vertes. La campagne a touché différents canaux pour maximiser l'impact.\n\n## Canaux utilisés\n- Réseaux sociaux\n- Affichage urbain\n- Presse spécialisée\n- Événements de lancement\n\n## Résultats\n- 2 millions d'impressions sur les réseaux sociaux\n- Couverture médiatique dans 15 publications spécialisées\n- 500+ participants aux événements de lancement",
      },
    ],
  },
}

export default function PlaylistPage({ params }: { params: { slug: string } }) {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Récupérer les données de la playlist en fonction du slug
  const playlist = playlistsData[params.slug as keyof typeof playlistsData]

  if (!playlist) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Playlist non trouvée</h1>
          <Link href="/" className="text-[#1DB954] hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  const handleTrackClick = (trackId: number) => {
    setSelectedTrack(selectedTrack === trackId ? null : trackId)
  }

  const selectedTrackData = selectedTrack ? playlist.tracks.find((track) => track.id === selectedTrack) : null

  return (
    <div className="bg-[#121212] min-h-screen pb-20">
      {/* Header avec dégradé et cover */}
      <header className="relative">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-[#121212]/50 to-[#121212]"
          style={{ zIndex: 1 }}
        />
        <div className="relative pt-16 pb-6 px-4" style={{ zIndex: 2 }}>
          <div className="flex items-end gap-4">
            <div className="w-32 h-32 md:w-48 md:h-48 relative shadow-xl">
              <Image
                src={playlist.cover || "/placeholder.svg"}
                alt={playlist.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 192px"
              />
            </div>
            <div>
              <div className="text-xs text-white mb-2">PLAYLIST</div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{playlist.title}</h1>
              <p className="text-[#B3B3B3] text-sm">{playlist.description}</p>
              <div className="flex items-center gap-1 mt-2">
                <div className="w-6 h-6 rounded-full bg-[#121212] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <span className="text-white text-sm">Portfolio</span>
                <span className="text-[#B3B3B3] text-sm">• {playlist.tracks.length} titres</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Boutons d'action */}
      <div className="px-4 py-4 flex items-center gap-4">
        <button className="bg-[#1DB954] rounded-full p-3 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </button>
        <button className="text-[#B3B3B3] hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
        </button>
        <button className="text-[#B3B3B3] hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      {/* Liste des tracks */}
      <div className="px-4" ref={ref}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#2A2A2A] text-[#B3B3B3]">
              <th className="py-2 text-left w-10 font-normal">#</th>
              <th className="py-2 text-left font-normal">TITRE</th>
              <th className="py-2 text-right w-16 font-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {playlist.tracks.map((track, index) => (
              <motion.tr
                key={track.id}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TrackRow
                  track={track}
                  index={index + 1}
                  isSelected={selectedTrack === track.id}
                  onClick={() => handleTrackClick(track.id)}
                />
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Panel des paroles (lyrics) */}
      <AnimatePresence>
        {selectedTrackData && <LyricsPanel track={selectedTrackData} onClose={() => setSelectedTrack(null)} />}
      </AnimatePresence>

      {/* Navigation bar (fixe en bas) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-95 flex justify-around py-3 px-2 z-20">
        <Link href="/" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-xs text-white mt-1">Accueil</span>
        </Link>
        <Link href="#" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="text-xs text-gray-400 mt-1">Recherche</span>
        </Link>
        <Link href="#" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="m16 6 4 14" />
            <path d="M12 6v14" />
            <path d="M8 8v12" />
            <path d="M4 4v16" />
          </svg>
          <span className="text-xs text-gray-400 mt-1">Bibliothèque</span>
        </Link>
      </nav>
    </div>
  )
}
