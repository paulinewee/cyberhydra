"use client"

import { memo } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts"

interface RiskDistributionChartProps {
  data: Array<{
    name: string
    value: number
    description: string
  }>
}

export const RiskDistributionChart = memo(function RiskDistributionChart({ data }: RiskDistributionChartProps) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-medium">Industry-Specific Threats</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Analysis of key security risks in your industry
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="grid grid-cols-2 gap-4">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? "#004DDD" : index === 1 ? "#5A91F8" : "#B3CDFD"}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="space-y-3">
            {data.map((threat, index) => (
              <div key={threat.name} className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm flex items-center gap-2">
                    <div 
                      className="w-3 h-3" 
                      style={{ 
                        backgroundColor: index === 0 ? "#004DDD" : index === 1 ? "#5A91F8" : "#B3CDFD"
                      }} 
                    />
                    {threat.name}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{threat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

