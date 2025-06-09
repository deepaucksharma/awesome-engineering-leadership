'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import NetworkVisualization from '@/components/NetworkVisualization'
import InteractiveCounter from '@/components/InteractiveCounter'
import { ArrowRight, Cpu, Database, Network, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <NetworkVisualization />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent"
          >
            System Design
            <span className="block text-4xl md:text-5xl mt-2 text-white/80">
              From First Principles
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            No jargon. No magic. Just understanding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex gap-4 justify-center"
          >
            <Link href="/fundamentals">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-violet-600 rounded-lg font-semibold text-lg flex items-center gap-2 glow hover:bg-violet-500 transition-colors"
              >
                Start Learning <ArrowRight />
              </motion.button>
            </Link>
            
            <Link href="/playground">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-violet-600 rounded-lg font-semibold text-lg hover:bg-violet-600/20 transition-colors"
              >
                Try Playground
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Key Numbers Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            The Numbers That Matter™
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InteractiveCounter
              label="L1 Cache Reference"
              value={0.5}
              unit="ns"
              description="Faster than you can blink"
              icon={<Cpu className="w-6 h-6" />}
            />
            <InteractiveCounter
              label="Read 1MB from SSD"
              value={1000}
              unit="μs"
              description="1000x slower than RAM"
              icon={<Database className="w-6 h-6" />}
            />
            <InteractiveCounter
              label="Network Round Trip"
              value={500}
              unit="μs"
              description="Same datacenter"
              icon={<Network className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-20 px-6 bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Course Modules
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/fundamentals">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-xl border border-violet-500/30 hover:border-violet-400/50 transition-all cursor-pointer"
              >
                <Zap className="w-12 h-12 text-violet-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Fundamentals</h3>
                <p className="text-gray-300">
                  Physics of computing, storage, networking, and compute basics
                </p>
              </motion.div>
            </Link>
            
            <Link href="/case-studies">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all cursor-pointer"
              >
                <Database className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Real-World Case Studies</h3>
                <p className="text-gray-300">
                  UPI, Flipkart, WhatsApp, and more Indian & global systems
                </p>
              </motion.div>
            </Link>
            
            <Link href="/low-level-design">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all cursor-pointer"
              >
                <Cpu className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Low-Level Design</h3>
                <p className="text-gray-300">
                  Build production components: OTP systems, rate limiters, and more
                </p>
              </motion.div>
            </Link>
            
            <Link href="/playground">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-gradient-to-br from-pink-600/20 to-orange-600/20 rounded-xl border border-pink-500/30 hover:border-pink-400/50 transition-all cursor-pointer"
              >
                <Network className="w-12 h-12 text-pink-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">System Playground</h3>
                <p className="text-gray-300">
                  Design and simulate distributed systems interactively
                </p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
