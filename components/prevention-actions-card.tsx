"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Shield,
  Lock,
  BookOpen,
  ShieldCheck
} from "lucide-react"

const preventionActions = [
  {
    action: "Security Policies",
    icon: Shield,
    savings: 45000,
    description: "Update and enforce security policies and controls",
    buttonText: "Configure",
    options: {
      scope: ["All Policies", "Access Control", "Data Protection", "Network Security"],
      priority: ["Critical", "High", "Medium", "Low"],
    }
  },
  {
    action: "Access Management",
    icon: Lock,
    savings: 35000,
    description: "Review and update access permissions across systems",
    buttonText: "Review Access",
    options: {
      department: ["IT", "HR", "Finance", "Operations"],
      accessLevel: ["Admin", "Standard", "Limited", "Custom"],
    }
  },
  {
    action: "Security Training",
    icon: BookOpen,
    savings: 25000,
    description: "Schedule comprehensive security awareness training",
    buttonText: "Schedule",
    options: {
      course: ["Phishing", "Password Security", "Data Protection", "Compliance"],
      duration: ["30 mins", "1 hour", "2 hours", "Half Day"],
    }
  },
  {
    action: "System Hardening",
    icon: ShieldCheck,
    savings: 55000,
    description: "Strengthen system security configurations",
    buttonText: "Configure",
    options: {
      systems: ["Endpoints", "Servers", "Network", "Cloud"],
      level: ["Basic", "Advanced", "Enterprise", "Custom"],
    }
  }
]

export function PreventionActionsCard() {
  return (
    <div className="space-y-6">
      {preventionActions.map((action, index) => (
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

              <p className="text-base text-gray-600">{action.description}</p>
              
              <div className="grid grid-cols-2 gap-3 mt-3">
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="inline-flex bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
                  Save: AED {(action.savings / 12).toLocaleString()} monthly
                </div>
                <span className="text-sm text-gray-500">
                  through {
                    action.action === "Security Policies" ? "improved security governance" :
                    action.action === "Access Management" ? "reduced unauthorized access" :
                    action.action === "Security Training" ? "employee awareness" :
                    "enhanced system protection"
                  }
                </span>
              </div>

              <Button 
                className="bg-gray-900 text-white text-md hover:bg-gray-800"
                onClick={() => console.log(`Action clicked: ${action.action}`)}
              >
                {action.buttonText}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 