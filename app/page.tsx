"use client"

import { useEffect, useRef } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Lock, Activity, BarChart3, DollarSign, TrendingUp, AlertTriangle } from "lucide-react"
import Globe from '@/components/globe'
import { motion } from "framer-motion"
import ThreatGlobe from '@/components/threat-globe'

const features = [
  {
    icon: Shield,
    title: "Proactive Defense",
    description: "AI-powered threat detection and prevention that stays ahead of emerging cybersecurity risks."
  },
  {
    icon: Lock,
    title: "Automated Response",
    description: "Instant threat containment and remediation to minimize potential damage and downtime."
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "24/7 surveillance of your digital assets with instant alerts and detailed analytics."
  }
]

// Add statistics data
const threatStats = [
  {
    icon: DollarSign,
    value: "$4.35M",
    label: "Average Cost of Data Breach",
    detail: "IBM Security 2023"
  },
  {
    icon: BarChart3,
    value: "3,200%",
    label: "Increase in AI-Powered Attacks",
    detail: "Last 12 months"
  },
  {
    icon: TrendingUp,
    value: "74%",
    label: "of SMBs Affected",
    detail: "2023 Report"
  },
  {
    icon: AlertTriangle,
    value: "60%",
    label: "Failed Within 6 Months",
    detail: "Post-breach statistics"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Image
              src="/cyberhydra-logo.png"
              alt="CyberHydra Logo"
              width={150}
              height={150}
              className="object-contain"
            />
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost">Demo</Button>
              </Link>
              <Link href="/onboarding">
                <Button className="bg-[#015AFF] hover:bg-[#4785FF] text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Globe */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div className="text-left pt-20">
              <motion.p 
                className="text-base tracking-wider mb-4 font-pixelify text-[#CE203C]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                AI-POWERED CYBERSECURITY
              </motion.p>
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 text-black"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Secure Your Business with AI
              </motion.h1>
              <motion.p 
                className="text-xl mb-8 text-muted-foreground max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                CyberHydra provides enterprise-grade security for businesses of all sizes through advanced AI and automation.
              </motion.p>
              <motion.div 
                className="space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link href="/onboarding">
                  <Button size="lg" className="bg-[#015AFF] hover:bg-[#4785FF] text-white">
                    Get Started
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right side - Globe with adjusted positioning */}
            <div className="relative h-[600px] lg:h-screen w-full -mr-104 -ml-48">
              <Globe />
            </div>
          </div>
        </div>
      </section>

      {/* Threat Landscape Section */}
      <section className="py-32 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-base tracking-wider mb-4 font-pixelify text-[#CE203C]">
              THE THREAT LANDSCAPE
            </p>
            <h2 className="text-4xl font-bold mb-6 text-white">
              AI is Changing the Game
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              As AI technology advances, cybercriminals are leveraging it to create more sophisticated attacks. 
              Your business needs to stay ahead of these evolving threats.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {threatStats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gray-900 backdrop-blur-sm rounded-lg border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon className="w-8 h-8 text-[#015AFF] mb-4" />
                <div className="text-3xl font-bold mb-2 text-white">{stat.value}</div>
                <div className="text-gray-300 font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Threats Section */}
      <section className="py-18 bg-[#FFFFFF]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8">
              <div>
                <p className="text-base tracking-wider mb-4 font-pixelify text-[#CE203C]">
                  THE CHALLENGE
                </p>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  The Rising Threat of AI-Powered Attacks
                </h2>
                <p className="text-gray-700">
                  Cybercriminals are now using AI to automate attacks, create convincing phishing campaigns, 
                  and exploit vulnerabilities faster than ever before. Small and medium-sized businesses are 
                  particularly vulnerable, often lacking the resources to defend against these sophisticated threats.
                </p>
              </div>

              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Automated attacks can probe your defenses 24/7
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  AI-generated phishing emails bypass traditional filters
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Zero-day vulnerabilities are exploited within hours
                </li>
              </ul>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Most Targeted Industries</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Healthcare</span>
                    <span className="text-[#015AFF] font-semibold">48%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Financial Services</span>
                    <span className="text-[#015AFF] font-semibold">42%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Technology</span>
                    <span className="text-[#015AFF] font-semibold">39%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Manufacturing</span>
                    <span className="text-[#015AFF] font-semibold">35%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Threat Globe */}
            <div className="relative h-[600px] lg:h-[800px] w-full -mr-124 -ml-[26rem]">
              <ThreatGlobe />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-[#015AFF]/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-base tracking-wider mb-4 font-pixelify text-[#CE203C]">
              WE'VE GOT YOU
            </p>
            <h2 className="text-4xl font-bold mb-4">
              AI-Powered Cybersecurity Solution for SMBs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive protection with intelligent automation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg border bg-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <feature.icon className="w-12 h-12 text-[#015AFF] mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

            {/* Pricing Section */}
            <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Image
              src="/cyberhydra-logo.png"
              alt="CyberHydra Logo"
              width={120}
              height={120}
              className="mx-auto mb-8"
            />
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the protection level that best fits your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Basic Protection</h3>
              <p className="text-gray-600 mb-6">Essential security features for small businesses</p>
              <div className="text-3xl font-bold text-gray-900 mb-6">$99<span className="text-lg font-normal text-gray-600">/month</span></div>
              <Link href="/onboarding">
                <Button className="w-full bg-[#015AFF] hover:bg-[#4785FF] text-white">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Standard Plan */}
            <div className="rounded-lg border-2 border-[#015AFF] p-8 shadow-md hover:shadow-lg transition-shadow relative">
              <div className="absolute top-0 right-0 bg-[#015AFF] text-white px-4 py-1 text-sm rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Standard Protection</h3>
              <p className="text-gray-600 mb-6">Advanced security with AI-powered threat detection</p>
              <div className="text-3xl font-bold text-gray-900 mb-6">$199<span className="text-lg font-normal text-gray-600">/month</span></div>
              <Link href="/onboarding">
                <Button className="w-full bg-[#015AFF] hover:bg-[#4785FF] text-white">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Enterprise Protection</h3>
              <p className="text-gray-600 mb-6">Complete security solution with dedicated support</p>
              <div className="text-2xl font-bold text-gray-900 mb-6">Contact Sales</div>
              <Link href="/onboarding">
                <Button className="w-full bg-[#015AFF] hover:bg-[#4785FF] text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#015AFF]/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-base tracking-wider mb-4 font-pixelify text-[#CE203C]">
            GET STARTED
          </p>
          <h2 className="text-4xl font-bold mb-6">
            Ready to Secure Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the growing number of businesses that trust CyberHydra for their security needs.
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="bg-[#015AFF] hover:bg-[#4785FF] text-white">
              Start Free Trial
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <Image
                src="/cyberhydra-logo.png"
                alt="CyberHydra Logo"
                width={120}
                height={120}
                className="object-contain mb-6"
              />
              <p className="text-gray-400 max-w-md">
                CyberHydra provides enterprise-grade AI-powered cybersecurity solutions 
                to protect your business from evolving digital threats.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="text-gray-400">contact@cyberhydra.ai</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
                <li className="text-gray-400">123 Security Street<br />Cyber City, CC 12345</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 CyberHydra. All rights reserved.
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

