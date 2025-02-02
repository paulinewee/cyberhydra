"use client"

import { memo } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

interface EmailBreachCheckProps {
  emails: string[]
  breachResults: {
    email: string
    breached: boolean
    breachDetails?: string
  }[] | null
}

export const EmailBreachCheck = memo(function EmailBreachCheck({ emails, breachResults }: EmailBreachCheckProps) {
  return (
    <Card className="p-6">
      <CardHeader className="px-4">
        <CardTitle className="text-lg font-medium">Email Security Check</CardTitle>
        <CardDescription className="text-sm">
          Analysis of potential data breaches involving company emails
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {!breachResults ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Checking email security...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {breachResults.map((result) => (
              <div 
                key={result.email}
                className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200"
              >
                {result.breached ? (
                  <AlertCircle className="h-5 w-5 text-[#CE203C] mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                )}
                <div>
                  <div className="font-medium">{result.email}</div>
                  <p className="text-gray-500">
                    {result.breached 
                      ? result.breachDetails 
                      : "No breaches found"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}) 