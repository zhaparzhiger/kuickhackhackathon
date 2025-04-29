import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Invalid or missing text" }, { status: 400 })
    }

    console.log("Analyzing text:", text.substring(0, 200) + "...")

    // Use AI to extract skills
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer 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",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "JobBlaze",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-maverick:free",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Extract ONLY technical and professional skills from this resume text. 
                  
                  Focus on:
                  1. Programming languages (JavaScript, Python, etc.)
                  2. Frameworks and libraries (React, Django, etc.)
                  3. Tools and technologies (Git, Docker, AWS, etc.)
                  4. Domain expertise (Data Science, Web Development, etc.)
                  
                  Return ONLY a JSON array of strings with the skills. Example: ["JavaScript", "React", "AWS"]
                  Do NOT include names, job titles, or non-technical terms.
                  
                  Resume text: ${text}`,
                },
              ],
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error("AI service failed")
      }

      const data = await response.json()
      const skillsText = data.choices[0].message.content

      console.log("AI response:", skillsText)

      // Try to parse the JSON response
      try {
        const skills = JSON.parse(skillsText)
        if (Array.isArray(skills) && skills.length > 0) {
          console.log("Successfully extracted skills:", skills)
          return NextResponse.json({ skills })
        }
      } catch (parseError) {
        console.error("Failed to parse AI response:", parseError)
      }
    } catch (aiError) {
      console.error("AI extraction failed:", aiError)
    }

    // Fallback to rule-based extraction if AI fails
    const technicalSkills = extractTechnicalSkills(text)
    console.log("Fallback extracted skills:", technicalSkills)
    
    return NextResponse.json({ skills: technicalSkills })
  } catch (error: any) {
    console.error("Error analyzing skills:", error)
    return NextResponse.json({ error: `Failed to analyze skills: ${error.message}` }, { status: 500 })
  }
}

// Function to extract only technical skills from text
function extractTechnicalSkills(text: string): string[] {
  // List of known technical skills to look for
  const knownTechnicalSkills = [
    // Programming Languages
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "Ruby", "PHP", "Swift", "Kotlin", "Go", "Rust", "Scala", "R",
    // Web Technologies
    "HTML", "CSS", "SASS", "LESS", "JSON", "XML", "REST", "SOAP", "GraphQL", "WebSockets",
    // Frameworks & Libraries
    "React", "Angular", "Vue", "Next.js", "Svelte", "Node.js", "Express", "Django", "Flask", "Spring", "ASP.NET", "Laravel",
    "jQuery", "Bootstrap", "Tailwind", "Material UI", "Redux", "MobX", "RxJS", "D3.js", "Three.js",
    // Databases
    "SQL", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Oracle", "Redis", "Cassandra", "DynamoDB", "Firebase",
    "Supabase", "Elasticsearch", "Neo4j", "MariaDB",
    // Cloud & DevOps
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "GitHub Actions", "CircleCI",
    "Travis CI", "Heroku", "Vercel", "Netlify", "DigitalOcean", "Cloudflare",
    // Tools & Version Control
    "Git", "GitHub", "GitLab", "Bitbucket", "SVN", "Mercurial", "Jira", "Confluence", "Trello", "Asana",
    // Mobile
    "React Native", "Flutter", "iOS", "Android", "Xamarin", "Ionic", "Cordova",
    // Data Science & ML
    "TensorFlow", "PyTorch", "Keras", "scikit-learn", "Pandas", "NumPy", "SciPy", "Matplotlib", "Jupyter",
    "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Data Science", "Big Data", "Hadoop", "Spark",
    // Testing
    "Jest", "Mocha", "Chai", "Cypress", "Selenium", "Playwright", "Puppeteer", "JUnit", "TestNG", "PHPUnit",
    // Other Tech
    "Blockchain", "Ethereum", "Solidity", "WebAssembly", "WebGL", "WebRTC", "PWA", "SEO", "Accessibility",
    // Methodologies
    "Agile", "Scrum", "Kanban", "TDD", "BDD", "CI/CD", "DevOps", "Microservices", "Serverless"
  ]

  const foundSkills = new Set<string>()
  
  // Look for exact matches of known technical skills
  for (const skill of knownTechnicalSkills) {
    if (text.toLowerCase().includes(skill.toLowerCase())) {
      foundSkills.add(skill)
    }
  }
  
  // Look for programming languages and technologies with special patterns
  const techPatterns = [
    /\b[A-Za-z]+\.[A-Za-z]+\b/g,  // React.js, Node.js, etc.
    /\b[A-Za-z]+-[A-Za-z]+\b/g,   // Hyphenated technologies
    /\b[A-Z][A-Za-z]*\+\+\b/g,    // C++, etc.
    /\b[A-Z][A-Za-z]*#\b/g        // C#, etc.
  ]
  
  for (const pattern of techPatterns) {
    const matches = text.match(pattern) || []
    for (const match of matches) {
      // Check if it's likely a technology and not a name or common word
      if (!commonWords.includes(match.toLowerCase()) && !isLikelyName(match)) {
        foundSkills.add(match)
      }
    }
  }
  
  // Look for multi-word technical terms
  const technicalPhrases = [
    "Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision",
    "Data Science", "Big Data", "Cloud Computing", "Web Development", "Mobile Development",
    "Front End", "Back End", "Full Stack", "DevOps", "UI/UX Design", "Test Automation",
    "Continuous Integration", "Continuous Deployment", "Version Control", "Database Management",
    "API Development", "Microservices Architecture", "Serverless Computing", "Responsive Design"
  ]
  
  for (const phrase of technicalPhrases) {
    if (text.toLowerCase().includes(phrase.toLowerCase())) {
      foundSkills.add(phrase)
    }
  }
  
  return Array.from(foundSkills)
}

// Check if a word is likely a person's name
function isLikelyName(word: string): boolean {
  // Common first names
  const commonNames = ["john", "jane", "david", "michael", "robert", "mary", "james", "patricia", "jennifer", "linda", "william", "elizabeth", "richard", "barbara", "susan", "joseph", "jessica", "sarah", "thomas", "karen", "doe"]
  
  return commonNames.includes(word.toLowerCase())
}

// Common words to exclude from skill extraction
const commonWords = [
  "the", "and", "that", "have", "for", "not", "with", "you", "this", "but", "his", "from", "they",
  "she", "will", "would", "there", "their", "what", "about", "which", "when", "make", "like", "time",
  "just", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see",
  "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back",
  "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want",
  "because", "any", "these", "give", "day", "most", "summary", "experience", "resume", "professional",
  "career", "job", "years", "month", "months", "year", "present", "current", "previous", "education",
  "university", "college", "degree", "bachelor", "master", "phd", "certificate", "certified", "work",
  "worked", "working", "position", "company", "business", "industry", "team", "project", "client",
  "responsible", "responsibilities", "duty", "duties", "task", "tasks", "managed", "management", "led",
  "leadership", "developed", "development", "created", "built", "designed", "implemented", "maintained",
  "improved", "enhanced", "increased", "decreased", "reduced", "achieved", "accomplished", "delivered",
  "completed", "successful", "successfully", "effectively", "efficiently", "proficient", "proficiency",
  "knowledge", "experienced", "expertise", "expert", "advanced", "intermediate", "beginner", "familiar",
  "understanding", "ability", "capable", "competent", "competency", "strong", "excellent", "outstanding"
]
