"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Scan, 
  FileCheck, 
  Bell, 
  Brain, 
  ShieldCheck, 
  Lock, 
  Siren, 
  HardDrive,
  Shield,
  FileSearch,
  AlertCircle,
  Network
} from "lucide-react"

const detectionActions = [
  {
    action: "Network Scan",
    icon: Network,
    savings: 25000,
    description: "Deep scan of your network for vulnerabilities",
    buttonText: "Start Scan",
    options: {
      scope: ["Full Network", "Critical Systems", "External Only"],
      depth: ["Quick Scan", "Standard Scan", "Deep Scan"],
    }
  },
  {
    action: "Security Compliance",
    icon: FileCheck,
    savings: 50000,
    description: "Discover emerging regulatory requirements",
    buttonText: "View Report",
    options: {
      framework: ["GDPR", "HIPAA", "ISO27001", "PCI DSS"],
      reportType: ["Summary", "Detailed", "Technical"],
    }
  },
  {
    action: "Configure Alerts",
    icon: AlertCircle,
    savings: 35000,
    description: "Set up custom threat detection alerts",
    buttonText: "Configure",
    options: {
      severity: ["High", "Medium", "Low"],
      frequency: ["Real-time", "Hourly", "Daily"],
    }
  },
  {
    action: "Threat Intelligence",
    icon: Brain,
    savings: 45000,
    description: "AI-powered threat intelligence analysis",
    buttonText: "Analyze",
    options: {
      source: ["Internal", "External", "Both"],
      focus: ["Malware", "Phishing", "Network"],
    }
  }
]

export function ActionableSavingsCard() {
  return (
    <div className="space-y-6">
      {detectionActions.map((action, index) => (
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
                    action.action === "Network Scan" ? "early threat detection" :
                    action.action === "Security Compliance" ? "reduced compliance penalties" :
                    action.action === "Configure Alerts" ? "faster incident response" :
                    "AI-powered prevention"
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