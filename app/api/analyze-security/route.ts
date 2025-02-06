import OpenAI from 'openai'
import { NextResponse } from 'next/server'

export const maxDuration = 60;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Dummy data for development and fallback
const dummyAnalysis = {
  industrySpecificThreats: [
    {
      name: "Phishing Attacks",
      value: 85,
      description: "Targeted email scams attempting to steal credentials",
      trend: "increasing"
    },
    {
      name: "Ransomware Attacks",
      value: 75,
      description: "Malicious software that encrypts files and demands ransom",
      trend: "increasing"
    },
    {
      name: "Data Breaches",
      value: 65,
      description: "Unauthorized access to sensitive data",
      trend: "increasing"
    }
  ],
  securityGaps: [
    { gap: "Missing MFA", impact: 90 },
    { gap: "Weak Password Policy", impact: 80 },
    { gap: "Suspicious Links", impact: 75 },
  ],
  emailBreachResults: [
    { email: "test@example.com", breached: false, breachDetails: "No breaches found" },
    { email: "test2@example.com", breached: true, breachDetails: "Breached in 2023" }
  ],
  recommendedActions: [
    { action: "Require MFA", priority: "high" },
    { action: "Update Password Policy", priority: "medium" },
    { action: "Monitor Suspicious Links", priority: "low" },
    { action: "Review Permissions", priority: "medium" }
  ]
};

export async function POST(request: Request) {

  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.json(dummyAnalysis)
  }

  // Only proceed with OpenAI API call in production
  let onboardingData;
  try {
    onboardingData = await request.json()
  } catch (error) {
    return NextResponse.json(dummyAnalysis)
  }

  // Validate onboarding data has all required fields
  if (!onboardingData?.company?.industry ||
      !onboardingData?.company?.size ||
      !onboardingData?.company?.website ||
      !onboardingData?.contacts ||
      !onboardingData?.security?.hasMeasures ||
      !onboardingData?.security?.hadIncidents ||
      !onboardingData?.security?.topConcern) {
    return NextResponse.json(dummyAnalysis)
  }

  
  const prompt = `
    You are a cybersecurity expert specializing in protecting startups and high-growth companies.
    
    Analyze this startup's security needs based on their profile:
    - Company Name: ${onboardingData.company.name}
    - Industry: ${onboardingData.company.industry}
    - Company Size: ${onboardingData.company.size}
    - Description: ${onboardingData.company.description}
    - Website: ${onboardingData.company.website}
    - Current Security Measures: ${onboardingData.security.hasMeasures}
    - Past Incidents: ${onboardingData.security.hadIncidents}
    - Primary Concern: ${onboardingData.security.topConcern}

<<<<<<< HEAD
    Consider startup-specific factors like:
    1. Rapid growth and scaling challenges
    2. Limited security resources and budget
    3. Protecting intellectual property
    4. Securing investor relationships and data
    5. Common startup industry threats
    6. Remote/hybrid workforce security
    7. Cloud infrastructure vulnerabilities
    8. Compliance requirements for startups in ${onboardingData.company.industry}
=======
    Generate a security analysis including:
    1. Industry-specific threats (atleast 3-4)
    2. Critical security gaps (atleast 4-5) (e.g., missing MFA, weak passwords, suspicious links, incorrect permissions)
    3. Simulated email breach check results (2-3 emails)
    4. Recommended actions (2-3 recommendations)
>>>>>>> 70ebc77 (cleanup)

    Generate a startup-focused security analysis including:
    1. Industry-specific threats that commonly target startups in this space
    2. Critical security gaps that could impact growth/funding
    3. Cost-effective security recommendations
    4. Email security analysis for the founding team
    5. Startup-appropriate security metrics

    Return the data in this JSON format:
    {
      "industrySpecificThreats": [
        {
          "name": string,
          "value": number,
          "description": string,
          "trend": string,
          "startupImpact": string // Specific impact on startups
        }
      ],
      "securityGaps": [
        {
          "gap": string,
          "impact": number,
          "growthRisk": string // How it could affect startup growth
        }
      ],
      "emailBreachResults": [
        {
          "email": string,
          "breached": boolean,
          "breachDetails": string,
          "startupRisks": string // Startup-specific risks if breached
        }
      ],
      "recommendedActions": [
        {
          "action": string,
          "priority": "high"|"medium"|"low",
          "cost": "low"|"medium"|"high",
          "scalability": string // How it scales with startup growth
        }
      ]
    }
  `

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content
    if (!content) {
      throw new Error('No content received from OpenAI')
    }

    const analysis = JSON.parse(content)
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Error calling OpenAI:', error)
    return NextResponse.json(dummyAnalysis)
  }
    
} 