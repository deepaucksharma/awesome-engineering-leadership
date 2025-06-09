'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Key, Code, Shield, Database,
  Clock, GitBranch, Cpu, Lock
} from 'lucide-react'

const designs = [
  {
    id: 'otp-system',
    title: 'OTP Authentication System',
    subtitle: 'Secure generation, rate limiting, and expiry handling',
    icon: <Key className="w-8 h-8" />,
    concepts: ['Token generation', 'Redis caching', 'Rate limiting', 'State machines'],
    difficulty: 'Intermediate',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    id: 'rate-limiter',
    title: 'Distributed Rate Limiter',
    subtitle: 'Token bucket and sliding window implementations',
    icon: <Shield className="w-8 h-8" />,
    concepts: ['Token bucket', 'Sliding window', 'Redis Lua scripts', 'Distributed locks'],
    difficulty: 'Advanced',
    color: 'from-red-400 to-orange-400'
  },
  {
    id: 'payment-splitter',
    title: 'Payment Splitting System',
    subtitle: 'Like Splitwise - handle group expenses and settlements',
    icon: <GitBranch className="w-8 h-8" />,
    concepts: ['Graph algorithms', 'Debt simplification', 'Transaction logs', 'ACID properties'],
    difficulty: 'Intermediate',
    color: 'from-green-400 to-emerald-400'
  },
  {
    id: 'task-scheduler',
    title: 'Distributed Task Scheduler',
    subtitle: 'Cron-like system with reliability guarantees',
    icon: <Clock className="w-8 h-8" />,
    concepts: ['Priority queues', 'Leader election', 'Fault tolerance', 'Exactly-once delivery'],
    difficulty: 'Advanced',
    color: 'from-purple-400 to-pink-400'
  }
]

const codePatterns = [
  {
    title: 'Singleton Pattern',
    icon: <Cpu className="w-6 h-6" />,
    useCase: 'Database connection pools'
  },
  {
    title: 'Factory Pattern',
    icon: <Code className="w-6 h-6" />,
    useCase: 'Creating different notification types'
  },
  {
    title: 'Observer Pattern',
    icon: <Database className="w-6 h-6" />,
    useCase: 'Event-driven architectures'
  },
  {
    title: 'Strategy Pattern',
    icon: <Lock className="w-6 h-6" />,
    useCase: 'Multiple payment gateways'
  }
]

export default function LowLevelDesignPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Low-Level System Design
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Implement core components from scratch. Focus on code quality, design patterns, 
            and production-ready implementations.
          </p>
        </motion.div>

        {/* LLD Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Implementation Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {designs.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/low-level-design/${design.id}`}>
                  <div className="group relative">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${design.color} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}
                    />
                    
                    <div className="relative bg-surface/80 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${design.color} text-white`}>
                          {design.icon}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{design.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              design.difficulty === 'Advanced'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {design.difficulty}
                            </span>
                          </div>
                          
                          <p className="text-gray-400 mb-4">{design.subtitle}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {design.concepts.map((concept, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-white/5 rounded text-gray-400"
                              >
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Design Patterns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Essential Design Patterns</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {codePatterns.map((pattern, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-surface/50 backdrop-blur border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/10 rounded">
                    {pattern.icon}
                  </div>
                  <h4 className="font-semibold">{pattern.title}</h4>
                </div>
                <p className="text-sm text-gray-400">{pattern.useCase}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Best Practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-blue-500/20"
        >
          <h3 className="text-2xl font-bold mb-6">Production-Ready Code Principles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-blue-400 mb-3">Code Quality</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• SOLID principles adherence</li>
                <li>• Comprehensive error handling</li>
                <li>• Thread-safe implementations</li>
                <li>• Extensive unit test coverage</li>
                <li>• Clear documentation and comments</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-purple-400 mb-3">Performance</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• O(1) lookups with proper data structures</li>
                <li>• Connection pooling for databases</li>
                <li>• Async/await for I/O operations</li>
                <li>• Caching strategies implementation</li>
                <li>• Memory-efficient algorithms</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
