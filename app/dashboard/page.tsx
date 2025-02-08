"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { generateRandomData, generateRandomPieData } from "@/lib/utils"
import { Loader2, Shield, AlertTriangle, ArrowRight, Activity, Lock, Mail, BarChart3, Rocket, GraduationCap, Target, BookOpen, AlertCircle, BadgeCheck, TrendingDown } from "lucide-react"
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import { ThreatTrendsChart } from "@/components/threat-trends-chart"
import { SecurityIncidentsChart } from "@/components/security-incidents-chart"
import { RiskDistributionChart } from "@/components/risk-distribution-chart"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import { useOnboardingAnalysis } from '@/hooks/useOnboardingAnalysis'
import { SecurityGapsChart } from '@/components/security-gaps-chart'
import { MetricsGrid } from '@/components/metrics-grid'
import { ActionsList } from '@/components/actions-list'
import { EmailBreachCheck } from '@/components/email-breach-check'
import CountUp from 'react-countup'
import { CostSavingsCard } from "@/components/costs-savings-card"
import { ActionableSavingsCard } from "@/components/actionable-savings-card"
import { PreventionActionsCard } from "@/components/prevention-actions-card"
import { ResponseActionsCard } from "@/components/response-actions-card"
import { motion } from "framer-motion"
import { Header } from "@radix-ui/react-accordion"

export default function DashboardPage() {
  const [companyName, setCompanyName] = useState('Company Name')
  const [companyDescription, setCompanyDescription] = useState('Monitor and manage your cybersecurity protection')
  const [onboardingData, setOnboardingData] = useState<any>(null)

  const analysis = useOnboardingAnalysis()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('onboardingData') || '{}')
    console.log('Onboarding Data:', data)
    
    setCompanyName(data?.company?.name || 'My Startup')
    setCompanyDescription(data?.company?.description || 'Monitor and manage your cybersecurity protection')
    setOnboardingData(data)
  }, [])

  // Simulated company data (in real app, fetch from API/storage)
  const [employees] = useState([
    { name: "John Doe", email: "john@company.com" },
    { name: "Jane Smith", email: "jane@company.com" },
    // Add more synthetic employee data
  ])

  // Generate synthetic data for charts
  const securityTrainingData = [
    { month: 'Jan', completion: 65 },
    { month: 'Feb', completion: 75 },
    { month: 'Mar', completion: 85 },
    { month: 'Apr', completion: 90 },
  ]

  const vulnerabilityTrendData = [
    { date: '2024-01', critical: 5, high: 12, medium: 20 },
    { date: '2024-02', critical: 3, high: 10, medium: 18 },
    { date: '2024-03', critical: 4, high: 8, medium: 15 },
  ]

  const incidentResponseData = [
    { type: 'Malware', count: 15 },
    { type: 'Phishing', count: 25 },
    { type: 'Data Breach', count: 8 },
    { type: 'DDoS', count: 5 },
  ]

  // Additional synthetic data
  const securityScoreData = [
    { name: 'Password', score: 85 },
    { name: 'MFA', score: 95 },
    { name: 'Updates', score: 78 },
    { name: 'Training', score: 88 },
  ]

  const recentIncidents = [
    { date: '2024-03', internal: 5, external: 8 },
    { date: '2024-02', internal: 3, external: 6 },
    { date: '2024-01', internal: 4, external: 7 },
  ]

  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [showPreview, setShowPreview] = useState(false)

  const phishingTemplates = {
    password: {
      subject: "Urgent: Password Reset Required",
      body: `
Dear [Employee Name],

Our security system has detected unusual activity on your account. To ensure your account's security, please reset your password immediately by clicking the link below:

[Reset Password Button]

If you did not request this change, please contact IT support immediately.

Best regards,
IT Security Team
      `,
    },
    invoice: {
      subject: "Invoice #INV-2024-03-21 Requires Immediate Action",
      body: `
Dear [Employee Name],

Please find attached the invoice #INV-2024-03-21 for recent services. This invoice requires your immediate review and approval.

[View Invoice Button]

The invoice will expire in 24 hours. Please process this as soon as possible.

Best regards,
Accounts Department
      `,
    },
    urgent: {
      subject: "Urgent: Action Required - Executive Request",
      body: `
Dear [Employee Name],

I hope this email finds you well. I need your urgent assistance with a confidential matter. Please review and process the following request as soon as possible.

[Review Request Button]

This is time-sensitive and requires your immediate attention.

Best regards,
[Executive Name]
CEO Office
      `,
    },
  }

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value)
    setShowPreview(true)
  }

  // Add this data near your other const declarations
  const costSavingsData = [
    { month: 'Jan', savings: 45000 },
    { month: 'Feb', savings: 72000 },
    { month: 'Mar', savings: 98000 },
    { month: 'Apr', savings: 125000 },
  ];

  const companyRiskData = [
    {
      subject: 'Data Breach',
      A: 85,
      fullMark: 100,
    },
    {
      subject: 'AI Threats',
      A: 92,
      fullMark: 100,
    },
    {
      subject: 'Phishing',
      A: 78,
      fullMark: 100,
    },
    {
      subject: 'Compliance',
      A: 82,
      fullMark: 100,
    },
    {
      subject: 'Infrastructure',
      A: 75,
      fullMark: 100,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Full width, no top margin */}
      <header className="w-full p-4 bg-white border-b border-gray-200">
        <div className="container mx-auto px-12 py-12 text-center">
          <Image
            src="/cyberhydra-logo.png"
            alt="CyberHydra Logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 m-4 mt-6">
            {companyName}'s Security Dashboard
          </h1>
          <p className="text-gray-600">
            {companyDescription}
          </p>
        </div>
      </header>

      {/* Company Profile Card */}
      <div className="container mx-auto px-6 -mt-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 bg-white/50 backdrop-blur-sm border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Company Risk Profile</h3>
                  <p className="text-gray-600 text-sm">
                    Based on our AI-powered analysis of your company's profile, security posture, and potential risks, referencing various data sources, signals, and web research, we have found that your startup is most vulnerable to the following risks.
                  </p>
                </div>
                
                {/* Revenue at Risk Section */}
                <div className="p-6 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-red-900">Revenue at Risk</h4>
                      <p className="text-sm text-red-700">Potential financial impact of security incidents</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                      <TrendingDown className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-3xl font-bold text-red-700">
                        <CountUp
                          start={0}
                          end={275000}
                          duration={2}
                          separator=","
                          prefix="AED "
                        />
                      </div>
                      <p className="text-sm text-red-600">Estimated annual revenue at risk</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-2 bg-red-100 rounded">
                        <div className="font-semibold text-red-900">32%</div>
                        <div className="text-red-700">From AI threats</div>
                      </div>
                      <div className="p-2 bg-red-100 rounded">
                        <div className="font-semibold text-red-900">24%</div>
                        <div className="text-red-700">From data breaches</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700 mb-1">87%</div>
                    <div className="text-sm text-gray-600">Risk Score</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700 mb-1">92%</div>
                    <div className="text-sm text-gray-600">AI Defense</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Key Risk Factors</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      High exposure to AI-powered attacks
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                      Moderate phishing vulnerability
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Strong compliance adherence
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={companyRiskData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#4b5563', fontSize: 12 }}
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Risk Level"
                        dataKey="A"
                        stroke="#015AFF"
                        fill="#015AFF"
                        fillOpacity={0.3}
                      />
                      <motion.circle
                        cx="50%"
                        cy="50%"
                        r="8"
                        fill="#015AFF"
                        animate={{
                          opacity: [1, 0.5, 1],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Content Wrapper */}
      <div className="container mx-auto px-6 py-8">

      <h1 className="text-3xl text-center font-semibold mb-10">Insights and Recommendations</h1>

        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="detect" className="w-full">
            <TabsList className="w-full h-16 grid grid-cols-3 gap-6 bg-white p-2 rounded-lg border border-gray-200">
              <TabsTrigger 
                value="detect"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#015AFF] py-4 px-8 transition-all hover:text-[#015AFF] h-full"
              >
                Detect Threats
              </TabsTrigger>
              <TabsTrigger 
                value="prevent"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#015AFF] py-4 px-8 transition-all hover:text-[#015AFF] h-full"
              >
                Prevent Vulnerabilities
              </TabsTrigger>
              <TabsTrigger 
                value="respond"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#015AFF] py-4 px-8 transition-all hover:text-[#015AFF] h-full"
              >
                Respond to Incidents
              </TabsTrigger>
            </TabsList>

            {/* Add spacing between tabs and content */}
            <div className="mt-0">
              <TabsContent value="detect">
                <div className="space-y-6">
                  {/* AI-Generated Insights Section */}
                  <div>
                    <div className="flex items-center gap-6 mt-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Threat Detection Insights</h2>
                        <p className="text-gray-600 text-sm">
                          AI-powered analysis of potential threats to your company
                        </p>
                      </div>
                    </div>
                    {analysis ? (
                      <div className="space-y-6">
                        {/* <Card className="p-6"> */}
                          {/* <CardContent className=""> */}
                            {/* <div className="mb-4">
                              <h3 className="text-lg font-medium">Industry Risk Distribution</h3>
                              <p className="text-sm text-gray-600">Analysis of threats specific to your industry</p>
                            </div> */}
                          <RiskDistributionChart 
                            data={analysis.industrySpecificThreats}
                          />
                          {/* </CardContent> */}
                        {/* </Card> */}
                        
                        {/* <Card className="p-6">
                          <CardHeader className="px-4">
                            <CardTitle className="text-lg font-medium">Security Gap Analysis</CardTitle>
                            <CardDescription className="text-sm">Current security posture assessment</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4"> */}
                            <SecurityGapsChart 
                              data={analysis.securityGaps}
                            />
                          {/* </CardContent> */}
                        {/* </Card> */}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center p-8 bg-white rounded-lg border border-gray-200">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Analyzing threat landscape...</span>
                      </div>
                    )}
                  </div>

                  {/* Standard Metrics Section */}
                  <div className="pt-6"></div>
                  <div className="h-px bg-gray-200" />
                  <div className="pt-6">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Threat Metrics</h2>
                        <p className="text-gray-600 text-sm">
                          Current threat landscape and vulnerability trends
                        </p>
                      </div>
                    </div>
                    <div className="space-y-8">
                      {/* Two columns layout */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Vulnerability Trends */}
                        <Card className="p-6">
                          <CardHeader className="px-4">
                            <CardTitle className="text-lg font-medium">Vulnerability Trends</CardTitle>
                            <CardDescription>Critical and high-risk vulnerabilities</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={vulnerabilityTrendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="critical" fill="#ff4d4f" />
                                <Bar dataKey="high" fill="#ffa39e" />
                              </BarChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>

                        {/* Recent Incidents */}
                        <Card className="p-6">
                          <CardHeader className="px-4">
                            <CardTitle className="text-lg font-medium">Recent Incidents</CardTitle>
                            <CardDescription>Internal vs External threats</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={recentIncidents}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="internal" stroke="#8884d8" />
                                <Line type="monotone" dataKey="external" stroke="#82ca9d" />
                              </LineChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="pt-6"></div>
                  <div className="h-px bg-gray-200" />
                  <div className="pt-5">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Agentic Detection</h2>
                        <p className="text-gray-600 text-sm">
                        Schedule tasks, abilities, and triggers to automate your security operations
                        </p>
                      </div>
                    </div>
                    <ActionableSavingsCard />

                  </div>
                </div>
              </TabsContent>

              <TabsContent value="threats">
                <div className="space-y-16">
                  {/* Insights Section */}
                  <div>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Insights</h2>
                        <p className="text-gray-600 text-sm">
                          Current threat landscape and vulnerability analysis
                        </p>
                      </div>
                    </div>
                    {/* Two columns layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Vulnerability Trends */}
                      <Card className="p-4">
                        <CardHeader className="px-4">
                          <CardTitle className="text-xl">Vulnerability Trends</CardTitle>
                          <CardDescription>Critical and high-risk vulnerabilities</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={vulnerabilityTrendData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="critical" fill="#ff4d4f" />
                              <Bar dataKey="high" fill="#ffa39e" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      {/* Recent Incidents */}
                      <Card className="p-4">
                        <CardHeader className="px-4">
                          <CardTitle className="text-xl">Recent Incidents</CardTitle>
                          <CardDescription>Internal vs External threats</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={recentIncidents}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="internal" stroke="#8884d8" />
                              <Line type="monotone" dataKey="external" stroke="#82ca9d" />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="h-px bg-gray-200" />

                    {/* Full-width table */}
                    <Card className="p-4">
                      <CardHeader className="px-4">
                        <CardTitle>Security Alerts</CardTitle>
                        <CardDescription>Recent security events requiring attention</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Time</TableHead>
                              <TableHead>Event</TableHead>
                              <TableHead>Source</TableHead>
                              <TableHead>Severity</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>2024-03-20 10:30</TableCell>
                                <TableCell>Suspicious Login</TableCell>
                                <TableCell>192.168.1.100</TableCell>
                                <TableCell className="text-red-500">High</TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm">Investigate</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2024-03-20 09:15</TableCell>
                                <TableCell>Failed Password Attempts</TableCell>
                                <TableCell>user@company.com</TableCell>
                                <TableCell className="text-yellow-500">Medium</TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm">Review</Button>
                                </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="h-px bg-gray-200" />

                  {/* Metrics Section */}
                  <div className="pt-4">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <LineChart className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Metrics</h2>
                        <p className="text-gray-600 text-sm">
                          Threat detection and response performance
                        </p>
                      </div>
                    </div>
                    <div className="space-y-8">
                      {/* Full-width primary metric */}
                      <Card className="p-4">
                        <CardHeader className="px-4 space-y-1">
                          <CardTitle className="text-lg font-medium">Incident Response Metrics</CardTitle>
                          <CardDescription className="text-sm">
                            Types and frequency of security incidents
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={incidentResponseData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="type" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      {/* Response Time Analysis */}
                      <Card className="p-4">
                        <CardHeader className="px-4">
                          <CardTitle>Incident Response Time</CardTitle>
                          <CardDescription>Average time to detect and respond to incidents</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={generateRandomData(12)}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="threats" name="Time to Identify (mean)" stroke="#8884d8" />
                              <Line type="monotone" dataKey="vulnerabilities" name="Time to Contain (mean)" stroke="#82ca9d" />
                            </LineChart>
                          </ResponsiveContainer>
                          <div className="mt-4 text-center text-gray-600">
                            Estimated Cost Savings: Minimizing time to respond has saved you{' '}
                            <span className="text-[#004DDD] font-bold text-xl">75,000 AED</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Cost Savings Section */}
                      <Card className="p-12 bg-gradient-to-br from-green-50 to-white border-green-100">
                        <CardHeader className="px-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-lg font-medium text-green-800">Cost Savings Impact</CardTitle>
                                <BadgeCheck className="h-5 w-5 text-green-600" />
                              </div>
                              <CardDescription className="text-sm text-green-700">
                                CyberHydra saves you thousands in cybersecurity support and lost revenue
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <div className="text-3xl font-bold text-green-800">
                                <CountUp
                                  start={0}
                                  end={125000}
                                  duration={2.5}
                                  separator=","
                                  prefix="AED "
                                  decimal="."
                                  decimals={0}
                                />
                              </div>
                              <p className="text-sm text-green-700">
                                Saved through minimizing incident response time
                              </p>
                            </div>
                            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                              <TrendingDown className="h-8 w-8 text-green-600" />
                            </div>
                          </div>
                          
                          {/* Cost Savings Graph */}
                          <div className="h-[200px] mt-6">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={[
                                { month: 'Jan', savings: 45000 },
                                { month: 'Feb', savings: 72000 },
                                { month: 'Mar', savings: 98000 },
                                { month: 'Apr', savings: 125000 },
                              ]}>
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
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200" />

                  {/* Actions Section */}
                  <div className="pt-4">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Actions</h2>
                        <p className="text-gray-600 text-sm">
                          Response actions for identified threats
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="p-4">
                        <CardHeader className="px-4 space-y-1">
                          <CardTitle className="text-lg font-medium">Run Vulnerability Scan</CardTitle>
                          <CardDescription className="text-sm">
                            Scan your systems for known vulnerabilities
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#004DDD] text-white hover:bg-[#0037A1]">
                            Start Scan
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="p-4">
                        <CardHeader className="px-4 space-y-1">
                          <CardTitle className="text-lg font-medium">Incident Response</CardTitle>
                          <CardDescription className="text-sm">
                            Generate an incident response playbook
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#004DDD] text-white hover:bg-[#0037A1]">
                            Create Playbook
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="p-4">
                        <CardHeader className="px-4 space-y-1">
                          <CardTitle className="text-lg font-medium">Threat Intelligence</CardTitle>
                          <CardDescription className="text-sm">
                            Get industry-specific threat updates
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#004DDD] text-white hover:bg-[#0037A1]">
                            View Updates
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="training">
                <div className="space-y-16">
                  {/* Training Insights Section */}
                  <div>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Insights</h2>
                        <p className="text-gray-600 text-sm">
                          Training completion and effectiveness analysis
                        </p>
                      </div>
                    </div>
                    {/* Incident Response Metrics */}
                    <Card className="p-4">
                      <CardHeader className="px-4">
                        <CardTitle>Incident Response Metrics</CardTitle>
                        <CardDescription>Types and frequency of security incidents</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={incidentResponseData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* Response Time Analysis */}
                    <Card className="p-4">
                      <CardHeader className="px-4">
                        <CardTitle>Incident Response Time</CardTitle>
                        <CardDescription>Average time to detect and respond to incidents</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={generateRandomData(12)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="threats" name="Time to Identify (mean)" stroke="#8884d8" />
                            <Line type="monotone" dataKey="vulnerabilities" name="Time to Contain (mean)" stroke="#82ca9d" />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="h-px bg-gray-200" />

                  {/* Training Metrics Section */}
                  <div className="pt-4">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <Target className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Metrics</h2>
                        <p className="text-gray-600 text-sm">
                          Training performance and engagement statistics
                        </p>
                      </div>
                    </div>
                    {/* Active Incidents */}
                    <Card className="p-4">
                      <CardHeader className="px-4">
                        <CardTitle>Active Incidents</CardTitle>
                        <CardDescription>Currently active security incidents requiring attention</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Priority</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>INC-001</TableCell>
                              <TableCell>Ransomware</TableCell>
                              <TableCell>In Progress</TableCell>
                              <TableCell className="text-red-500">Critical</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  Contain
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>INC-002</TableCell>
                              <TableCell>Data Leak</TableCell>
                              <TableCell>Investigation</TableCell>
                              <TableCell className="text-yellow-500">High</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  Review
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="h-px bg-gray-200" />

                  {/* Training Actions Section */}
                  <div className="pt-4">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Actions</h2>
                        <p className="text-gray-600 text-sm">
                          Security training and awareness initiatives
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-4">
                        <CardHeader className="px-4 space-y-1">
                          <CardTitle className="text-lg font-medium">Schedule Training</CardTitle>
                          <CardDescription className="text-sm">
                            Set up security awareness sessions
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Select>
                              <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Select training type" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="basics">Security Basics</SelectItem>
                                <SelectItem value="phishing">Phishing Prevention</SelectItem>
                                <SelectItem value="compliance">Compliance Training</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button className="w-full bg-[#004DDD] text-white hover:bg-[#0037A1]">
                              Schedule Session
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="p-4">
                        <CardHeader className="px-4 space-y-1">
                          <CardTitle className="text-lg font-medium">Training Materials</CardTitle>
                          <CardDescription className="text-sm">
                            Access and customize training resources
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                              <Button variant="outline" className="w-full">Preview</Button>
                              <Button variant="outline" className="w-full">Download</Button>
                            </div>
                            <Button className="w-full bg-[#004DDD] text-white hover:bg-[#0037A1]">
                              Customize Content
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="prevent">
                <div className="space-y-6">
                  {/* AI-Generated Insights Section */}
                  <div>
                    <div className="flex items-center gap-6 mt-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Prevention Insights</h2>
                        <p className="text-gray-600 text-sm">
                          AI-powered analysis of your security vulnerabilities
                        </p>
                      </div>
                    </div>
                    {analysis ? (
                      <div className="space-y-6">
                        <EmailBreachCheck 
                          emails={onboardingData && onboardingData.contacts ? [
                            onboardingData.contacts.primary.email,
                            ...onboardingData.contacts.additional.map((c: any) => c.email)
                          ] : []}
                          breachResults={analysis.emailBreachResults}
                        />
                        <Card className="p-6">
                          <CardHeader className="px-4 space-y-1">
                            <CardTitle className="text-lg font-medium">Password Policy</CardTitle>
                            <CardDescription className="text-sm">
                              Password compliance status
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={[
                                    { name: 'Compliant', value: 75 },
                                    { name: 'Non-compliant', value: 25 },
                                  ]}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  fill="#B3CDFD"
                                >
                                  <Cell fill="#004DDD" />
                                  <Cell fill="#CE203C" />
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center p-8 bg-white rounded-lg border border-gray-200">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Analyzing vulnerabilities...</span>
                      </div>
                    )}
                  </div>

                  {/* Standard Metrics Section */}
                  <div className="pt-4"></div>
                  <div className="h-px bg-gray-200" />
                  <div className="pt-4">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <Lock className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Security Metrics</h2>
                        <p className="text-gray-600 text-sm">
                          Current security status and alerts
                        </p>
                      </div>
                    </div>
                    
                    {/* Security Alerts Table */}
                    <Card className="p-6">
                      <CardHeader className="px-4">
                      <CardTitle className="text-lg font-medium">Security Alerts</CardTitle>
                      <CardDescription>Recent security events requiring attention</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Time</TableHead>
                              <TableHead>Event</TableHead>
                              <TableHead>Source</TableHead>
                              <TableHead>Severity</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>2024-03-20 10:30</TableCell>
                              <TableCell>Suspicious Login</TableCell>
                              <TableCell>192.168.1.100</TableCell>
                              <TableCell className="text-red-500">High</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">Investigate</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2024-03-20 09:15</TableCell>
                              <TableCell>Failed Password Attempts</TableCell>
                              <TableCell>user@company.com</TableCell>
                              <TableCell className="text-yellow-500">Medium</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">Review</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    {/* Phishing Tests Configuration */}
                    <Card className="p-6 mt-6">
                      <CardHeader className="px-4 space-y-1">
                        <CardTitle className="text-lg font-medium">Phishing Tests</CardTitle>
                        <CardDescription className="text-sm">
                          Automated phishing simulation results
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select>
                              <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>

                            <Select onValueChange={handleTemplateChange}>
                              <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Select template" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="password">Password Reset</SelectItem>
                                <SelectItem value="invoice">Invoice Review</SelectItem>
                                <SelectItem value="urgent">Executive Request</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {showPreview && selectedTemplate && (
                            <div className="mt-4 p-4 border rounded-lg bg-white">
                              <h4 className="font-medium mb-2">Template Preview</h4>
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Subject:</p>
                                <p className="text-sm text-gray-600">{phishingTemplates[selectedTemplate].subject}</p>
                                <p className="text-sm font-medium mt-4">Body:</p>
                                <p className="text-sm text-gray-600 whitespace-pre-line">
                                  {phishingTemplates[selectedTemplate].body}
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="flex justify-end">
                            <Button className="bg-[#004DDD] text-white hover:bg-[#0037A1]">
                              Schedule Test
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Actions Section */}
                  <div className="pt-4"></div>
                  <div className="h-px bg-gray-200" />
                  <div className="pt-4">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Prevention Actions</h2>
                        <p className="text-gray-600 text-sm">
                          Tools to strengthen your security posture
                        </p>
                      </div>
                    </div>
                    <PreventionActionsCard />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="respond">
                <div className="space-y-6">
                  {/* AI-Generated Insights Section */}
                  <div>
                    <div className="flex items-center gap-6 mt-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Response Insights</h2>
                        <p className="text-gray-600 text-sm">
                          AI-powered incident response analysis and recommendations
                        </p>
                      </div>
                    </div>
                    {analysis ? (
                      <div className="space-y-6">
                        {/* First row of charts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Response Type Distribution */}
                          <Card className="p-6">
                            <CardHeader className="px-4">
                              <CardTitle className="text-lg font-medium">Response Type Distribution</CardTitle>
                              <CardDescription>Distribution of incident response types</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 h-[300px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={[
                                      { name: 'Automated', value: 45 },
                                      { name: 'Manual', value: 35 },
                                      { name: 'Hybrid', value: 20 },
                                    ]}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                  >
                                    <Cell fill="#004DDD" />
                                    <Cell fill="#5A91F8" />
                                    <Cell fill="#B3CDFD" />
                                  </Pie>
                                  <Tooltip />
                                  <Legend />
                                </PieChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>

                          {/* Response Success Rate */}
                          <Card className="p-6">
                            <CardHeader className="px-4">
                              <CardTitle className="text-lg font-medium">Response Success Rate</CardTitle>
                              <CardDescription>Monthly success rate of incident responses</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 h-[300px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={generateRandomData(6)}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Area 
                                    type="monotone" 
                                    dataKey="threats" 
                                    name="Success Rate" 
                                    stroke="#004DDD" 
                                    fill="#B3CDFD" 
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Incident Response Metrics */}
                        <Card className="p-6">
                          <CardHeader className="px-4">
                          <CardTitle className="text-lg font-medium">Incident Response Time</CardTitle>
                          <CardDescription>Average time to detect and respond to incidents</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={generateRandomData(12)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="threats" name="Time to Identify (mean)" stroke="#8884d8" />
                                <Line type="monotone" dataKey="vulnerabilities" name="Time to Contain (mean)" stroke="#82ca9d" />
                              </LineChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center p-8 bg-white rounded-lg border border-gray-200">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Analyzing response patterns...</span>
                      </div>
                    )}
                  </div>

                  {/* Standard Metrics Section */}
                  <div className="pt-4"></div>
                  <div className="h-px bg-gray-200" />
                  <div className="pt-4">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        
                        <h2 className="text-2xl font-semibold mb-2">Active Incidents</h2>
                        <p className="text-gray-600 text-sm">
                          Currently active security incidents requiring attention
                        </p>
                      </div>
                    </div>
                    
                    {/* Grid container for the two charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Incident Priority Distribution */}
                      <Card className="p-6">
                        <CardHeader className="px-4">
                          <CardTitle className="text-lg font-medium">Incident Priority Distribution</CardTitle>
                          <CardDescription>Current distribution of incident priorities</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                              { priority: 'Critical', count: 3 },
                              { priority: 'High', count: 5 },
                              { priority: 'Medium', count: 8 },
                              { priority: 'Low', count: 12 },
                            ]}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="priority" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="count" fill="#004DDD">
                                <Cell fill="#CE203C" />
                                <Cell fill="#FF6B6B" />
                                <Cell fill="#5A91F8" />
                                <Cell fill="#B3CDFD" />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      {/* Resolution Time Trends */}
                      <Card className="p-6">
                        <CardHeader className="px-4">
                          <CardTitle className="text-lg font-medium">Resolution Time Trends</CardTitle>
                          <CardDescription>Average resolution time by incident type</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={generateRandomData(6)}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line 
                                type="monotone" 
                                dataKey="threats" 
                                name="Critical Incidents" 
                                stroke="#CE203C" 
                              />
                              <Line 
                                type="monotone" 
                                dataKey="vulnerabilities" 
                                name="High Priority" 
                                stroke="#5A91F8" 
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Active Incidents Table */}
                    <Card className="p-6 mt-6">
                      <CardHeader className="px-4">
                        <CardTitle className="text-lg font-medium">Active Incidents</CardTitle>
                        <CardDescription className="text-sm">Currently active security incidents requiring immediate response</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Priority</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>INC-001</TableCell>
                              <TableCell>Ransomware</TableCell>
                              <TableCell>In Progress</TableCell>
                              <TableCell className="text-red-500">Critical</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  Contain
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>INC-002</TableCell>
                              <TableCell>Data Leak</TableCell>
                              <TableCell>Investigation</TableCell>
                              <TableCell className="text-yellow-500">High</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  Review
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Actions Section */}
                  <div className="pt-4"></div>
                  <div className="h-px bg-gray-200" />
                  <div className="pt-4">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Response Actions</h2>
                        <p className="text-gray-600 text-sm">
                          Immediate actions for incident response and recovery
                        </p>
                      </div>
                    </div>
                    <ResponseActionsCard />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>



      {/* Cost Savings Section */}
      <div className="w-full bg-white py-20 mt-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-6">
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Cost Savings Impact</h2>
                <p className="text-gray-600 text-sm">
                  CyberHydra saves you thousands in cybersecurity support and lost revenue
                </p>
              </div>
            </div>
            <CostSavingsCard />
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">About CyberHydra</h3>
              <p className="text-sm text-gray-600">
                Empowering businesses with advanced cybersecurity solutions and real-time threat monitoring.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-[#004DDD] hover:text-[#5A91F8]">Documentation</a></li>
                <li><a href="#" className="text-[#004DDD] hover:text-[#5A91F8]">Support</a></li>
                <li><a href="#" className="text-[#004DDD] hover:text-[#5A91F8]">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>support@cyberhydra.com</li>
                <li>1-800-CYBER-HYDRA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} CyberHydra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

