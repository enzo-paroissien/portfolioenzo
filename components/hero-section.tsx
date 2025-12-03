"use client"

import Image from "next/image"
import { BackgroundAnimation } from "./background-animation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const titles = ["Data Analyst", "Web Designer", "Communication Head"]

export function HeroSection() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 z-0">
        <BackgroundAnimation />
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <div className="flex items-center justify-center gap-8 lg:gap-12">
          {/* Profile Bubble */}
          <div className="flex-shrink-0 relative">
            <div className="relative w-40 h-40 lg:w-48 lg:h-48">
              <div className="relative w-full h-full rounded-full bg-background p-1 border border-border overflow-hidden">
                <Image
                  src="/profile-enzo.png"
                  alt="Enzo Paroissien"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <motion.div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-t-full"
                initial={false}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="absolute w-8 h-4 bg-primary/20 rounded-full blur-md -top-1 -left-1" />
                <div className="absolute w-6 h-4 bg-primary/20 rounded-full blur-md -top-0.5" />
                <div className="absolute w-3 h-3 bg-primary/20 rounded-full blur-sm top-0 left-1" />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4 lg:space-y-6">
            <div className="relative w-fit">
              <h1
                className="text-4xl lg:text-6xl font-black text-black text-balance"
                style={{
                  fontFamily: '"Bebas Neue", "Impact", system-ui, sans-serif',
                  fontWeight: 900,
                  letterSpacing: "0.05em",
                  WebkitTextStroke: "1.5px white",
                  textStroke: "1.5px white",
                  paintOrder: "stroke fill",
                }}
              >
                Enzo
                <br />
                Paroissien
              </h1>
            </div>

            {/* Animated title rotation */}
            <div className="h-12 lg:h-16 relative">
              {titles.map((title, idx) => (
                <div
                  key={idx}
                  className={`absolute transition-all duration-700 ease-in-out ${
                    idx === currentTitleIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-4 pointer-events-none"
                  }`}
                >
                  <h2
                    className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400/40 via-blue-500/40 to-purple-600/40 drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]"
                    style={{
                      letterSpacing: "0.05em",
                      textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                      WebkitTextStroke: "0.3px white",
                    }}
                  >
                    {title}
                  </h2>
                </div>
              ))}
            </div>

            <p className="text-sm lg:text-base text-white/60 max-w-md leading-relaxed">
              My name is Enzo Paroissien, a student passionate about web development and artificial intelligence. Based
              in the Paris region, I combine creativity and technical skills to build innovative digital experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
