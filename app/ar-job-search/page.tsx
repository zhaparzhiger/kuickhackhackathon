"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, DollarSign, Camera, X, Check } from "lucide-react"
import { useXP } from "@/components/xp-provider"
import Script from "next/script"
import Head from "next/head"

// Mock job data with coordinates for Almaty
const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Almaty, KZ",
    salary: "60,000 KZT",
    lat: 43.2389,
    lon: 76.8897,
    distance: "0.2 km",
    type: "Full-time",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Almaty, KZ",
    salary: "55,000 KZT",
    lat: 43.239,
    lon: 76.89,
    distance: "0.3 km",
    type: "Full-time",
    tags: ["Figma", "Adobe XD", "Prototyping"],
  },
  {
    id: 3,
    title: "Barista",
    company: "Coffee House",
    location: "Almaty, KZ",
    salary: "35,000 KZT",
    lat: 43.2392,
    lon: 76.8895,
    distance: "0.4 km",
    type: "Part-time",
    tags: ["Customer Service", "Food Service"],
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataWorks",
    location: "Almaty, KZ",
    salary: "75,000 KZT",
    lat: 43.2385,
    lon: 76.889,
    distance: "0.5 km",
    type: "Full-time",
    tags: ["Python", "Machine Learning", "SQL"],
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "GrowthMarketing",
    location: "Almaty, KZ",
    salary: "50,000 KZT",
    lat: 43.2395,
    lon: 76.8905,
    distance: "0.6 km",
    type: "Full-time",
    tags: ["Digital Marketing", "SEO", "Content Strategy"],
  },
]

// City coordinates for demo
const cityCoords = {
  Almaty: [43.2389, 76.8897],
  Astana: [51.1694, 71.4491],
  Shymkent: [42.3167, 69.5901],
}

export default function ARJobSearch() {
  const [city, setCity] = useState("Almaty")
  const [arActive, setArActive] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [scriptsLoaded, setScriptsLoaded] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const arSceneRef = useRef(null)
  const { addXP } = useXP()

  // Handle city change
  const handleCityChange = (e) => {
    setCity(e.target.value)
  }

  // Start AR experience
  const startAR = async () => {
    setArActive(true)
    addXP(10)

    // Simulate getting user location
    if (cityCoords[city]) {
      setUserLocation({
        latitude: cityCoords[city][0],
        longitude: cityCoords[city][1],
      })
    }
  }

  // Stop AR experience
  const stopAR = () => {
    setArActive(false)
    setSelectedJob(null)
  }

  // Select a job
  const selectJob = (job) => {
    setSelectedJob(job)
    addXP(5)
  }

  // Handle apply form submission
  const handleApply = (e) => {
    e.preventDefault()
    setApplicationSubmitted(true)
    addXP(15)

    // In a real app, this would send the application to a backend
    console.log("Application submitted:", {
      job: selectedJob,
      applicant: formData,
    })
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Reset application form
  const resetApplication = () => {
    setApplicationSubmitted(false)
    setShowApplyForm(false)
    setSelectedJob(null)
    setFormData({ name: "", email: "", phone: "" })
  }

  // Create job entities in AR scene
  useEffect(() => {
    if (arActive && scriptsLoaded && userLocation && arSceneRef.current) {
      // Clear existing entities
      const existingEntities = document.querySelectorAll(".job-entity")
      existingEntities.forEach((entity) => entity.parentNode.removeChild(entity))

      // Add job entities to the scene
      mockJobs.forEach((job, index) => {
        // Create random offsets for demo purposes
        const latOffset = (Math.random() - 0.5) * 0.002
        const lonOffset = (Math.random() - 0.5) * 0.002

        // Create entity
        const entity = document.createElement("a-entity")
        entity.classList.add("job-entity")
        entity.setAttribute("data-job-id", job.id)

        // Position the entity with GPS coordinates
        entity.setAttribute(
          "gps-entity-place",
          `latitude: ${userLocation.latitude + latOffset}; longitude: ${userLocation.longitude + lonOffset}`,
        )

        // Create job card
        entity.innerHTML = `
          <a-entity
            geometry="primitive: plane; width: 2; height: 1.2"
            material="color: white; opacity: 0.9"
            position="0 0 0"
            rotation="0 0 0"
            scale="1 1 1"
            class="clickable"
            job-marker="id: ${job.id}"
          >
            <a-text
              value="${job.title}"
              align="center"
              color="#4F46E5"
              position="0 0.4 0.01"
              scale="0.5 0.5 0.5"
            ></a-text>
            <a-text
              value="${job.company}"
              align="center"
              color="#000"
              position="0 0.2 0.01"
              scale="0.4 0.4 0.4"
            ></a-text>
            <a-text
              value="${job.salary}"
              align="center"
              color="#000"
              position="0 0 0.01"
              scale="0.4 0.4 0.4"
            ></a-text>
            <a-text
              value="${job.distance}"
              align="center"
              color="#000"
              position="0 -0.2 0.01"
              scale="0.3 0.3 0.3"
            ></a-text>
            <a-entity
              geometry="primitive: plane; width: 1; height: 0.3"
              material="color: #4F46E5"
              position="0 -0.4 0.02"
              class="apply-button"
              job-apply="id: ${job.id}"
            >
              <a-text
                value="Apply Now"
                align="center"
                color="white"
                position="0 0 0.01"
                scale="0.3 0.3 0.3"
              ></a-text>
            </a-entity>
          </a-entity>
        `

        arSceneRef.current.appendChild(entity)
      })

      // Add click event listeners
      setTimeout(() => {
        // Add component for job marker click
        if (typeof AFRAME !== "undefined") {
          AFRAME.registerComponent("job-marker", {
            schema: {
              id: { type: "string" },
            },
            init: function () {
              this.el.addEventListener("click", () => {
                const jobId = Number.parseInt(this.data.id)
                const job = mockJobs.find((j) => j.id === jobId)
                if (job) {
                  selectJob(job)
                }
              })
            },
          })

          // Add component for apply button click
          AFRAME.registerComponent("job-apply", {
            schema: {
              id: { type: "string" },
            },
            init: function () {
              this.el.addEventListener("click", () => {
                const jobId = Number.parseInt(this.data.id)
                const job = mockJobs.find((j) => j.id === jobId)
                if (job) {
                  selectJob(job)
                  setShowApplyForm(true)
                }
              })
            },
          })

          // Make entities face the camera
          const lookAtCamera = () => {
            document.querySelectorAll(".job-entity a-entity").forEach((entity) => {
              entity.setAttribute("look-at", "[gps-camera]")
            })
          }

          lookAtCamera()
          setInterval(lookAtCamera, 1000)
        }
      }, 1000)
    }
  }, [arActive, scriptsLoaded, userLocation])

  // Handle scripts loaded
  const handleScriptsLoaded = () => {
    setScriptsLoaded(true)
  }

  return (
    <div className="w-full">
      <Head>
        {arActive && (
          <>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
            <meta name="apple-mobile-web-app-capable" content="yes" />
          </>
        )}
      </Head>

      {/* Load A-Frame and AR.js scripts */}
      <Script
        src="https://aframe.io/releases/1.4.0/aframe.min.js"
        onLoad={handleScriptsLoaded}
        strategy="beforeInteractive"
      />
      <Script
        src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js"
        strategy="beforeInteractive"
      />

      <h1 className="text-3xl font-bold mb-6 text-primary">AR Job Search</h1>

      {!arActive ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Find Jobs in Augmented Reality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Experience job hunting in a new way! Point your camera around you to see available jobs in your vicinity
                through augmented reality.
              </p>

              <div className="mb-6">
                <Label htmlFor="city">Select City</Label>
                <select
                  id="city"
                  className="w-full mt-1 p-2 rounded-md border border-input bg-background"
                  value={city}
                  onChange={handleCityChange}
                >
                  <option value="Almaty">Almaty</option>
                  <option value="Astana">Astana</option>
                  <option value="Shymkent">Shymkent</option>
                </select>
              </div>

              <Button onClick={startAR} className="w-full bg-primary hover:bg-primary/90">
                <Camera className="mr-2 h-4 w-4" />
                Start AR Job Search
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="relative">
          {/* AR Scene */}
          <div className="relative w-full h-[80vh] bg-black rounded-lg overflow-hidden mb-4">
            <a-scene
              ref={arSceneRef}
              vr-mode-ui="enabled: false"
              embedded
              arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
              renderer="logarithmicDepthBuffer: true;"
              className="w-full h-full"
            >
              <a-camera gps-camera rotation-reader></a-camera>
            </a-scene>

            {/* AR Controls */}
            <div className="absolute top-4 right-4 z-10">
              <Button onClick={stopAR} variant="destructive" size="sm" className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Selected Job Details */}
          {selectedJob && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{selectedJob.company}</p>
                  </div>
                  <Badge className="bg-primary text-white">{selectedJob.distance}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{selectedJob.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{selectedJob.type}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedJob.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {!showApplyForm && !applicationSubmitted && (
                  <Button onClick={() => setShowApplyForm(true)} className="w-full bg-primary hover:bg-primary/90">
                    Apply Now
                  </Button>
                )}

                {showApplyForm && !applicationSubmitted && (
                  <form onSubmit={handleApply} className="space-y-3">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowApplyForm(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                        Submit Application
                      </Button>
                    </div>
                  </form>
                )}

                {applicationSubmitted && (
                  <div className="text-center py-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Application Submitted!</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Your application for {selectedJob.title} at {selectedJob.company} has been submitted successfully.
                    </p>
                    <Button onClick={resetApplication} className="bg-primary hover:bg-primary/90">
                      Find More Jobs
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Job Listings */}
      <Card>
        <CardHeader>
          <CardTitle>Jobs in {city}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => selectJob(job)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">{job.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary">{job.distance}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{job.salary}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {job.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {job.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{job.tags.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
