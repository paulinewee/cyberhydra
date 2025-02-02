import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  const onboardingData = await request.json()

  const prompt = `
    Based on this company's profile and email addresses:
    - Industry: ${onboardingData.company.industry}
    - Size: ${onboardingData.company.size}
    - Website: ${onboardingData.company.website}
    - Emails: ${JSON.stringify(onboardingData.contacts)}
    - Current Security: ${onboardingData.security.hasMeasures}
    - Past Incidents: ${onboardingData.security.hadIncidents}
    - Main Concern: ${onboardingData.security.topConcern}

    Generate a security analysis including:
    1. Industry-specific threats
    2. Critical security gaps
    3. Simulated email breach check results
    4. Recommended actions

    For the email breach check, simulate checking against known data breaches
    and provide realistic but synthetic breach details.

    Return the data in this JSON format:
    {
      "industrySpecificThreats": [
        {
          "name": string,  // Specific threat name
          "value": number, // Risk score (0-100)
          "description": string, // Brief description of the threat
          "trend": "increasing" | "stable" | "decreasing"
        }
      ],
      "securityGaps": [{"gap": string, "impact": number}],
      "emailBreachResults": [{"email": string, "breached": boolean, "breachDetails": string}],
      "recommendedActions": [{"action": string, "priority": "high"|"medium"|"low"}]
    }
  `

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4-turbo-preview",
    response_format: { type: "json_object" }
  })

  const analysis = JSON.parse(completion.choices[0].message.content)
  return NextResponse.json(analysis)
} 