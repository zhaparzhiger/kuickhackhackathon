"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Video, Mic, MicOff, VideoOff, Play, RotateCcw } from "lucide-react"
import { useXP } from "./xp-provider"

// Mock interview questions
const mockQuestions = [
  "Tell me about yourself and your experience.",
  "Why are you interested in this position?",
  "What are your strengths and weaknesses?",
  "Describe a challenging project you worked on and how you handled it.",
  "Where do you see yourself in 5 years?",
  "How do you handle stress and pressure?",
  "What questions do you have for me?",
]

// Mock feedback
const mockFeedback = [
  "Speak a bit louder for better clarity.",
  "Great eye contact! Keep it up.",
  "Try to include specific examples in your answers.",
  "Good pace of speaking, very clear.",
  "Consider using the STAR method for behavioral questions.",
]

export default function InterviewPrep() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your AI interviewer. I'll ask you some common interview questions. Answer as if you're in a real interview. Ready to begin?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [input, setInput] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [confidenceScore, setConfidenceScore] = useState(60)
  const [isSimulationStarted, setIsSimulationStarted] = useState(false)
  const { addXP } = useXP()

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (input.trim() === "") return

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newUserMessage])
    setInput("")

    // Add random feedback
    setTimeout(() => {
      const randomFeedback = mockFeedback[Math.floor(Math.random() * mockFeedback.length)]
      setFeedback([...feedback, randomFeedback])

      // Update confidence score
      setConfidenceScore((prev) => Math.min(100, prev + Math.floor(Math.random() * 10)))

      // Add XP for answering
      addXP(5)
    }, 1000)

    // Add AI response with next question
    setTimeout(() => {
      if (currentQuestion < mockQuestions.length) {
        const newAiMessage = {
          id: messages.length + 2,
          sender: "ai",
          text: mockQuestions[currentQuestion],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        setMessages((prev) => [...prev, newAiMessage])
        setCurrentQuestion(currentQuestion + 1)
      } else {
        const newAiMessage = {
          id: messages.length + 2,
          sender: "ai",
          text: "Thank you for completing this practice interview! Would you like to review your performance or try again?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        setMessages((prev) => [...prev, newAiMessage])
        addXP(20)
      }
    }, 1500)
  }

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled)
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
  }

  const startSimulation = () => {
    setIsSimulationStarted(true)
    addXP(10)

    // Add first question after a delay
    setTimeout(() => {
      const newAiMessage = {
        id: messages.length + 1,
        sender: "ai",
        text: mockQuestions[0],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newAiMessage])
      setCurrentQuestion(1)
    }, 1000)
  }

  const resetSimulation = () => {
    setMessages([
      {
        id: 1,
        sender: "ai",
        text: "Hello! I'm your AI interviewer. I'll ask you some common interview questions. Answer as if you're in a real interview. Ready to begin?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
    setCurrentQuestion(0)
    setFeedback([])
    setConfidenceScore(60)
    setIsSimulationStarted(false)
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardContent className="p-4 flex-1 flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 flex items-center justify-between">
                <h3 className="font-medium text-primary">Interview Simulation</h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleVideo}
                    className={!videoEnabled ? "bg-gray-200 dark:bg-gray-700" : ""}
                  >
                    {videoEnabled ? (
                      <Video className="h-4 w-4 text-primary" />
                    ) : (
                      <VideoOff className="h-4 w-4 text-primary" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleAudio}
                    className={!audioEnabled ? "bg-gray-200 dark:bg-gray-700" : ""}
                  >
                    {audioEnabled ? (
                      <Mic className="h-4 w-4 text-primary" />
                    ) : (
                      <MicOff className="h-4 w-4 text-primary" />
                    )}
                  </Button>
                </div>
              </div>

              {!isSimulationStarted ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                      <Play className="h-12 w-12 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold mb-4 text-primary">Ready to start your interview?</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Our AI interviewer will ask you common interview questions. Answer as if you're in a real
                      interview.
                    </p>
                    <Button onClick={startSimulation} className="bg-primary hover:bg-primary/90">
                      Start Simulation
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
                      {videoEnabled ? (
                        <>
                          <img
                            src="/placeholder.svg?height=200&width=300"
                            alt="Your video feed"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute bottom-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded">
                            You
                          </div>
                        </>
                      ) : (
                        <div className="text-white text-center">
                          <VideoOff className="h-8 w-8 mx-auto mb-2" />
                          <p>Video disabled</p>
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="AI interviewer"
                        className="w-full h-full object-cover rounded-lg opacity-80"
                      />
                      <div className="absolute bottom-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded">
                        AI Interviewer
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user" ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-800"
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className="text-xs mt-1 opacity-70 text-right">{message.time}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your answer..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      className="flex-1"
                    />
                    <Button onClick={handleSend} className="bg-primary hover:bg-primary/90">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {isSimulationStarted && (
            <div className="mt-4 flex justify-end">
              <Button variant="outline" className="border-primary hover:bg-primary/10" onClick={resetSimulation}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Simulation
              </Button>
            </div>
          )}
        </div>

        <div>
          <Card className="h-[600px]">
            <CardContent className="p-4 h-full flex flex-col">
              <h3 className="font-bold mb-4 text-primary">AI Feedback</h3>

              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Confidence Meter</h4>
                <div className="simple-progress mb-1">
                  <div className="simple-progress-bar" style={{ width: `${confidenceScore}%` }}></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {feedback.length > 0 ? (
                  <ul className="space-y-3">
                    {feedback.map((item, index) => (
                      <li
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="h-full flex items-center justify-center text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      {isSimulationStarted
                        ? "Feedback will appear here as you answer questions"
                        : "Start the simulation to receive feedback"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
