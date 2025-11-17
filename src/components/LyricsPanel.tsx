"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"

interface Track {
  id: number
  title: string
  duration: string
  lyrics: string
}

interface LyricsPanelProps {
  track: Track
  onClose: () => void
}

export function LyricsPanel({ track, onClose }: LyricsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Fermer le panel quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  // Empêcher le scroll du body quand le panel est ouvert
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 z-30 flex md:items-center md:justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        ref={panelRef}
        className="bg-gradient-to-b from-[#282828] to-[#121212] w-full md:w-1/2 lg:w-2/5 h-[90vh] md:h-screen rounded-t-xl md:rounded-none overflow-hidden flex flex-col"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header du panel */}
        <div className="p-4 flex justify-between items-center border-b border-[#2A2A2A]">
          <div>
            <h3 className="text-white font-bold">{track.title}</h3>
            <p className="text-[#B3B3B3] text-sm">Projet</p>
          </div>
          <button onClick={onClose} className="text-white p-2 rounded-full hover:bg-[#2A2A2A]" aria-label="Fermer">
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Contenu des paroles */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} className="text-[#1DB954] hover:underline" target="_blank" rel="noopener noreferrer" />
                ),
                h1: ({ node, ...props }) => <h1 {...props} className="text-2xl font-bold mb-4" />,
                h2: ({ node, ...props }) => <h2 {...props} className="text-xl font-bold mt-6 mb-3" />,
                h3: ({ node, ...props }) => <h3 {...props} className="text-lg font-bold mt-5 mb-2" />,
                p: ({ node, ...props }) => <p {...props} className="mb-4 text-[#E0E0E0]" />,
                ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 mb-4" />,
                li: ({ node, ...props }) => <li {...props} className="mb-1 text-[#E0E0E0]" />,
              }}
            >
              {track.lyrics}
            </ReactMarkdown>
          </div>
        </div>

        {/* Barre de contrôle (factice) */}
        <div className="p-4 border-t border-[#2A2A2A] bg-[#181818]">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-[#B3B3B3]">0:45</div>
            <div className="flex-1 mx-2">
              <div className="h-1 bg-[#535353] rounded-full">
                <div className="h-1 bg-[#1DB954] rounded-full w-1/4"></div>
              </div>
            </div>
            <div className="text-xs text-[#B3B3B3]">{track.duration}</div>
          </div>
          <div className="flex items-center justify-center gap-6">
            <button className="text-[#B3B3B3] hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="19 20 9 12 19 4 19 20" />
                <line x1="5" x2="5" y1="19" y2="5" />
              </svg>
            </button>
            <button className="bg-white rounded-full p-2">
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
                <rect width="4" height="16" x="6" y="4" />
                <rect width="4" height="16" x="14" y="4" />
              </svg>
            </button>
            <button className="text-[#B3B3B3] hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 4 15 12 5 20 5 4" />
                <line x1="19" x2="19" y1="5" y2="19" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
