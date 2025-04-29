"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Square, Zap } from "lucide-react"
import { useXP } from "./xp-provider"

export default function VoiceInputFull() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const { addXP } = useXP()

  // Mock transcript text
  const mockTranscript =
    "I'm looking for a frontend developer position where I can use my skills in React, TypeScript, and responsive design. I have 2 years of experience building web applications and I'm passionate about creating intuitive user interfaces. I'm available to start immediately and prefer remote work, but I'm open to relocating for the right opportunity."

  const toggleRecording = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      // Reset transcript when starting new recording
      setTranscript("")
      setTypingIndex(0)
      setShowFeedback(false)
      addXP(5)
    } else {
      // When stopping recording, show feedback after a delay
      setTimeout(() => {
        setShowFeedback(true)
        addXP(15)
      }, 1000)
    }
  }

  // Simulate typing effect when recording
  useEffect(() => {
    let typingTimer

    if (isRecording && typingIndex < mockTranscript.length) {
      typingTimer = setTimeout(() => {
        setTranscript(mockTranscript.substring(0, typingIndex + 1))
        setTypingIndex(typingIndex + 1)
      }, 50)
    }

    return () => clearTimeout(typingTimer)
  }, [isRecording, typingIndex])

  // Create particle effect for the soundwave
  const particles = []
  for (let i = 0; i < 5; i++) {
    particles.push(
      <motion.div
        key={i}
        className="absolute bg-accent rounded-full"
        style={{
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
        }}
        animate={
          isRecording
            ? {
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
                opacity: [1, 0],
                scale: [1, 0],
              }
            : { x: 0, y: 0, opacity: 0, scale: 0 }
        }
        transition={{
          duration: Math.random() * 1 + 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      />,
    )
  }

  return (
    <div className="w-full">
      <Card className="cyberpunk-card mb-8 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center mb-6">
            <motion.div
              animate={isRecording ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ repeat: isRecording ? Number.POSITIVE_INFINITY : 0, duration: 1.5 }}
              className="relative mb-6"
            >
              <div
                className={`neon-orb w-24 h-24 flex items-center justify-center ${isRecording ? "pulse-animation" : ""}`}
              >
                <Mic className="h-12 w-12 text-white" />
                {isRecording && particles}
              </div>
              <div
                className={`absolute inset-0 rounded-full ${isRecording ? "wave-animation bg-accent/30" : ""}`}
              ></div>
            </motion.div>

            <div className="mb-6 flex gap-4">
              <Button
                size="lg"
                onClick={toggleRecording}
                className={isRecording ? "bg-red-500 hover:bg-red-600 neon-button" : "neon-button"}
              >
                {isRecording ? (
                  <>
                    <Square className="mr-2 h-4 w-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    Start Recording
                  </>
                )}
              </Button>
            </div>

            <div className="holographic-terminal w-full min-h-[200px] relative overflow-hidden">
              <div className="absolute top-2 left-2 w-2 h-4 bg-green-500 animate-pulse"></div>
              {transcript ? (
                <p className="pl-6 whitespace-pre-wrap">{transcript}</p>
              ) : (
                <p className="pl-6 text-gray-400 dark:text-gray-500">
                  {isRecording ? "Listening..." : "Click 'Start Recording' and speak to see transcription here"}
                </p>
              )}
            </div>
          </div>

          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/30"
            >
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 text-accent mr-2" />
                <h3 className="font-bold text-gradient">AI Voice Analysis</h3>
              </div>
              <p className="text-sm mb-2">Found 12 potential job matches based on your voice input:</p>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>8 Frontend Developer positions</li>
                <li>3 React Developer positions</li>
                <li>1 UI Engineer position</li>
              </ul>
              <div className="mt-4 flex justify-end">
                <Button className="neon-button">
                  <Zap className="mr-2 h-4 w-4" />
                  View Matches
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
