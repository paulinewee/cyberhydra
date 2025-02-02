"use client"

import { memo } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ActionsListProps {
  actions: Array<{
    action: string
    priority: 'high' | 'medium' | 'low'
  }>
}

export const ActionsList = memo(function ActionsList({ actions }: ActionsListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-[#CE203C] text-white'
      case 'medium':
        return 'bg-[#5A91F8] text-white'
      case 'low':
        return 'bg-[#B3CDFD] text-gray-900'
      default:
        return 'bg-gray-100'
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-medium">Recommended Actions</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Prioritized steps to improve your security
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((item, index) => (
            <div 
              key={index}
              className="flex items-start justify-between p-3 rounded-lg border border-gray-200 bg-white/50"
            >
              <div className="flex-1 mr-4 text-sm">{item.action}</div>
              <Badge className={`${getPriorityColor(item.priority)} text-xs`}>
                {item.priority}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}) 