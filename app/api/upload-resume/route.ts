import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
    }

    // Limit file size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 })
    }

    // For demonstration purposes, we'll use a sample resume text
    // In a real implementation, you would use a PDF parsing library
    const sampleResumeText = `
      John Doe
      Software Developer
      
      SUMMARY
      Experienced software developer with 5 years of expertise in JavaScript, Python, and SQL.
      Passionate about building scalable web applications and solving complex problems.
      
      SKILLS
      Programming Languages: JavaScript, Python, SQL, HTML, CSS
      Frameworks & Libraries: Express.js, Django, Flask
      Tools & Technologies: Git, Docker, AWS, Linux
      Soft Skills: Team Collaboration, Problem Solving, Communication
      
      WORK EXPERIENCE
      Senior Developer, ABC Tech (2020-Present)
      - Developed and maintained RESTful APIs using Express.js and MongoDB
      - Implemented CI/CD pipelines with GitHub Actions
      - Led a team of 3 junior developers on various projects
      
      Web Developer, XYZ Solutions (2018-2020)
      - Built responsive web applications using React and Node.js
      - Optimized database queries resulting in 30% performance improvement
      - Collaborated with UX designers to implement user-friendly interfaces
      
      EDUCATION
      Bachelor of Science in Computer Science
      University of Technology, 2018
      
      PROJECTS
      E-commerce Platform
      - Built a full-stack e-commerce platform using MERN stack
      - Implemented secure payment processing with Stripe API
      
      Data Visualization Dashboard
      - Created interactive dashboards using D3.js and Python
      - Processed large datasets with Pandas and NumPy
      
      CERTIFICATIONS
      AWS Certified Developer
      MongoDB Certified Developer
    `

    console.log("Using sample resume text (first 200 chars):", sampleResumeText.substring(0, 200))

    return NextResponse.json({ text: sampleResumeText })
  } catch (error: any) {
    console.error("Error processing resume:", {
      message: error.message,
      stack: error.stack,
    })
    return NextResponse.json({ error: `Failed to process resume: ${error.message}` }, { status: 500 })
  }
}
