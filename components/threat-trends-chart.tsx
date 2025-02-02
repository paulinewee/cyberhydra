"use client"

import { memo } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

interface ThreatTrendsChartProps {
  data: Array<{
    name: string
    threats: number
    vulnerabilities: number
  }>
}

export const ThreatTrendsChart = memo(function ThreatTrendsChart({ data }: ThreatTrendsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Threat Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="threats" stroke="#8884d8" />
            <Line type="monotone" dataKey="vulnerabilities" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
})

