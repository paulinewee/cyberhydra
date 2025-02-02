import "./globals.css"
import { Hanken_Grotesk, Pixelify_Sans } from "next/font/google"
import type React from "react" // Import React

const hanken = Hanken_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-hanken',
})

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: '--font-pixelify',
  weight: ['400'],
})

export const metadata = {
  title: "CyberHydra",
  description: "AI-powered cybersecurity solutions for small to medium businesses",
  icons: {
    icon: '/cyberhydra-favicon.png',
    shortcut: '/cyberhydra-favicon.png',
    apple: '/cyberhydra-favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/recharts/2.6.2/recharts.min.css"
          integrity="sha512-Xcr3A+JrL8puAcuZjTfHgLdz+UZgTOaB/uxWnNsZIGtXxJLSRtDjZtCXZvPNPjkBZHfZkJvfT+qHzGP5TRoqOA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="icon" href="/cyberhydra-favicon.png" />
        <link rel="apple-touch-icon" href="/cyberhydra-favicon.png" />
      </head>
      <body className={`${hanken.variable} ${pixelify.variable} font-sans`}>{children}</body>
    </html>
  )
}

