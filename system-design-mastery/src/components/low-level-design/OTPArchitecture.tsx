'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Server, Database, Shield, Clock, Key, Mail, AlertTriangle } from 'lucide-react'

export default function OTPArchitecture() {
  const [selectedFlow, setSelectedFlow] = useState<'generate' | 'verify' | null>(null)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">OTP System Architecture</h2>
        <p className="text-gray-300 text-lg">
          A production-ready OTP system handling millions of authentication requests daily 
          with security, rate limiting, and reliability at its core.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-black/50 rounded-xl p-8">
        <h3 className="text-xl font-semibold mb-6">System Components</h3>
        
        <div className="relative">
          {/* Client Layer */}
          <div className="flex justify-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-6 py-3 bg-blue-500/20 border border-blue-400 rounded-lg cursor-pointer"
            >
              <Smartphone className="w-6 h-6 text-blue-400" />
              <span>Mobile App / Web Client</span>
            </motion.div>
          </div>

          <div className="flex justify-center mb-8">
            <div className="w-px h-12 bg-white/20" />
          </div>

          {/* API Gateway */}
          <div className="flex justify-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-6 py-3 bg-purple-500/20 border border-purple-400 rounded-lg"
            >
              <Shield className="w-6 h-6 text-purple-400" />
              <span>API Gateway (Rate Limiting)</span>
            </motion.div>
          </div>

          <div className="flex justify-center mb-8">
            <div className="w-px h-12 bg-white/20" />
          </div>

          {/* OTP Service */}
          <div className="flex justify-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-8 py-4 bg-green-500/20 border border-green-400 rounded-lg"
            >
              <Key className="w-8 h-8 text-green-400" />
              <span className="text-xl font-semibold">OTP Service</span>
            </motion.div>
          </div>

          {/* Connected Services */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="w-px h-12 bg-white/20" />
            <div className="w-px h-12 bg-white/20" />
            <div className="w-px h-12 bg-white/20" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-2 p-4 bg-red-500/20 border border-red-400 rounded-lg"
            >
              <Database className="w-6 h-6 text-red-400" />
              <span className="text-sm">Redis Cache</span>
              <span className="text-xs text-gray-400">OTP Storage</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-2 p-4 bg-orange-500/20 border border-orange-400 rounded-lg"
            >
              <Mail className="w-6 h-6 text-orange-400" />
              <span className="text-sm">SMS/Email Service</span>
              <span className="text-xs text-gray-400">Delivery</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-2 p-4 bg-yellow-500/20 border border-yellow-400 rounded-lg"
            >
              <Server className="w-6 h-6 text-yellow-400" />
              <span className="text-sm">PostgreSQL</span>
              <span className="text-xs text-gray-400">Audit Logs</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Flow Selection */}
      <div className="flex gap-4">
        <button
          onClick={() => setSelectedFlow('generate')}
          className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
            selectedFlow === 'generate'
              ? 'bg-blue-600 text-white'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          OTP Generation Flow
        </button>
        <button
          onClick={() => setSelectedFlow('verify')}
          className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
            selectedFlow === 'verify'
              ? 'bg-green-600 text-white'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          OTP Verification Flow
        </button>
      </div>

      {/* Flow Details */}
      {selectedFlow && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4">
            {selectedFlow === 'generate' ? 'Generation' : 'Verification'} Flow
          </h3>
          
          {selectedFlow === 'generate' ? (
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
                <div>
                  <p className="font-semibold">Client requests OTP</p>
                  <p className="text-sm text-gray-400">POST /api/otp/generate with phone/email</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">2</span>
                <div>
                  <p className="font-semibold">Rate limit check</p>
                  <p className="text-sm text-gray-400">Max 10 requests per hour per user</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">3</span>
                <div>
                  <p className="font-semibold">Generate secure OTP</p>
                  <p className="text-sm text-gray-400">6-digit cryptographically secure random number</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">4</span>
                <div>
                  <p className="font-semibold">Store in Redis</p>
                  <p className="text-sm text-gray-400">Key: otp:phone:{number}, TTL: 300s</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">5</span>
                <div>
                  <p className="font-semibold">Send via SMS/Email</p>
                  <p className="text-sm text-gray-400">Async queue for delivery</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">6</span>
                <div>
                  <p className="font-semibold">Log to database</p>
                  <p className="text-sm text-gray-400">Audit trail for compliance</p>
                </div>
              </li>
            </ol>
          ) : (
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-sm">1</span>
                <div>
                  <p className="font-semibold">Client submits OTP</p>
                  <p className="text-sm text-gray-400">POST /api/otp/verify with OTP code</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-sm">2</span>
                <div>
                  <p className="font-semibold">Check attempt count</p>
                  <p className="text-sm text-gray-400">Max 3 attempts allowed</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-sm">3</span>
                <div>
                  <p className="font-semibold">Retrieve from Redis</p>
                  <p className="text-sm text-gray-400">Get stored OTP and metadata</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-sm">4</span>
                <div>
                  <p className="font-semibold">Validate OTP</p>
                  <p className="text-sm text-gray-400">Compare and check expiry</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-sm">5</span>
                <div>
                  <p className="font-semibold">Generate JWT token</p>
                  <p className="text-sm text-gray-400">On success, issue auth token</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-sm">6</span>
                <div>
                  <p className="font-semibold">Clean up Redis</p>
                  <p className="text-sm text-gray-400">Delete used OTP immediately</p>
                </div>
              </li>
            </ol>
          )}
        </motion.div>
      )}

      {/* Security Considerations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" /> Security Measures
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-red-400 rounded-full mt-1.5" />
              <span>Cryptographically secure random generation</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-red-400 rounded-full mt-1.5" />
              <span>OTP hashing before storage (optional)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-red-400 rounded-full mt-1.5" />
              <span>IP-based rate limiting</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-red-400 rounded-full mt-1.5" />
              <span>Exponential backoff for retries</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-red-400 rounded-full mt-1.5" />
              <span>Audit logging for all attempts</span>
            </li>
          </ul>
        </div>

        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" /> Performance Metrics
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" />
              <span>Generation latency: &lt;50ms</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" />
              <span>Verification latency: &lt;20ms</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" />
              <span>SMS delivery: 2-10s (provider dependent)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" />
              <span>Redis operations: &lt;5ms</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" />
              <span>Throughput: 10K OTPs/second</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-6 border border-orange-500/20">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-400" /> Production Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <ul className="space-y-2">
            <li>• Use environment variables for sensitive config</li>
            <li>• Implement circuit breakers for SMS providers</li>
            <li>• Add monitoring for failed deliveries</li>
            <li>• Use message queues for async processing</li>
          </ul>
          <ul className="space-y-2">
            <li>• Implement IP whitelisting for critical APIs</li>
            <li>• Add CAPTCHA after multiple failures</li>
            <li>• Use separate Redis instances for OTP</li>
            <li>• Regular security audits and pen testing</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
