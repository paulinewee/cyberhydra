"use client"

import { memo } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

interface SecurityIncidentsChartProps {
  data: Array<{
    name: string
    threats: number
    vulnerabilities: number
  }>
}

export const SecurityIncidentsChart = memo(function SecurityIncidentsChart({ data }: SecurityIncidentsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Incidents by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="threats" fill="#8884d8" />
            <Bar dataKey="vulnerabilities" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
})

