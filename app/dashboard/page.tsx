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
  Cell
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

export default function DashboardPage() {
  const [companyName, setCompanyName] = useState('Company Name')
  const [companyDescription, setCompanyDescription] = useState('Monitor and manage your cybersecurity protection')
  const [onboardingData, setOnboardingData] = useState<any>(null)

  const analysis = useOnboardingAnalysis()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('onboardingData') || '{}')
    console.log('Onboarding Data:', data)
    
    setCompanyName(data?.company?.name || 'Company Name')
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Full width, no top margin */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-12 text-center">
          <Image
            src="/cyberhydra-logo.png"
            alt="CyberHydra Logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {companyName}'s Security Dashboard
          </h1>
          <p className="text-gray-600">
            {companyDescription}
          </p>
        </div>
      </header>

      {/* Content Wrapper */}
      <div className="container mx-auto px-6 py-8">
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
            <div className="mt-12">
              <TabsContent value="detect">
                <div className="space-y-24">
                  {/* AI-Generated Insights Section */}
                  <div>
                    <div className="flex items-center gap-6 mt-12 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Threat Detection Insights</h2>
                        <p className="text-gray-600 text-sm">
                          AI-powered analysis of potential threats to your startup
                        </p>
                      </div>
                    </div>
                    {analysis ? (
                      <div className="space-y-6">
                        <Card className="p-6">
                          <CardHeader className="px-4">
                            <CardTitle className="text-lg font-medium">Industry Risk Distribution</CardTitle>
                            <CardDescription className="text-sm">Analysis of threats specific to your industry</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4">
                            <RiskDistributionChart 
                              data={analysis.industrySpecificThreats}
                            />
                          </CardContent>
                        </Card>
                        
                        <Card className="p-6">
                          <CardHeader className="px-4">
                            <CardTitle className="text-lg font-medium">Security Gap Analysis</CardTitle>
                            <CardDescription className="text-sm">Current security posture assessment</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4">
                            <SecurityGapsChart 
                              data={analysis.securityGaps}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center p-8 bg-white rounded-lg border border-gray-200">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Analyzing threat landscape...</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="my-8">
                      <div className="h-px bg-gray-200" />
                    </div>
                  </div>

                  {/* Standard Metrics Section */}
                  <div className="pt-8">
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
                      {/* Vulnerability Trends */}
                      <Card className="p-6">
                        <CardHeader className="px-4">
                          <CardTitle className="text-lg font-medium">Vulnerability Trends</CardTitle>
                          <CardDescription className="text-sm">Critical and high-risk vulnerabilities</CardDescription>
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
                          <CardDescription className="text-sm">Internal vs External threats</CardDescription>
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

                  <div>
                    <div className="my-8">
                      <div className="h-px bg-gray-200" />
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="pt-8">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-[#004DDD]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Detection Actions</h2>
                        <p className="text-gray-600 text-sm">
                          Tools and actions to improve threat detection
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="p-6">
                        <CardHeader className="px-4">
                          <CardTitle className="text-lg font-medium">Scan Network</CardTitle>
                          <CardDescription className="text-sm">
                            Run a deep scan of your network
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#004DDD] text-white hover:bg-[#0037A1]">
                            Start Scan
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="p-6">
                        <CardHeader className="px-4">
                          <CardTitle className="text-lg font-medium">Threat Intelligence</CardTitle>
                          <CardDescription className="text-sm">
                            Get latest threat intelligence for your industry
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#004DDD] text-white hover:bg-[#0037A1]">
                            View Report
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="p-6">
                        <CardHeader className="px-4">
                          <CardTitle className="text-lg font-medium">Configure Alerts</CardTitle>
                          <CardDescription className="text-sm">
                            Set up custom threat detection alerts
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#004DDD] text-white hover:bg-[#0037A1]">
                            Configure
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
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
                          <CardTitle>Response Time Analysis</CardTitle>
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
                              <Line type="monotone" dataKey="threats" name="Detection Time" stroke="#8884d8" />
                              <Line type="monotone" dataKey="vulnerabilities" name="Response Time" stroke="#82ca9d" />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      {/* After Response Time Analysis chart */}
                      <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-100">
                        <CardHeader className="px-4">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg font-medium text-green-800">Estimated Cost Savings</CardTitle>
                            <BadgeCheck className="h-5 w-5 text-green-600" />
                          </div>
                          <CardDescription className="text-sm text-green-700">
                            Impact of improved incident response time
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-2xl font-semibold text-green-800">125,000 AED</p>
                              <p className="text-sm text-green-700">
                                Saved through minimizing time to respond
                              </p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                              <TrendingDown className="h-6 w-6 text-green-600" />
                            </div>
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
                        <CardTitle>Response Time Analysis</CardTitle>
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
                            <Line type="monotone" dataKey="threats" name="Detection Time" stroke="#8884d8" />
                            <Line type="monotone" dataKey="vulnerabilities" name="Response Time" stroke="#82ca9d" />
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
                                <Button variant="destructive" size="sm">
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
                <div className="space-y-24">
                  {/* AI-Generated Insights Section */}
                  <div>
                    <div className="flex items-center gap-6 mt-12 mb-6">
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
                          emails={onboardingData ? [
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

                  <div>
                    <div className="my-8">
                      <div className="h-px bg-gray-200" />
                    </div>
                  </div>

                  {/* Standard Metrics Section */}
                  <div className="pt-8">
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

                  <div>
                    <div className="my-8">
                      <div className="h-px bg-gray-200" />
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="pt-8">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="p-6">
                        <CardHeader className="px-4 space-y-1">
                          <CardTitle className="text-lg font-medium">Security Policies</CardTitle>
                          <CardDescription className="text-sm">
                            Update security policies and controls
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#004DDD] text-white hover:bg-[#0037A1]">
                            Configure
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="p-6">
                        <CardHeader className="px-4 space-y-1">
                          <CardTitle className="text-lg font-medium">Access Review</CardTitle>
                          <CardDescription className="text-sm">
                            Review and update access permissions
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#004DDD] text-white hover:bg-[#0037A1]">
                            Review Access
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="p-6">
                        <CardHeader className="px-4 space-y-1">
                          <CardTitle className="text-lg font-medium">Security Training</CardTitle>
                          <CardDescription className="text-sm">
                            Schedule security awareness training
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#004DDD] text-white hover:bg-[#0037A1]">
                            Schedule
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="respond">
                <div className="space-y-24">
                  {/* AI-Generated Insights Section */}
                  <div>
                    <div className="flex items-center gap-6 mt-12 mb-6">
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
                        {/* Incident Response Metrics */}
                        <Card className="p-6">
                          <CardHeader className="px-4">
                          <CardTitle className="text-lg font-medium">Response Time Analysis</CardTitle>
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
                                <Line type="monotone" dataKey="threats" name="Detection Time" stroke="#8884d8" />
                                <Line type="monotone" dataKey="vulnerabilities" name="Response Time" stroke="#82ca9d" />
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

                  <div>
                    <div className="my-8">
                      <div className="h-px bg-gray-200" />
                    </div>
                  </div>

                  {/* Standard Metrics Section */}
                  <div className="pt-8">
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
                    
                    {/* Active Incidents Table */}
                    <Card className="p-6">
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
                                <Button variant="destructive" size="sm">
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

                  <div>
                    <div className="my-8">
                      <div className="h-px bg-gray-200" />
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="pt-8">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="p-6">
                        <CardHeader className="px-4 space-y-1">
                          <CardTitle className="text-lg font-medium">System Lockdown</CardTitle>
                          <CardDescription className="text-sm">
                            Initiate emergency system lockdown
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#CE203C] text-white hover:bg-[#A41830]">
                            Lock Systems
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="p-6">
                        <CardHeader className="px-4 space-y-1">
                          <CardTitle className="text-lg font-medium">Generate Report</CardTitle>
                          <CardDescription className="text-sm">
                            Create incident response report
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#004DDD] text-white hover:bg-[#0037A1]">
                            Generate
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="p-6">
                        <CardHeader className="px-4 space-y-1">
                          <CardTitle className="text-lg font-medium">Recovery Plan</CardTitle>
                          <CardDescription className="text-sm">
                            Execute system recovery procedures
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#004DDD] text-white hover:bg-[#0037A1]">
                            Start Recovery
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 mt-16">
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

