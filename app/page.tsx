import HeroSection from "@/components/hero-section"
import SearchBar from "@/components/search-bar"
import JobListingsGrid from "@/components/job-listings-grid"
import VoiceCommand from "@/components/voice-command"
import JobAlerts from "@/components/job-alerts"
import SalaryInsights from "@/components/salary-insights"

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 w-full">
        <div className="lg:col-span-9">
          <SearchBar />
        </div>
        <div className="lg:col-span-3">
          <VoiceCommand />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-primary">Featured Job Listings</h2>
      <JobListingsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12 mb-12 w-full">
        <div className="lg:col-span-8">
          <JobAlerts />
        </div>
        <div className="lg:col-span-4">
          <SalaryInsights />
        </div>
      </div>
    </div>
  )
}
