'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import OTPArchitecture from '@/components/low-level-design/OTPArchitecture'
import OTPImplementation from '@/components/low-level-design/OTPImplementation'
import { ArrowLeft, ArrowRight, Key, Code } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    title: 'Architecture & Design',
    content: OTPArchitecture,
    description: 'System components and data flow',
    icon: <Key className="w-6 h-6" />
  },
  {
    title: 'Implementation Details',
    content: OTPImplementation,
    description: 'Code walkthrough with best practices',
    icon: <Code className="w-6 h-6" />
  }
]

export default function OTPSystemPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const CurrentContent = sections[currentSection].content

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/low-level-design">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft /> Back to Low-Level Design
            </motion.button>
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            OTP Authentication System
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Build a production-ready OTP system with secure generation, rate limiting, 
            expiration handling, and retry mechanisms
          </p>
          
          <div className="flex justify-center gap-8 mt-8 text-sm">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">6 digits</p>
              <p className="text-gray-400">OTP Length</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-400">5 min</p>
              <p className="text-gray-400">Expiry Time</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-400">3</p>
              <p className="text-gray-400">Max Attempts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-400">10/hr</p>
              <p className="text-gray-400">Rate Limit</p>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            {sections.map((section, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSection(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 p-4 rounded-lg border transition-all ${
                  currentSection === index
                    ? 'border-blue-400 bg-blue-400/10 text-white'
                    : 'border-white/10 hover:border-white/20 text-gray-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={currentSection === index ? 'text-blue-400' : 'text-gray-400'}>
                    {section.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{section.title}</h3>
                    <p className="text-sm mt-1">{section.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface/50 backdrop-blur border border-white/10 rounded-2xl p-8"
        >
          <CurrentContent />
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              currentSection === 0
                ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <ArrowLeft /> Previous
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
            disabled={currentSection === sections.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              currentSection === sections.length - 1
                ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            Next <ArrowRight />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
