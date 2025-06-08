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
    </main>
  )
}
