"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Mail, Phone, Linkedin, Copy, Check } from "lucide-react"
import CategoryTabs from "@/components/CategoryTabs"
import BottomNavBar from "@/components/BottomNavBar"

export default function ContactPage() {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const contactInfo = [
    {
      id: "email",
      title: "Email",
      value: "Eparoissien@eugeniaschool.com",
      icon: <Mail className="h-6 w-6" />,
      color: "from-[#e63946] to-[#a31621]",
      action: () => {
        window.open("https://mail.google.com/mail/u/0/", "_blank")
      },
    },
    {
      id: "phone",
      title: "Téléphone",
      value: "06 84 47 09 70",
      displayValue: "06 84 47 09 70",
      copyValue: "0684470970",
      icon: <Phone className="h-6 w-6" />,
      color: "from-[#1DB954] to-[#0d8a3e]",
      action: () => {
        navigator.clipboard.writeText("0684470970")
        setCopiedPhone(true)
        setTimeout(() => setCopiedPhone(false), 2000)
      },
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      value: "Enzo Paroissien",
      icon: <Linkedin className="h-6 w-6" />,
      color: "from-[#0077B5] to-[#0e5a8a]",
      action: () => {
        window.open("https://www.linkedin.com/in/enzo-paroissien/", "_blank")
      },
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#121212] to-black text-white pb-20">
      <CategoryTabs />

      <Link href="/" className="inline-flex items-center text-white p-4">
        <ChevronLeft className="h-5 w-5 mr-1" />
        Retour
      </Link>

      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Me contacter</h1>

        <div className="max-w-md mx-auto space-y-6">
          {contactInfo.map((item) => (
            <motion.div
              key={item.id}
              className={`bg-[#181818] rounded-xl overflow-hidden shadow-lg ${item.action ? "cursor-pointer" : ""}`}
              whileHover={{ scale: 1.03 }}
              whileTap={item.action ? { scale: 0.97 } : undefined}
              onClick={item.action || undefined}
              onMouseEnter={() => setActiveCard(item.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 transition-opacity duration-300 ${
                    activeCard === item.id ? "opacity-100" : ""
                  }`}
                />
                <div className="relative z-10 p-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors duration-300 ${
                        activeCard === item.id ? "bg-white text-black" : "bg-[#282828] text-white"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p className="text-gray-300">{item.value}</p>
                    </div>
                  </div>
                  {item.id === "phone" && (
                    <button className="ml-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
                      {copiedPhone ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-400">
              N'hésitez pas à me contacter pour discuter de vos projets ou pour toute autre information.
            </p>
          </motion.div>
        </div>
      </div>

      <BottomNavBar />
    </main>
  )
}
