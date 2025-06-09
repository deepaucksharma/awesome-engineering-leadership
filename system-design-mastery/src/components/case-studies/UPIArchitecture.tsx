'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Smartphone, Server, Shield, Database, GitBranch, Zap } from 'lucide-react'

export default function UPIArchitecture() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  
  const components = {
    psp: {
      name: 'Payment Service Providers',
      examples: ['PhonePe', 'Google Pay', 'Paytm', 'WhatsApp Pay'],
      description: 'Front-end apps that users interact with. Handle UX, KYC, and initial validation.',
      color: 'text-blue-400',
      metrics: '300M+ users, 50K+ TPS peak'
    },
    npci: {
      name: 'NPCI (UPI Switch)',
      examples: ['Central switching & routing', 'Transaction orchestration'],
      description: 'National Payments Corporation of India - Routes transactions between banks.',
      color: 'text-green-400',
      metrics: '10B+ transactions/month, 99.99% uptime'
    },
    banks: {
      name: 'Issuing & Acquiring Banks',
      examples: ['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak'],
      description: 'Actual account holders. Process debits/credits and maintain ledgers.',
      color: 'text-purple-400',
      metrics: '200+ banks integrated'
    },
    fraud: {
      name: 'Fraud Detection System',
      examples: ['Real-time ML models', 'Rule engines', 'Risk scoring'],
      description: 'Analyzes patterns, device fingerprints, and behavior for fraud prevention.',
      color: 'text-red-400',
      metrics: '<0.01% fraud rate'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">UPI System Architecture</h2>
        <p className="text-gray-300 text-lg">
          India's Unified Payments Interface processes more transactions than most global payment systems combined. 
          Here's how it achieves massive scale with four 9s reliability.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-black/50 rounded-xl p-8">
        <div className="relative">
          {/* User Layer */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 border border-blue-400 rounded-lg cursor-pointer"
              onClick={() => setSelectedComponent('psp')}
            >
              <Smartphone className="w-6 h-6 text-blue-400" />
              <span className="font-semibold">Payment Apps (PSPs)</span>
            </motion.div>
          </div>

          {/* Connection Lines */}
          <div className="flex justify-center mb-8">
            <div className="w-px h-16 bg-white/20" />
          </div>

          {/* NPCI Layer */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500/20 border border-green-400 rounded-lg cursor-pointer"
              onClick={() => setSelectedComponent('npci')}
            >
              <GitBranch className="w-8 h-8 text-green-400" />
              <span className="font-bold text-xl">NPCI (UPI Switch)</span>
            </motion.div>
          </div>

          {/* Connection to Banks */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-16">
              <div className="w-px h-16 bg-white/20" />
              <div className="w-px h-16 bg-white/20" />
              <div className="w-px h-16 bg-white/20" />
            </div>
          </div>

          {/* Banks Layer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-3 bg-purple-500/20 border border-purple-400 rounded-lg cursor-pointer"
              onClick={() => setSelectedComponent('banks')}
            >
              <Building2 className="w-6 h-6 text-purple-400" />
              <span>Issuing Banks</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-3 bg-red-500/20 border border-red-400 rounded-lg cursor-pointer"
              onClick={() => setSelectedComponent('fraud')}
            >
              <Shield className="w-6 h-6 text-red-400" />
              <span>Fraud Detection</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-3 bg-purple-500/20 border border-purple-400 rounded-lg cursor-pointer"
              onClick={() => setSelectedComponent('banks')}
            >
              <Building2 className="w-6 h-6 text-purple-400" />
              <span>Acquiring Banks</span>
            </motion.div>
          </div>
        </div>

        {/* Component Details */}
        {selectedComponent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-white/5 rounded-lg border border-white/20"
          >
            <h3 className={`text-xl font-semibold mb-3 ${components[selectedComponent].color}`}>
              {components[selectedComponent].name}
            </h3>
            <p className="text-gray-300 mb-4">{components[selectedComponent].description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">Examples:</p>
                <ul className="space-y-1">
                  {components[selectedComponent].examples.map((example, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <div className="w-1 h-1 bg-white/40 rounded-full" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Key Metrics:</p>
                <p className={`text-lg font-mono ${components[selectedComponent].color}`}>
                  {components[selectedComponent].metrics}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Technical Implementation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" /> Data Architecture
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" />
              <div>
                <strong>Distributed Ledgers:</strong> Each bank maintains its own ledger with eventual consistency
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" />
              <div>
                <strong>Transaction Logs:</strong> Immutable append-only logs with 7-year retention
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" />
              <div>
                <strong>Reconciliation:</strong> T+1 settlement with automated dispute resolution
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" />
              <div>
                <strong>Caching:</strong> Redis clusters for VPA lookups and rate limiting
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-400" /> Performance Optimizations
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-green-400 rounded-full mt-1.5" />
              <div>
                <strong>Circuit Breakers:</strong> Automatic failover with 50ms detection time
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-green-400 rounded-full mt-1.5" />
              <div>
                <strong>Load Balancing:</strong> Geo-distributed with latency-based routing
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-green-400 rounded-full mt-1.5" />
              <div>
                <strong>Async Processing:</strong> Message queues for non-critical operations
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-green-400 rounded-full mt-1.5" />
              <div>
                <strong>Connection Pooling:</strong> Persistent connections between NPCI and banks
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Scale Numbers */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
        <h3 className="text-xl font-semibold mb-4">Operating at India Scale</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-400">150K+</p>
            <p className="text-sm text-gray-400">Peak TPS</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">2TB+</p>
            <p className="text-sm text-gray-400">Daily Data</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400">200ms</p>
            <p className="text-sm text-gray-400">P99 Latency</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-400">₹20L Cr+</p>
            <p className="text-sm text-gray-400">Annual Volume</p>
          </div>
        </div>
      </div>
    </div>
  )
}
