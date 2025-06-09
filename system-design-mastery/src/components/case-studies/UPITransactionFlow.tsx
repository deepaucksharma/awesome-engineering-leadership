'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, XCircle, Clock, Shield, AlertTriangle } from 'lucide-react'

interface TransactionStep {
  id: number
  name: string
  duration: string
  status: 'pending' | 'processing' | 'success' | 'failed'
  description: string
}

export default function UPITransactionFlow() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [transactionId] = useState(`TXN${Date.now()}`)
  
  const [steps, setSteps] = useState<TransactionStep[]>([
    {
      id: 1,
      name: 'User Initiates Payment',
      duration: '10ms',
      status: 'pending',
      description: 'User enters UPI PIN in PhonePe/GPay app'
    },
    {
      id: 2,
      name: 'PSP Validation',
      duration: '20ms',
      status: 'pending',
      description: 'Validate PIN, check device binding, rate limits'
    },
    {
      id: 3,
      name: 'Fraud Detection',
      duration: '50ms',
      status: 'pending',
      description: 'ML models analyze transaction patterns'
    },
    {
      id: 4,
      name: 'NPCI Routing',
      duration: '30ms',
      status: 'pending',
      description: 'Route to payer and payee banks'
    },
    {
      id: 5,
      name: 'Bank Debit Check',
      duration: '100ms',
      status: 'pending',
      description: 'Check balance, apply holds'
    },
    {
      id: 6,
      name: 'Bank Credit',
      duration: '80ms',
      status: 'pending',
      description: 'Credit payee account'
    },
    {
      id: 7,
      name: 'Confirmation',
      duration: '20ms',
      status: 'pending',
      description: 'Send success notifications'
    }
  ])

  useEffect(() => {
    if (!isSimulating || currentStep >= steps.length) return

    const timer = setTimeout(() => {
      setSteps(prev => prev.map((step, idx) => {
        if (idx === currentStep) {
          return { ...step, status: 'processing' }
        } else if (idx < currentStep) {
          return { ...step, status: 'success' }
        }
        return step
      }))

      setTimeout(() => {
        setSteps(prev => prev.map((step, idx) => {
          if (idx === currentStep) {
            return { ...step, status: 'success' }
          }
          return step
        }))
        setCurrentStep(prev => prev + 1)
      }, 500)
    }, 800)

    return () => clearTimeout(timer)
  }, [isSimulating, currentStep, steps.length])

  const startSimulation = () => {
    setIsSimulating(true)
    setCurrentStep(0)
    setSteps(prev => prev.map(step => ({ ...step, status: 'pending' })))
  }

  const totalDuration = steps.reduce((sum, step) => 
    sum + parseInt(step.duration), 0
  )

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">Real-time Transaction Flow</h2>
        <p className="text-gray-300 text-lg">
          Watch how a ₹500 payment flows through the UPI system in under 400ms, 
          with fraud detection, multi-bank coordination, and instant confirmation.
        </p>
      </div>

      {/* Transaction Simulator */}
      <div className="bg-black/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-400">Transaction ID</p>
            <p className="font-mono text-lg">{transactionId}</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-400">Amount</p>
            <p className="text-2xl font-bold text-green-400">₹500</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-400">Total Time</p>
            <p className="text-xl font-bold text-blue-400">{totalDuration}ms</p>
          </div>
        </div>

        <button
          onClick={startSimulation}
          disabled={isSimulating}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            isSimulating 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-500'
          }`}
        >
          {isSimulating ? 'Processing Transaction...' : 'Simulate UPI Transaction'}
        </button>
      </div>

      {/* Transaction Steps */}
      <div className="bg-black/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-6">Transaction Pipeline</h3>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                step.status === 'success' 
                  ? 'border-green-400/50 bg-green-400/10'
                  : step.status === 'processing'
                  ? 'border-yellow-400/50 bg-yellow-400/10'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {/* Status Icon */}
              <div className="flex-shrink-0">
                {step.status === 'success' ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : step.status === 'processing' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                ) : (
                  <div className="w-6 h-6 border-2 border-white/20 rounded-full" />
                )}
              </div>

              {/* Step Details */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{step.name}</h4>
                  <span className="text-sm font-mono text-gray-400">{step.duration}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{step.description}</p>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <ArrowRight className={`w-4 h-4 ${
                  step.status === 'success' ? 'text-green-400' : 'text-gray-600'
                }`} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security & Fraud Prevention */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" /> Fraud Detection Layers
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
              <div>
                <strong>Device Fingerprinting:</strong> Track device changes, rooting, location
              </div>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
              <div>
                <strong>Behavioral Analysis:</strong> Unusual transaction patterns, amounts, timing
              </div>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
              <div>
                <strong>ML Risk Scoring:</strong> Real-time scoring using XGBoost models
              </div>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
              <div>
                <strong>Velocity Checks:</strong> Transaction frequency and amount limits
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Failure Handling</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-orange-400 mt-0.5" />
              <div>
                <strong>Timeout (5s):</strong> Auto-reversal with compensation logic
              </div>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-orange-400 mt-0.5" />
              <div>
                <strong>Insufficient Balance:</strong> Instant failure, no debit attempt
              </div>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-orange-400 mt-0.5" />
              <div>
                <strong>Bank Downtime:</strong> Retry with exponential backoff
              </div>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-orange-400 mt-0.5" />
              <div>
                <strong>Network Issues:</strong> Idempotent design prevents double charges
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Technical Implementation */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
        <h3 className="text-xl font-semibold mb-4">Engineering Challenges at Scale</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-purple-400 mb-2">Consistency</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Two-phase commit between banks</li>
              <li>• Saga pattern for complex flows</li>
              <li>• Event sourcing for audit trail</li>
              <li>• Eventual consistency with reconciliation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-pink-400 mb-2">Performance</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Connection pooling & multiplexing</li>
              <li>• Geo-distributed caching layers</li>
              <li>• Async processing for non-critical paths</li>
              <li>• Database sharding by VPA hash</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
