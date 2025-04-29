"use client"

import { Button } from "@/components/ui/button"
import { FileUp, Zap } from "lucide-react"
import Link from "next/link"
import { useXP } from "./xp-provider"
import { motion } from "framer-motion"

export default function HeroSection() {
  const { addXP } = useXP()

  const handleUploadClick = () => {
    addXP(10)
  }

  return (
    <div className="hero-section">
      <div className="hero-content max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Power Up Your Career with JobBlaze AI ⚡
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300"
        >
          The cutting-edge job search platform designed for young professionals
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/resume-upload">
            <Button
              size="lg"
              onClick={handleUploadClick}
              className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
            >
              <FileUp className="mr-2 h-5 w-5" />
              <span>Upload Resume</span>
            </Button>
          </Link>

          <Link href="/voice-input">
            <Button
              size="lg"
              variant="outline"
              className="border-primary hover:bg-primary/10 hover:text-primary shadow-sm hover:shadow-md transition-all"
            >
              <Zap className="mr-2 h-5 w-5 text-primary" />
              <span>Voice Command</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
