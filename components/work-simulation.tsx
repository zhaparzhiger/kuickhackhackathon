"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Code, FileText, MessageSquare, PenTool } from "lucide-react"

const simulationTypes = [
  {
    id: "coding",
    title: "Coding Challenge",
    description: "Solve real-world programming problems",
    icon: <Code className="h-5 w-5" />,
    duration: "45 min",
    difficulty: "Intermediate",
    skills: ["JavaScript", "React", "Problem Solving"],
  },
  {
    id: "writing",
    title: "Technical Writing",
    description: "Create documentation for a software product",
    icon: <FileText className="h-5 w-5" />,
    duration: "30 min",
    difficulty: "Beginner",
    skills: ["Documentation", "Technical Writing", "Communication"],
  },
  {
    id: "design",
    title: "UI/UX Design",
    description: "Design a user interface for a mobile app",
    icon: <PenTool className="h-5 w-5" />,
    duration: "60 min",
    difficulty: "Advanced",
    skills: ["UI Design", "UX Principles", "Figma"],
  },
  {
    id: "communication",
    title: "Client Communication",
    description: "Handle a challenging client conversation",
    icon: <MessageSquare className="h-5 w-5" />,
    duration: "20 min",
    difficulty: "Intermediate",
    skills: ["Communication", "Problem Solving", "Empathy"],
  },
]

const simulationSteps = {
  coding: [
    "Set up your development environment",
    "Understand the problem requirements",
    "Write pseudocode for your solution",
    "Implement your solution",
    "Test and debug your code",
    "Optimize for performance",
    "Submit your solution",
  ],
  writing: [
    "Review the product specifications",
    "Create an outline for your documentation",
    "Write the introduction and overview",
    "Detail the technical specifications",
    "Add usage examples and code snippets",
    "Proofread and edit your document",
    "Submit your documentation",
  ],
  design: [
    "Understand the design brief",
    "Research similar applications",
    "Create wireframes for key screens",
    "Design the user interface",
    "Add interactive elements",
    "Test the user experience",
    "Submit your design files",
  ],
  communication: [
    "Review the client scenario",
    "Prepare your talking points",
    "Practice your response",
    "Record your video response",
    "Review and refine your approach",
    "Submit your response",
  ],
}

export function WorkSimulation() {
  const [selectedSimulation, setSelectedSimulation] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleStartSimulation = (id: string) => {
    setSelectedSimulation(id)
    setIsStarted(true)
    setActiveStep(0)
    setIsCompleted(false)
  }

  const handleNextStep = () => {
    if (!selectedSimulation) return

    const steps = simulationSteps[selectedSimulation as keyof typeof simulationSteps]
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handleReset = () => {
    setSelectedSimulation(null)
    setIsStarted(false)
    setActiveStep(0)
    setIsCompleted(false)
  }

  const getSimulationById = (id: string) => {
    return simulationTypes.find((sim) => sim.id === id)
  }

  const renderSimulationList = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {simulationTypes.map((simulation) => (
          <Card key={simulation.id} className="border border-blue-100 hover:border-blue-300 transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-blue-50 text-blue-600">{simulation.icon}</div>
                  <CardTitle className="text-lg">{simulation.title}</CardTitle>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                  {simulation.difficulty}
                </Badge>
              </div>
              <CardDescription className="mt-2">{simulation.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span>{simulation.duration}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {simulation.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-slate-100">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => handleStartSimulation(simulation.id)}
              >
                Start Simulation
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  const renderSimulationSteps = () => {
    if (!selectedSimulation) return null

    const simulation = getSimulationById(selectedSimulation)
    const steps = simulationSteps[selectedSimulation as keyof typeof simulationSteps]
    const progress = Math.round((activeStep / (steps.length - 1)) * 100)

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{simulation?.title}</h2>
            <p className="text-muted-foreground">{simulation?.description}</p>
          </div>
          <Button variant="outline" onClick={handleReset}>
            Exit Simulation
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle>
              Step {activeStep + 1}: {steps[activeStep]}
            </CardTitle>
            <CardDescription>Complete this step before moving to the next one</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-slate-50 rounded-md border border-slate-100">
              {/* Simulation content would go here - simplified for this example */}
              <p className="text-muted-foreground">
                {isCompleted
                  ? "Congratulations on completing the simulation! You can view your results below."
                  : `Instructions for ${steps[activeStep]}: Follow the guidelines provided and complete this step to the best of your ability.`}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleReset} disabled={isCompleted}>
              Cancel
            </Button>
            {isCompleted ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
                  onClick={handleReset}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  View Results
                </Button>
                <Button onClick={handleReset} className="bg-blue-600 hover:bg-blue-700">
                  Try Another Simulation
                </Button>
              </div>
            ) : (
              <Button onClick={handleNextStep} className="bg-blue-600 hover:bg-blue-700">
                {activeStep === steps.length - 1 ? "Complete Simulation" : "Next Step"}
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className="space-y-2">
          <h3 className="font-medium">All Steps</h3>
          <ul className="space-y-1">
            {steps.map((step, index) => (
              <li
                key={index}
                className={`p-2 rounded-md flex items-center gap-2 ${
                  index === activeStep
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : index < activeStep
                      ? "text-muted-foreground line-through"
                      : "text-muted-foreground"
                }`}
              >
                {index < activeStep && <CheckCircle className="h-4 w-4 text-green-500" />}
                {index === activeStep && <Clock className="h-4 w-4 text-blue-500" />}
                {index > activeStep && <span className="h-4 w-4 rounded-full border border-slate-300 ml-1 mr-1"></span>}
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Work Simulations</h1>
        <p className="text-muted-foreground">
          Practice real-world job scenarios to build your skills and showcase your abilities to employers
        </p>
      </div>

      {!isStarted ? (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Simulations</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {renderSimulationList()}
          </TabsContent>
          <TabsContent value="recommended" className="space-y-4">
            <p className="text-muted-foreground">
              Based on your profile and job interests, we recommend these simulations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {simulationTypes.slice(0, 2).map((simulation) => (
                <Card key={simulation.id} className="border border-blue-100 hover:border-blue-300 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-blue-50 text-blue-600">{simulation.icon}</div>
                        <CardTitle className="text-lg">{simulation.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        {simulation.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">{simulation.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <span>{simulation.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {simulation.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-slate-100">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleStartSimulation(simulation.id)}
                    >
                      Start Simulation
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <p className="text-muted-foreground">You haven't completed any simulations yet.</p>
          </TabsContent>
        </Tabs>
      ) : (
        renderSimulationSteps()
      )}
    </div>
  )
}
