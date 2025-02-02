"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showAdditionalContacts, setShowAdditionalContacts] = useState(false)
  const [formData, setFormData] = useState({
    company: {
      name: '',
      industry: '',
      size: '',
      description: '',
      website: ''
    },
    contacts: {
      primary: {
        name: '',
        email: '',
        role: ''
      },
      additional: []
    },
    security: {
      hasMeasures: '',
      hadIncidents: '',
      topConcern: ''
    }
  })
  const router = useRouter()

  const handleInputChange = (section: keyof typeof formData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleComplete = () => {
    localStorage.setItem('onboardingData', JSON.stringify(formData))
    router.push('/dashboard')
  }

  const steps = [
    {
      title: "Company Information",
      description: "Tell us about your business to help us customize your security solution.",
      fields: (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input 
              id="company" 
              placeholder="Enter your company name"
              value={formData.company.name}
              onChange={(e) => handleInputChange('company', 'name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Input 
              id="description"
              placeholder="Briefly describe your company"
              value={formData.company.description}
              onChange={(e) => handleInputChange('company', 'description', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Financial Services</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Company Size</Label>
            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-500">201-500 employees</SelectItem>
                <SelectItem value="500+">500+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Company Website</Label>
            <Input 
              id="website"
              placeholder="https://example.com"
              value={formData.company.website}
              onChange={(e) => handleInputChange('company', 'website', e.target.value)}
            />
          </div>
        </div>
      )
    },
    {
      title: "Key People",
      description: "We'll help protect your people at your company.",
      fields: (
        <div className="space-y-8">
          {/* Primary Contact */}
          <div className="space-y-6">
            <h3 className="font-medium text-gray-700">Primary Contact</h3>
            <div className="space-y-2">
              <Label htmlFor="primary-name">Full Name</Label>
              <Input id="primary-name" placeholder="Enter your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primary-email">Email</Label>
              <Input id="primary-email" type="email" placeholder="Enter your work email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primary-role">Role</Label>
              <Input id="primary-role" placeholder="Enter your role (e.g., CTO, IT Director)" />
            </div>
          </div>

          {/* Additional Key Contacts */}
          <div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowAdditionalContacts(!showAdditionalContacts)}
              className="text-[#015AFF] border-[#015AFF] hover:bg-[#015AFF]/5"
            >
              {showAdditionalContacts ? '- Hide other employees' : '+ Add other employees'}
            </Button>

            {showAdditionalContacts && (
              <div className="space-y-6 mt-6">
                <h3 className="font-medium text-gray-700">Additional Key Contacts</h3>
                <div className="space-y-6">
                  {/* Contact 1 */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact1-name">Full Name</Label>
                      <Input id="contact1-name" placeholder="Enter contact's full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact1-email">Email</Label>
                      <Input id="contact1-email" type="email" placeholder="Enter contact's work email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact1-role">Role</Label>
                      <Input id="contact1-role" placeholder="Enter contact's role" />
                    </div>
                  </div>

                  {/* Contact 2 */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact2-name">Full Name</Label>
                      <Input id="contact2-name" placeholder="Enter contact's full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact2-email">Email</Label>
                      <Input id="contact2-email" type="email" placeholder="Enter contact's work email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact2-role">Role</Label>
                      <Input id="contact2-role" placeholder="Enter contact's role" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      title: "Security Assessment",
      description: "Answer a few questions about your current security measures.",
      fields: (
        <div className="space-y-8">
          <div className="space-y-4">
            <Label>Do you currently have any cybersecurity measures in place?</Label>
            <RadioGroup defaultValue="no">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="security-yes" />
                <Label htmlFor="security-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="security-no" />
                <Label htmlFor="security-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-4">
            <Label>Have you experienced any security incidents in the past year?</Label>
            <RadioGroup defaultValue="no">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="incidents-yes" />
                <Label htmlFor="incidents-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="incidents-no" />
                <Label htmlFor="incidents-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="concerns">Top Security Concern</Label>
            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select your main concern" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="data-breach">Data Breaches</SelectItem>
                <SelectItem value="ransomware">Ransomware</SelectItem>
                <SelectItem value="phishing">Phishing Attacks</SelectItem>
                <SelectItem value="insider">Insider Threats</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-black relative">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-white hover:text-gray-300 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${
                currentStep === index ? "block" : "hidden"
              } bg-white rounded-lg p-12 shadow-lg`}
            >
              <Image
                src="/cyberhydra-logo.png"
                alt="CyberHydra Logo"
                width={120}
                height={120}
                className="mx-auto mb-8"
              />
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
                {step.title}
              </h2>
              <p className="text-gray-600 text-center mb-8">
                {step.description}
              </p>

              {step.fields}

              <div className="flex justify-between mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={currentStep === 0}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    if (currentStep < steps.length - 1) {
                      setCurrentStep(prev => prev + 1)
                    } else {
                      handleComplete()
                    }
                  }}
                  className="bg-[#015AFF] hover:bg-[#4785FF] text-white"
                >
                  {currentStep === steps.length - 1 ? "Complete" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 