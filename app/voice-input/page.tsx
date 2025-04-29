import VoiceInputFull from "@/components/voice-input-full"
import JobGrid from "@/components/job-grid"

export default function VoiceInputPage() {
  return (
    <div className="full-width-container">
      <h1 className="text-3xl font-bold mb-6 text-primary">Voice Command Center</h1>
      <VoiceInputFull />
      <div className="mt-12 w-full">
        <h2 className="text-2xl font-bold mb-6 text-primary">Matched Jobs</h2>
        <JobGrid />
      </div>
    </div>
  )
}
