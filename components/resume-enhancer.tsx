"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileUp, Download, ArrowRight, Check } from "lucide-react"
import { useXP } from "./xp-provider"

// Mock suggestions
const mockSuggestions = [
  {
    id: 1,
    title: "Add quantifiable achievements",
    description: "Include specific metrics and results to demonstrate your impact.",
    example: "Increased website traffic by 45% through SEO optimization.",
  },
  {
    id: 2,
    title: "Use action verbs",
    description: "Start bullet points with strong action verbs to convey leadership and initiative.",
    example: "Led a team of 5 developers to deliver project ahead of schedule.",
  },
  {
    id: 3,
    title: "Remove outdated experience",
    description: "Focus on recent and relevant experience from the past 10 years.",
    example: "Remove internships from over 5 years ago unless highly relevant.",
  },
  {
    id: 4,
    title: "Tailor skills section",
    description: "Customize your skills to match the job description keywords.",
    example: "Add 'React', 'TypeScript', and 'Responsive Design' for frontend roles.",
  },
  {
    id: 5,
    title: "Improve formatting",
    description: "Use consistent formatting and adequate white space for readability.",
    example: "Use the same font style and size throughout the document.",
  },
]

export default function ResumeEnhancer() {
  const [file, setFile] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(50)
  const { addXP } = useXP()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      addXP(5)
    }
  }

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
      addXP(25)
    }, 2000)
  }

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value)
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <div>
          <h2 className="text-xl font-bold mb-4 text-primary">Your Resume</h2>
          {!file ? (
            <Card className="h-[500px] flex items-center justify-center">
              <CardContent className="text-center p-6 w-full">
                <FileUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2 text-primary">Upload your resume</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Upload your current resume to get AI-powered suggestions
                </p>
                <Button
                  onClick={() => document.getElementById("resume-file").click()}
                  className="bg-primary hover:bg-primary/90"
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload PDF
                </Button>
                <input id="resume-file" type="file" onChange={handleFileChange} accept=".pdf" className="hidden" />
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[500px] overflow-hidden">
              <CardContent className="p-0 h-full">
                <div className="bg-gray-100 dark:bg-gray-800 p-2 flex justify-between items-center">
                  <span className="text-sm font-medium">{file.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                    Change
                  </Button>
                </div>
                <div className="p-4 h-[calc(100%-40px)] flex items-center justify-center bg-white dark:bg-gray-900">
                  <iframe
                    src="/placeholder.svg?height=400&width=400"
                    className="w-full h-full border-0"
                    title="Resume Preview"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          )}

          {file && generated && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4 text-primary">Before / After Comparison</h3>
              <div className="relative h-12 mb-2">
                <div className="absolute inset-0 flex">
                  <div className="bg-gray-200 dark:bg-gray-700 h-full" style={{ width: `${sliderPosition}%` }}></div>
                  <div className="bg-primary/20 h-full" style={{ width: `${100 - sliderPosition}%` }}></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className="absolute top-0 bottom-0 w-1 bg-primary rounded-full"
                  style={{ left: `calc(${sliderPosition}% - 2px)` }}
                ></div>
                <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none">
                  <span className="text-sm font-medium">Original</span>
                  <span className="text-sm font-medium">Enhanced</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-primary">AI Suggestions</h2>
          <Card className="h-[500px] overflow-auto">
            <CardContent className="p-6">
              {!file ? (
                <div className="h-full flex items-center justify-center text-center">
                  <p className="text-gray-500 dark:text-gray-400">Upload your resume to get AI-powered suggestions</p>
                </div>
              ) : (
                <>
                  <ul className="space-y-4 mb-6">
                    {mockSuggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="bg-gray-50 dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:border-primary/50 transition-all duration-300"
                      >
                        <h3 className="font-bold text-primary flex items-center">
                          <Check className="h-4 w-4 mr-2" />
                          {suggestion.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{suggestion.description}</p>
                        <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm italic">
                          Example: {suggestion.example}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-center">
                    {generated ? (
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Download className="mr-2 h-4 w-4" />
                        Download Enhanced Resume
                      </Button>
                    ) : (
                      <Button onClick={handleGenerate} disabled={generating} className="bg-primary hover:bg-primary/90">
                        {generating ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            Generate Enhanced Resume
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {file && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4 text-primary">Skills Heatmap</h3>
              <Card className="p-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Python</span>
                      <span className="text-sm font-bold text-primary">90%</span>
                    </div>
                    <div className="simple-progress">
                      <div className="simple-progress-bar" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">React</span>
                      <span className="text-sm font-bold text-primary">85%</span>
                    </div>
                    <div className="simple-progress">
                      <div className="simple-progress-bar" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">TypeScript</span>
                      <span className="text-sm font-bold text-primary">75%</span>
                    </div>
                    <div className="simple-progress">
                      <div className="simple-progress-bar" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">UI/UX Design</span>
                      <span className="text-sm font-bold text-primary">60%</span>
                    </div>
                    <div className="simple-progress">
                      <div className="simple-progress-bar" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Project Management</span>
                      <span className="text-sm font-bold text-primary">70%</span>
                    </div>
                    <div className="simple-progress">
                      <div className="simple-progress-bar" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
