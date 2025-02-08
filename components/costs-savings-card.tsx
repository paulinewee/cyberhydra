"use client"

import { BadgeCheck, TrendingDown } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from "recharts"
import CountUp from "react-countup"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const costSavingsData = [
  { month: 'Jan', savings: 45000 },
  { month: 'Feb', savings: 72000 },
  { month: 'Mar', savings: 98000 },
  { month: 'Apr', savings: 125000 },
]

const costSavingActions = [
  {
    action: "Send Phishing Test Email",
    savings: 25000,
    category: "Detect",
    description: "Regular phishing tests improve awareness and reduce risk",
    buttonText: "Send Test Email"
  },
  {
    action: "Schedule Password Training",
    savings: 50000,
    category: "Prevent",
    description: "Monthly password security training for all employees",
    buttonText: "Schedule Training"
  },
  {
    action: "Enable Auto-Response",
    savings: 35000,
    category: "Respond",
    description: "Automated incident response for common threats",
    buttonText: "Enable"
  },
  {
    action: "Security Assessment",
    savings: 45000,
    category: "Prevent",
    description: "Quarterly security posture assessment",
    buttonText: "Schedule Assessment"
  }
]

export function CostSavingsCard() {
  const [currentValue, setCurrentValue] = useState(125000)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue(prev => prev + 1)
    }, 1000)  // Increment by 1 every second

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 mb-6">
        <CardHeader className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-medium mb-2">Estimated Added Value</CardTitle>
              </div>
              <CardDescription>
                How much it would have cost your company in cybersecurity support and lost revenue
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">
                <CountUp
                  start={currentValue - 1}
                  end={currentValue}
                  duration={0.5}
                  separator=","
                  prefix="AED "
                  decimal="."
                  decimals={0}
                  useEasing={false}
                />
              </div>
              <p className="text-sm text-gray-600">
                Saved through minimizing incident response time
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-[200px] mt-6"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costSavingsData}>
                <defs>
                  <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `${value/1000}k`}
                />
                <Tooltip 
                  formatter={(value) => [`AED ${value.toLocaleString()}`, 'Savings']}
                />
                <Area 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#16a34a" 
                  fill="url(#savingsGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-2 gap-8 mt-6"
          >
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-800">Prevention Savings</p>
              <p className="text-2xl font-semibold text-green-600">AED 75,000</p>
              <p className="text-xs text-gray-600 mt-1">From prevented incidents</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-800">Response Savings</p>
              <p className="text-2xl font-semibold text-green-600">AED 50,000</p>
              <p className="text-xs text-gray-600 mt-1">From faster response times</p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
