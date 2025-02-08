"use client"

import { memo } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"

interface MetricsGridProps {
  metrics: Array<{
    metric: string
    value: number
  }>
}

export const MetricsGrid = memo(function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-medium">Security Metrics</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Key performance indicators for your security program
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((item, index) => (
            <div 
              key={item.metric}
              className="p-3 rounded-lg border border-gray-200 bg-white/50"
            >
              <div className="text-sm text-gray-600">{item.metric}</div>
              <div className="text-xl font-bold text-[#004DDD] mt-1">
                {item.value}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}) 