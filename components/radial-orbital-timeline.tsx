"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { cn } from "@/lib/utils"

interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: React.ElementType
  relatedIds: number[]
  status: "completed" | "in-progress" | "pending"
  energy: number
  subcategories?: string[]
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[]
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({})
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null)
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.3)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
      setRotationSpeed(0.3) // Reset speed on close
    }
  }

  const handleCenterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setRotationSpeed((prev) => Math.min(prev + 0.2, 2.0)) // Increase speed, max 2.0
  }

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev }
      Object.keys(newState).forEach((key) => {
        if (Number.parseInt(key) !== id) {
          newState[Number.parseInt(key)] = false
        }
      })

      newState[id] = !prev[id]

      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)

        const relatedItems = getRelatedItems(id)
        const newPulseEffect: Record<number, boolean> = {}
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true
        })
        setPulseEffect(newPulseEffect)

        centerViewOnNode(id)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }

      return newState
    })
  }

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + rotationSpeed) % 360
          return Number(newAngle.toFixed(3))
        })
      }, 50)
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer)
      }
    }
  }, [autoRotate, rotationSpeed])

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId)
    const totalNodes = timelineData.length
    const targetAngle = (nodeIndex / totalNodes) * 360

    setRotationAngle(270 - targetAngle)
  }

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radius = 200
    const radian = (angle * Math.PI) / 180

    const x = radius * Math.cos(radian) + centerOffset.x
    const y = radius * Math.sin(radian) + centerOffset.y

    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))

    return { x, y, angle, zIndex, opacity }
  }

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId)
    return currentItem ? currentItem.relatedIds : []
  }

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false
    const relatedItems = getRelatedItems(activeNodeId)
    return relatedItems.includes(itemId)
  }

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white"
      case "in-progress":
        return "text-black bg-white border-black"
      case "pending":
        return "text-white bg-black/40 border-white/50"
      default:
        return "text-white bg-black/40 border-white/50"
    }
  }

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Center gradient orb */}
          <div
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10 cursor-pointer hover:scale-110 transition-transform"
            onClick={handleCenterClick}
            role="button"
            aria-label="Increase rotation speed"
          >
            <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70 pointer-events-none"></div>
            <div
              className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50 pointer-events-none"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md pointer-events-none"></div>
          </div>

          {/* Orbital ring */}
          <div className="pointer-events-none absolute w-96 h-96 rounded-full border border-white/10"></div>

          {/* Timeline nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length)
            const isExpanded = expandedItems[item.id]
            const isRelated = isRelatedToActive(item.id)
            const isPulsing = pulseEffect[item.id]
            const Icon = item.icon

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            }

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el
                }}
                className="absolute transition-all duration-700"
                style={nodeStyle}
              >
                {/* Glow effect */}
                <div
                  className={`pointer-events-none absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div className="relative flex flex-col items-center pointer-events-auto gap-2">
                  {/* Node button */}
                  <button
                    type="button"
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/60 cursor-pointer
                    ${isExpanded ? "bg-white text-black" : isRelated ? "bg-white/50 text-black" : "bg-black text-white"}
                    border-2 
                    ${isExpanded
                        ? "border-white shadow-lg shadow-white/30"
                        : isRelated
                          ? "border-white animate-pulse"
                          : "border-white/40"
                      }
                    transition-all duration-300 transform
                    ${isExpanded ? "scale-150" : ""}
                  `}
                    aria-pressed={isExpanded}
                    aria-label={`View ${item.title} details`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleItem(item.id)
                    }}
                  >
                    <Icon size={16} />
                  </button>

                  {/* Node label */}
                  <div
                    className={`
                    absolute top-12 whitespace-nowrap
                    text-xs font-semibold tracking-wider
                    transition-all duration-300
                    ${isExpanded ? "text-white scale-125" : "text-white/70"}
                  `}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleItem(item.id)
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleItem(item.id)
                      }
                    }}
                  >
                    {item.title}
                  </div>
                </div>

                {/* Lightweight info popup */}
                {isExpanded && (
                  <div
                    className="absolute top-16 left-1/2 -translate-x-1/2 w-64 rounded-xl border border-white/15 bg-black/85 p-4 text-white/80 shadow-lg shadow-black/60 backdrop-blur-md"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-t border-l border-white/15 bg-black/85"></div>
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50">
                      <span>{item.category}</span>
                      <span>Since {item.date}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide border",
                          getStatusStyles(item.status),
                        )}
                      >
                        {item.status === "completed"
                          ? "Done"
                          : item.status === "in-progress"
                            ? "En cours"
                            : "À venir"}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed mb-2">{item.content}</p>

                    {item.subcategories && item.subcategories.length > 0 && (
                      <div className="mt-3 space-y-1 border-t border-white/10 pt-2">
                        {item.subcategories.map((sub, idx) => {
                          // Check if the item starts with an emoji to treat it as a header
                          const isHeader = /^\p{Emoji}/u.test(sub) || /^\d+\./.test(sub);
                          return (
                            <div
                              key={idx}
                              className={cn(
                                "text-xs",
                                isHeader ? "font-bold text-white mt-2 mb-1" : "text-white/70 pl-2"
                              )}
                            >
                              {sub}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
