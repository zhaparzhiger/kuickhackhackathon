import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get("page") || "0"
    const perPage = searchParams.get("per_page") || "20"
    const text = searchParams.get("text") || ""
    const area = searchParams.get("area") || ""

    // Format the text query properly for HH.ru API
    let formattedText = ""
    if (text) {
      // Split the text by '+OR+' to get individual skills
      const skills = text.split("+OR+").map((skill) => decodeURIComponent(skill).trim())

      // Filter out non-technical terms and names
      const filteredSkills = skills.filter(skill => {
        // Skip very short terms
        if (skill.length < 3) return false
        
        // Skip common names
        const commonNames = ["john", "jane", "david", "michael", "robert", "mary", "james", "patricia", "jennifer", "linda", "william", "elizabeth", "richard", "barbara", "susan", "joseph", "jessica", "sarah", "thomas", "karen", "doe"]
        if (commonNames.includes(skill.toLowerCase())) return false
        
        // Skip common non-technical terms
        const nonTechnicalTerms = ["passionate", "building", "scalable", "applications", "solving", "complex", "problems"]
        if (nonTechnicalTerms.includes(skill.toLowerCase())) return false
        
        return true
      })

      // If we have multiple skills, format them as a proper OR query for HH.ru
      if (filteredSkills.length > 1) {
        // Join with OR operator in the format that HH.ru expects
        formattedText = filteredSkills
          .map((skill) =>
            // Wrap multi-word skills in quotes
            skill.includes(" ") ? `"${skill}"` : skill,
          )
          .join(" OR ")
      } else if (filteredSkills.length === 1) {
        formattedText = filteredSkills[0]
      }
      
      console.log("Filtered skills for job search:", filteredSkills)
    }

    // Use HTTPS for the HH.ru API to avoid security warnings
    let queryUrl = `https://api.hh.ru/vacancies?page=${page}&per_page=${perPage}`
    if (formattedText) {
      queryUrl += `&text=${encodeURIComponent(formattedText)}`
    } else {
      // If no skills were provided, use some default search terms
      queryUrl += `&text=${encodeURIComponent("developer OR programmer OR engineer OR analyst")}`
    }
    if (area) queryUrl += `&area=${area}`

    console.log("Fetching from HH.ru API:", queryUrl)

    const response = await fetch(queryUrl, {
      headers: {
        "User-Agent": "JobBlaze/1.0 (contact@jobblaze.ai; https://jobblaze.ai)",
        Accept: "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("HH.ru API error:", response.status, errorData)
      return NextResponse.json(
        { error: `API request failed: ${errorData.description || "Unknown error"}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: `Failed to fetch jobs from HH.ru: ${error.message}` }, { status: 500 })
  }
}
