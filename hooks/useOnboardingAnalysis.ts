"use client"

import { useState, useEffect } from 'react'

type OnboardingData = {
  company: {
    name: string
    industry: string
    size: string
    description: string
  }
  contacts: {
    primary: {
      name: string
      email: string
      role: string
    }
    additional: Array<{
      name: string
      email: string
      role: string
    }>
  }
  security: {
    hasMeasures: string
    hadIncidents: string
    topConcern: string
  }
}

export function useOnboardingAnalysis() {
  const [analysis, setAnalysis] = useState<null | {
    industrySpecificThreats: Array<{ threat: string; risk: number }>
    recommendedActions: Array<{ action: string; priority: 'high' | 'medium' | 'low' }>
    sizeBasedMetrics: Array<{ metric: string; value: number }>
    securityGaps: Array<{ gap: string; impact: number }>
  }>(null)

  useEffect(() => {
    const analyzeOnboardingData = async () => {
      const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}')
      
      try {
        const response = await fetch('/api/analyze-security', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(onboardingData),
        })
        
        const data = await response.json()
        setAnalysis(data)
      } catch (error) {
        console.error('Failed to analyze onboarding data:', error)
      }
    }

    analyzeOnboardingData()
  }, [])

  return analysis
} 