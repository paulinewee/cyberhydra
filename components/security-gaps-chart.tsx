"use client"

import { memo } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface SecurityGapsChartProps {
  data: Array<{
    gap: string
    impact: number
  }>
}

export const SecurityGapsChart = memo(function SecurityGapsChart({ data }: SecurityGapsChartProps) {
  // Add colors to the data
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: index === 0 ? "#004DDD" : index === 1 ? "#5A91F8" : "#B3CDFD"
  }))

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-medium">Critical Security Deficiencies</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Identified deficiencies in your security posture
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={coloredData} layout="vertical">
            <XAxis type="number" domain={[0, 100]} fontSize={12} />
            <YAxis dataKey="gap" type="category" width={150} fontSize={12} />
            <Tooltip />
            <Bar 
              dataKey="impact" 
              fill="#004DDD"
              radius={[0, 4, 4, 0]}
              fillOpacity={1}
              shape={(props) => {
                const { fill, x, y, width, height } = props;
                return (
                  <rect 
                    x={x} 
                    y={y} 
                    width={width} 
                    height={height} 
                    fill={props.payload.fill}
                    radius={[0, 4, 4, 0]}
                  />
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}) 