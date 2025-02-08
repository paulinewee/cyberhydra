"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ShieldAlert,
  FileWarning,
  Siren,
  HardDrive
} from "lucide-react"

const responseActions = [
  {
    action: "System Lockdown",
    icon: ShieldAlert,
    description: "Initiate emergency system lockdown protocols",
    buttonText: "Lock Systems",
    options: {
      scope: ["All Systems", "Critical Only", "Custom Selection"],
      duration: ["1 Hour", "4 Hours", "8 Hours", "24 Hours"],
    }
  },
  {
    action: "Incident Investigation",
    icon: FileWarning,
    description: "Launch automated forensics collection",
    buttonText: "Start Investigation",
    options: {
      type: ["Full Analysis", "Quick Scan", "Custom"],
      priority: ["Critical", "High", "Medium", "Low"],
    }
  },
  {
    action: "Alert Response",
    icon: Siren,
    description: "Coordinate automated incident response",
    buttonText: "Initiate Response",
    options: {
      team: ["Security", "IT", "Management", "All"],
      channel: ["Email", "SMS", "Slack", "Teams"],
    }
  },
  {
    action: "System Recovery",
    icon: HardDrive,
    description: "Initiate system recovery procedures",
    buttonText: "Start Recovery",
    options: {
      mode: ["Full Restore", "Selective", "Verification Only"],
      priority: ["Critical", "High", "Medium", "Low"],
    }
  }
]

export function ResponseActionsCard() {
  return (
    <div className="space-y-6">
      {responseActions.map((action, index) => (
        <Card key={index} className="p-8">
          <div className="flex flex-col space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gray-50">
                    <action.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <h4 className="text-lg font-medium">{action.action}</h4>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-base text-gray-600">{action.description}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {Object.entries(action.options).map(([key, values]) => (
                    <Select key={key}>
                      <SelectTrigger className="w-full bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 focus:ring-gray-500">
                        <SelectValue placeholder={`Select ${key}`} />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        {values.map((value) => (
                          <SelectItem 
                            key={value} 
                            value={value.toLowerCase()}
                            className="hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-700"
                          >
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ))}
                </div>

                <Button 
                  className={`text-white text-md ${
                    action.action === "System Lockdown" 
                      ? "bg-[#CE203C] hover:bg-[#A41830]" 
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                  onClick={() => console.log(`Action clicked: ${action.action}`)}
                >
                  {action.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 