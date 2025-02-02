"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export const ThreatResponseTimeline = () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-medium">Response Efficiency</CardTitle>
        <CardDescription className="text-sm text-gray-500">
      Threat detection and response time analysis
    </CardDescription>
  </CardHeader>
  <CardContent className="text-sm">
    {/* ... existing content ... */}
  </CardContent>
</Card> )
}
