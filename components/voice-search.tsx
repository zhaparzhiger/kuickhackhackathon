"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Search, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface VoiceSearchProps {
  onSearch: (query: string) => void
  className?: string
}

// Declare SpeechRecognition
declare var SpeechRecognition: any
declare var webkitSpeechRecognition: any

export default function VoiceSearch({ onSearch, className = "" }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setError("Ваш браузер не поддерживает распознавание речи. Попробуйте Chrome или Edge.")
      return
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()

    const recognition = recognitionRef.current
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "ru-RU" // Set to Russian

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error)
      setError("Ошибка распознавания речи. Пожалуйста, попробуйте снова.")
      setIsListening(false)
    }

    recognition.onresult = (event) => {
      const current = event.resultIndex
      const result = event.results[current]
      const transcriptText = result[0].transcript

      setTranscript(transcriptText)
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
    } else {
      setTranscript("")
      recognitionRef.current.start()
    }
  }

  const handleSearch = () => {
    if (!transcript.trim()) return

    setIsProcessing(true)

    // Process the voice input to extract job search parameters
    const processedQuery = processVoiceInput(transcript)

    // Call the onSearch callback with the processed query
    onSearch(processedQuery)

    setIsProcessing(false)
  }

  // Function to process voice input and extract search parameters
  const processVoiceInput = (input: string): string => {
    const lowerInput = input.toLowerCase()

    // Extract job title
    let jobTitle = ""
    const titleMatches = lowerInput.match(/найди вакансию (.*?)(?:с|от|до|в|на|$)/i)
    if (titleMatches && titleMatches[1]) {
      jobTitle = titleMatches[1].trim()
    }

    // Extract experience
    let experience = ""
    const expMatches = lowerInput.match(/с (\d+)(?:\s+|-)(?:год|лет|года)/i)
    if (expMatches && expMatches[1]) {
      experience = expMatches[1]
    }

    // Extract location
    let location = ""
    const locationMatches = lowerInput.match(/в (городе |городе|г\. |г\.|)([а-яА-Я-]+)/i)
    if (locationMatches && locationMatches[2]) {
      location = locationMatches[2]
    }

    // Construct search query
    let searchQuery = jobTitle

    if (experience) {
      searchQuery += ` ${experience} лет опыта`
    }

    if (location) {
      searchQuery += ` ${location}`
    }

    return searchQuery || input // Return processed query or original input if processing failed
  }

  return (
    <Card className={`shadow-md border-2 hover:border-primary/30 transition-all duration-300 ${className}`}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Голосовой поиск вакансий</h3>
            <Badge variant={isListening ? "destructive" : "outline"} className="animate-pulse">
              {isListening ? "Запись..." : "Готов к записи"}
            </Badge>
          </div>

          <div className="relative">
            <div className="min-h-[100px] p-3 bg-muted/50 rounded-md border">
              {transcript ? (
                <p className="text-sm">{transcript}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {error ||
                    "Нажмите на кнопку микрофона и скажите, например: «Найди вакансию Frontend Developer с 3 годами опыта»"}
                </p>
              )}
            </div>

            <div className="absolute -bottom-5 right-3 flex space-x-2">
              <Button
                variant={isListening ? "destructive" : "default"}
                size="icon"
                className={`rounded-full h-10 w-10 ${isListening ? "animate-pulse" : ""}`}
                onClick={toggleListening}
                disabled={!recognitionRef.current}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSearch}
              disabled={!transcript.trim() || isProcessing}
              className="bg-primary hover:bg-primary/90"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Обработка...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Искать вакансии
                </>
              )}
            </Button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}
