"use client"

import Image from "next/image"
import Link from "next/link"
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

      <div className="relative z-10 max-w-6xl w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Content - Left Side */}
          <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="relative w-fit mx-auto lg:mx-0">
              <h1
                className="text-5xl lg:text-7xl font-black text-black text-balance leading-tight"
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
            <div className="h-12 lg:h-16 relative mx-auto lg:mx-0 w-full max-w-md">
              {titles.map((title, idx) => (
                <div
                  key={idx}
                  className={`absolute left-0 right-0 lg:left-0 lg:right-auto transition-all duration-700 ease-in-out ${idx === currentTitleIndex
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

            <p className="text-base lg:text-lg text-white/70 max-w-lg leading-relaxed mx-auto lg:mx-0">
              My name is Enzo Paroissien, a student passionate about web development and artificial intelligence. Based
              in the Paris region, I combine creativity and technical skills to build innovative digital experiences.
            </p>
          </div>

          {/* Profile Image - Right Side with Original Bubble Style */}
          <div className="flex-shrink-0 relative flex flex-col items-center gap-6">
            <div className="relative w-64 h-64 lg:w-96 lg:h-96">
              <div className="relative w-full h-full rounded-full bg-background p-1 border border-border overflow-hidden">
                <Image
                  src="/profile-enzo.png"
                  alt="Enzo Paroissien"
                  width={384}
                  height={384}
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

            <Link
              href="/contact"
              className="px-8 py-3 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 duration-300"
            >
              Contact Me
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
