"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building,
  MapPin,
  DollarSign,
  FileText,
  Bookmark,
  ExternalLink,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Upload,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  matchPercentage: number
  description: string
  posted: string
  tags: string[]
  type: string
  experience: string
  remote: boolean
  url: string
}

export default function JobListingsGrid() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [cachedJobs, setCachedJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [salaryRange, setSalaryRange] = useState([0, 500000])
  const [resumeSkills, setResumeSkills] = useState<string[]>([])
  const [filters, setFilters] = useState({
    remote: false,
    fullTime: false,
    entry: false,
  })

  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [searchInProgress, setSearchInProgress] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("savedJobs")
    if (saved) {
      setSavedJobs(JSON.parse(saved))
    }
    const cached = localStorage.getItem("cachedJobs")
    if (cached) {
      setCachedJobs(JSON.parse(cached))
      setJobs(JSON.parse(cached))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs))
  }, [savedJobs])

  useEffect(() => {
    localStorage.setItem("cachedJobs", JSON.stringify(cachedJobs))
  }, [cachedJobs])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file")
      return
    }

    setUploading(true)
    setError(null)
    setSearchInProgress(true)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const uploadResponse = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error(`Server error: ${uploadResponse.statusText}`)
      }

      const uploadData = await uploadResponse.json()
      if (uploadData.error) {
        setError(uploadData.error)
        return
      }

      const resumeText = uploadData.text

      const analyzeResponse = await fetch("/api/analyze-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: resumeText }),
      })

      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json()
        throw new Error(errorData.error || "Failed to analyze skills")
      }

      const analyzeData = await analyzeResponse.json()
      if (analyzeData.error) {
        setError(analyzeData.error)
        return
      }

      // Set the extracted skills and reset page to 0
      setResumeSkills(analyzeData.skills)
      setCurrentPage(0)
      console.log("Extracted skills:", analyzeData.skills)

      // Immediately search for jobs with these skills
      await fetchJobsWithSkills(analyzeData.skills, 0, perPage)
    } catch (err: any) {
      console.error("Error uploading resume:", err)
      setError(err.message || "Failed to process resume")
    } finally {
      setUploading(false)
      setSearchInProgress(false)
      event.target.value = ""
    }
  }

  const fetchJobsWithSkills = async (skills: string[], page: number, itemsPerPage: number) => {
    setLoading(true)
    setError(null)

    try {
      if (skills.length === 0) {
        console.warn("No skills provided for job search")
        setError("No skills found in resume. Please upload a different resume.")
        setLoading(false)
        return
      }

      // Use only technical skills for the search query
      // Limit to top 5 skills for more focused results
      const topSkills = skills.slice(0, 5)
      const skillsQuery = topSkills.map((skill) => encodeURIComponent(skill.trim())).join("+OR+")
      const query = `/api/jobs?page=${page}&per_page=${itemsPerPage}&text=${skillsQuery}`

      console.log("Fetching jobs with query:", query)

      const response = await fetch(query)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch jobs")
      }

      const data = await response.json()

      if (data.items && data.items.length > 0) {
        const transformedJobs = data.items.map((vacancy: any) => transformVacancyToJob(vacancy, skills))
        setJobs(transformedJobs)
        setCachedJobs(transformedJobs)
        setTotalPages(data.pages || 1)
      } else {
        setJobs([])
        setTotalPages(1)
        setError("No job listings found. Try uploading a different resume or adjusting your skills.")
      }
    } catch (err: any) {
      console.error("Error fetching jobs:", err)
      setError(err.message || "Failed to load job listings")
      setJobs([])
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  // Effect to fetch jobs when resumeSkills change or pagination changes
  useEffect(() => {
    if (!uploading && !searchInProgress && resumeSkills.length > 0) {
      fetchJobsWithSkills(resumeSkills, currentPage, perPage)
    } else if (!uploading && !searchInProgress && resumeSkills.length === 0) {
      // Fetch default jobs if no skills
      fetchDefaultJobs()
    }
  }, [currentPage, perPage, resumeSkills, uploading, searchInProgress])

  const fetchDefaultJobs = async () => {
    setLoading(true)
    setError(null)

    try {
      const query = `/api/jobs?page=${currentPage}&per_page=${perPage}`
      console.log("Fetching default jobs:", query)

      const response = await fetch(query)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch jobs")
      }

      const data = await response.json()

      if (data.items && data.items.length > 0) {
        const transformedJobs = data.items.map((vacancy: any) => transformVacancyToJob(vacancy, []))
        setJobs(transformedJobs)
        setCachedJobs(transformedJobs)
        setTotalPages(data.pages || 1)
      } else {
        setJobs([])
        setTotalPages(1)
        setError("No job listings found.")
      }
    } catch (err: any) {
      console.error("Error fetching default jobs:", err)
      setError(err.message || "Failed to load job listings")
      setJobs([])
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  const transformVacancyToJob = (vacancy: any, skills: string[]): Job => {
    let salaryText = "Salary not specified"
    if (vacancy.salary) {
      const { from, to, currency } = vacancy.salary
      if (from && to) {
        salaryText = `${formatCurrency(from, currency)} - ${formatCurrency(to, currency)}`
      } else if (from) {
        salaryText = `From ${formatCurrency(from, currency)}`
      } else if (to) {
        salaryText = `Up to ${formatCurrency(to, currency)}`
      }
    }

    const location = vacancy.address?.city || vacancy.area.name || "Location not specified"

    const postedDate = new Date(vacancy.published_at)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - postedDate.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    let postedText = ""
    if (diffDays === 0) {
      postedText = "Today"
    } else if (diffDays === 1) {
      postedText = "Yesterday"
    } else if (diffDays < 7) {
      postedText = `${diffDays} days ago`
    } else if (diffDays < 30) {
      postedText = `${Math.floor(diffDays / 7)} weeks ago`
    } else {
      postedText = `${Math.floor(diffDays / 30)} months ago`
    }

    const tags: string[] = []
    vacancy.professional_roles?.forEach((role: any) => {
      if (!tags.includes(role.name)) {
        tags.push(role.name)
      }
    })
    if (vacancy.employment && !tags.includes(vacancy.employment.name)) {
      tags.push(vacancy.employment.name)
    }

    // Calculate match percentage based on skills
    let matchPercentage = 70 // Default match percentage

    if (skills.length > 0) {
      const jobRequirements = [
        ...(vacancy.snippet?.requirement?.toLowerCase().split(/[,.\s]+/) || []),
        ...(vacancy.snippet?.responsibility?.toLowerCase().split(/[,.\s]+/) || []),
        ...tags.map((tag) => tag.toLowerCase()),
        ...(vacancy.name?.toLowerCase().split(/[,.\s]+/) || []),
      ]

      const matchedSkills = skills.filter((skill) => jobRequirements.some((req) => req.includes(skill.toLowerCase())))

      matchPercentage =
        skills.length > 0
          ? Math.min(100, Math.round((matchedSkills.length / Math.min(skills.length, 5)) * 100))
          : Math.floor(Math.random() * 30) + 70
    }

    const isRemote =
      vacancy.schedule.name.toLowerCase().includes("remote") ||
      vacancy.name.toLowerCase().includes("remote") ||
      vacancy.name.toLowerCase().includes("удаленн") ||
      (vacancy.snippet?.responsibility &&
        (vacancy.snippet.responsibility.toLowerCase().includes("remote") ||
          vacancy.snippet.responsibility.toLowerCase().includes("удаленн")))

    return {
      id: vacancy.id,
      title: vacancy.name,
      company: vacancy.employer.name,
      location,
      salary: salaryText,
      matchPercentage,
      description: vacancy.snippet?.responsibility || vacancy.snippet?.requirement || "No description provided",
      posted: postedText,
      tags,
      type: vacancy.schedule.name,
      experience: vacancy.experience.name,
      remote: isRemote,
      url: vacancy.alternate_url,
    }
  }

  const formatCurrency = (amount: number, currency: string): string => {
    switch (currency) {
      case "RUR":
      case "RUB":
        return `${amount.toLocaleString("ru-RU")} ₽`
      case "USD":
        return `$${amount.toLocaleString("en-US")}`
      case "EUR":
        return `€${amount.toLocaleString("de-DE")}`
      case "KZT":
        return `${amount.toLocaleString("kk-KZ")} ₸`
      case "BYR":
      case "BYN":
        return `${amount.toLocaleString("be-BY")} Br`
      case "UZS":
        return `${amount.toLocaleString("uz-UZ")} UZS`
      case "KGS":
        return `${amount.toLocaleString("ky-KY")} KGS`
      default:
        return `${amount.toLocaleString()} ${currency}`
    }
  }

  const handleGenerateCoverLetter = (job: Job) => {
    setSelectedJob(job)
    setShowModal(true)
  }

  const toggleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId))
    } else {
      setSavedJobs([...savedJobs, jobId])
    }
  }

  const handleApplyNow = (job: Job) => {
    if (job.url) {
      window.open(job.url, "_blank")
    }
  }

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "saved" && !savedJobs.includes(job.id)) return false

    if (job.salary !== "Salary not specified") {
      const salaryMatch = job.salary.match(/\d+/g)
      if (salaryMatch && salaryMatch.length > 0) {
        const minSalary = Number.parseInt(salaryMatch[0].replace(/,/g, ""))
        if (minSalary < salaryRange[0]) return false
      }
    }

    if (filters.remote && !job.remote) return false
    if (filters.fullTime && !job.type.toLowerCase().includes("full")) return false
    if (filters.entry && !job.experience.toLowerCase().includes("no experience")) return false

    return true
  })

  const toggleFilter = (filter: string) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter],
    })
  }

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page)
      window.scrollTo(0, 0)
    }
  }

  const handlePerPageChange = (value: string) => {
    setPerPage(Number.parseInt(value))
    setCurrentPage(0)
  }

  return (
    <div className="w-full max-w-none !mx-0 !px-0 !my-0 mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.remote ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFilter("remote")}
            className={filters.remote ? "bg-primary" : ""}
          >
            Remote
          </Button>
          <Button
            variant={filters.fullTime ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFilter("fullTime")}
            className={filters.fullTime ? "bg-primary" : ""}
          >
            Full-time
          </Button>
          <Button
            variant={filters.entry ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFilter("entry")}
            className={filters.entry ? "bg-primary" : ""}
          >
            Entry-level
          </Button>
          <label htmlFor="resume-upload" className="relative">
            <Button
              variant="outline"
              size="sm"
              disabled={uploading}
              className="flex items-center gap-2"
              onClick={() => document.getElementById("resume-upload")?.click()}
            >
              <Upload className="h-4 w-4" />
              {uploading ? "Uploading..." : "Upload Resume"}
            </Button>
            <input id="resume-upload" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
        {resumeSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Skills:</span>
            {resumeSkills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs ({savedJobs.length})</TabsTrigger>
          </TabsList>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">
                Salary Range: {salaryRange[0].toLocaleString()} - {salaryRange[1].toLocaleString()}
              </span>
            </div>
            <Slider
              defaultValue={[0, 500000]}
              min={0}
              max={500000}
              step={10000}
              value={salaryRange}
              onValueChange={setSalaryRange}
              className="mb-6"
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Loading jobs...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : (
            <>
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isSaved={savedJobs.includes(job.id)}
                      onSave={() => toggleSaveJob(job.id)}
                      onGenerateCoverLetter={() => handleGenerateCoverLetter(job)}
                      onApply={() => handleApplyNow(job)}
                    />
                  ))}
                </div>

                {filteredJobs.length === 0 && (
                  <div className="text-center py-12">
                    <Filter className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No matching jobs found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Try adjusting your filters or uploading a resume
                    </p>
                    <Button
                      onClick={() => {
                        setFilters({ remote: false, fullTime: false, entry: false })
                        setSalaryRange([0, 500000])
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="saved" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isSaved={true}
                      onSave={() => toggleSaveJob(job.id)}
                      onGenerateCoverLetter={() => handleGenerateCoverLetter(job)}
                      onApply={() => handleApplyNow(job)}
                    />
                  ))}
                </div>

                {filteredJobs.length === 0 && (
                  <div className="text-center py-12">
                    <Bookmark className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No saved jobs yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Save jobs you're interested in to view them later
                    </p>
                    <Button onClick={() => setActiveTab("all")}>Browse Jobs</Button>
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Items per page:</span>
          <Select value={perPage.toString()} onValueChange={handlePerPageChange}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder={perPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={() => handlePageChange(0)} disabled={currentPage === 0}>
            <ChevronLeft className="h-4 w-4" />
            <ChevronLeft className="h-4 w-4 -ml-2" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center mx-2">
            <span className="text-sm font-medium">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(totalPages - 1)}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
            <ChevronRight className="h-4 w-4 -ml-2" />
          </Button>
        </div>
      </div>

      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Generate Cover Letter</h2>
            <p className="mb-4">
              Generate a personalized cover letter for {selectedJob.title} at {selectedJob.company}
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button>Generate</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface JobCardProps {
  job: Job
  isSaved: boolean
  onSave: () => void
  onGenerateCoverLetter: () => void
  onApply: () => void
}

function JobCard({ job, isSaved, onSave, onGenerateCoverLetter, onApply }: JobCardProps) {
  return (
    <Card className="job-card border-2 hover:border-primary/30 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-primary"
              style={{
                clipPath: `path('M 50 0 A 50 50 0 ${job.matchPercentage >= 50 ? 1 : 0} 1 ${
                  50 + 50 * Math.cos((job.matchPercentage / 100) * Math.PI * 2)
                } ${50 + 50 * Math.sin((job.matchPercentage / 100) * Math.PI * 2)} L 50 50 Z')`,
              }}
            ></div>
            <span className="text-sm font-bold">{job.matchPercentage}%</span>
          </div>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
          <Building className="h-4 w-4 mr-1" />
          <span>{job.company}</span>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{job.location}</span>
          {job.remote && (
            <Badge variant="outline" className="ml-2 text-xs">
              Remote
            </Badge>
          )}
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          <span>
            {job.type} • {job.experience}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2 job-card-content">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">{job.description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {job.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {tag}
            </Badge>
          ))}
          {job.tags.length > 3 && (
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            >
              +{job.tags.length - 3} more
            </Badge>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Posted {job.posted}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-2 job-card-footer">
        <div className="flex justify-between w-full">
          <Button variant="outline" size="sm" className="hover:bg-primary/10" onClick={onSave}>
            {isSaved ? (
              <>
                <Bookmark className="h-4 w-4 mr-1 fill-primary" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4 mr-1" />
                Save
              </>
            )}
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={onGenerateCoverLetter}>
            <FileText className="h-4 w-4 mr-1" />
            Cover Letter
          </Button>
        </div>
        <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={onApply}>
          <ExternalLink className="h-4 w-4 mr-1" />
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  )
}
