'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import UPIArchitecture from '@/components/case-studies/UPIArchitecture'
import UPITransactionFlow from '@/components/case-studies/UPITransactionFlow'
import { ArrowLeft, ArrowRight, CreditCard, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    title: 'UPI Architecture Overview',
    content: UPIArchitecture,
    description: 'How India processes 10 billion transactions/month',
    icon: <CreditCard className="w-6 h-6" />
  },
  {
    title: 'Transaction Flow & Security',
    content: UPITransactionFlow,
    description: 'End-to-end flow with fraud detection',
    icon: <Shield className="w-6 h-6" />
  }
]

export default function UPIPaymentSystemPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const CurrentContent = sections[currentSection].content

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/case-studies">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft /> Back to Case Studies
            </motion.button>
          </Link>
          
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-green-400" />
            <span className="text-sm text-gray-400">Real-world System Design</span>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            UPI Payment System Design
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            How PhonePe, Google Pay, and Paytm handle 10 billion transactions per month 
            with 99.99% uptime and sub-second latency
          </p>
          
          <div className="flex justify-center gap-8 mt-8 text-sm">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-400">10B+</p>
              <p className="text-gray-400">Monthly Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">300M+</p>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">99.99%</p>
              <p className="text-gray-400">Uptime SLA</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-400">&lt;1s</p>
              <p className="text-gray-400">Transaction Time</p>
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
                    ? 'border-green-400 bg-green-400/10 text-white'
                    : 'border-white/10 hover:border-white/20 text-gray-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={currentSection === index ? 'text-green-400' : 'text-gray-400'}>
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
                : 'bg-green-600 hover:bg-green-500 text-white'
            }`}
          >
            Next <ArrowRight />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
