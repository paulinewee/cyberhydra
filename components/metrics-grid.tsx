"use client"

import { memo } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface MetricsGridProps {
  metrics: Array<{
    metric: string
    value: number
  }>
}

export const MetricsGrid = memo(function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((item, index) => (
            <div 
              key={item.metric}
              className="p-4 rounded-lg border border-gray-200 bg-white/50"
            >
              <div className="text-sm text-gray-600">{item.metric}</div>
              <div className="text-2xl font-bold text-[#004DDD] mt-1">
                {item.value}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}) 