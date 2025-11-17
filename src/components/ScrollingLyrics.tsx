"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ScrollingLyricsProps {
  lyrics: string
  autoScroll?: boolean
}

export default function ScrollingLyrics({ lyrics, autoScroll = true }: ScrollingLyricsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentLine, setCurrentLine] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(autoScroll)

  // Split lyrics into paragraphs and then into lines for better readability
  const paragraphs = lyrics.split("\n\n").filter((para) => para.trim() !== "")

  // Create an array of all lines with paragraph information
  const lines = paragraphs.flatMap((paragraph, paraIndex) => {
    const paraLines = paragraph.split("\n").filter((line) => line.trim() !== "")
    return paraLines.map((line) => ({
      text: line,
      paragraphIndex: paraIndex,
      isListItem: line.trim().startsWith("•"),
    }))
  })

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling || !containerRef.current) return

    const container = containerRef.current
    const totalHeight = container.scrollHeight - container.clientHeight
    const duration = 40000 // 40 seconds for full scroll (increased from 20s for longer texts)

    let startTime: number | null = null
    let animationFrameId: number

    const scrollAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      if (container) {
        container.scrollTop = progress * totalHeight
        setScrollProgress(progress)
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(scrollAnimation)
      }
    }

    animationFrameId = requestAnimationFrame(scrollAnimation)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isAutoScrolling])

  // Update current line based on scroll position
  useEffect(() => {
    if (!containerRef.current) return

    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const scrollTop = container.scrollTop
      const totalHeight = container.scrollHeight - container.clientHeight
      const progress = scrollTop / totalHeight

      setScrollProgress(progress)

      // Estimate current line based on scroll progress
      const lineIndex = Math.floor(progress * lines.length)
      setCurrentLine(Math.min(lineIndex, lines.length - 1))
    }

    const container = containerRef.current
    container.addEventListener("scroll", handleScroll)

    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [lines.length])

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center px-4 py-2 bg-black/20 backdrop-blur-sm rounded-t-lg">
        <button
          onClick={() => setIsAutoScrolling(!isAutoScrolling)}
          className="text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
        >
          {isAutoScrolling ? "Pause" : "Auto-scroll"}
        </button>
        <span className="text-xs text-white/70">{Math.floor(scrollProgress * 100)}%</span>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-2 text-white/90 space-y-6 bg-black/10 backdrop-blur-sm"
        style={{ scrollBehavior: "smooth" }}
      >
        {paragraphs.map((paragraph, paraIndex) => {
          const paraLines = paragraph.split("\n").filter((line) => line.trim() !== "")

          return (
            <div key={paraIndex} className="space-y-2">
              {paraLines.map((line, lineIndex) => {
                // Calculate the global line index
                const globalLineIndex = lines.findIndex((l) => l.paragraphIndex === paraIndex && l.text === line)

                const isCurrentLine = globalLineIndex === currentLine
                const isListItem = line.trim().startsWith("•")

                return (
                  <motion.p
                    key={`${paraIndex}-${lineIndex}`}
                    className={`text-lg transition-colors duration-300 ${
                      isCurrentLine ? "text-white font-medium" : "text-white/70"
                    } ${isListItem ? "pl-5 relative" : ""}`}
                    initial={{ opacity: 0.7 }}
                    animate={{
                      opacity: isCurrentLine ? 1 : 0.7,
                      scale: isCurrentLine ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {line}
                  </motion.p>
                )
              })}
            </div>
          )
        })}
        <div className="h-[50vh]" /> {/* Extra space at the bottom */}
      </div>

      <div className="px-4 py-2 bg-black/20 backdrop-blur-sm rounded-b-lg">
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-[#1DB954]" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
      </div>
    </div>
  )
}
