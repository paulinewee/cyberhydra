import OpenAI from 'openai'
import { NextResponse } from 'next/server'

export const maxDuration = 60;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  const onboardingData = await request.json()

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

    Consider startup-specific factors like:
    1. Rapid growth and scaling challenges
    2. Limited security resources and budget
    3. Protecting intellectual property
    4. Securing investor relationships and data
    5. Common startup industry threats
    6. Remote/hybrid workforce security
    7. Cloud infrastructure vulnerabilities
    8. Compliance requirements for startups in ${onboardingData.company.industry}

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

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" }
  })

  const analysis = JSON.parse(completion.choices[0].message.content)
  return NextResponse.json(analysis)
} 