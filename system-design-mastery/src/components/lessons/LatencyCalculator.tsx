'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Cpu, Database, Globe, HardDrive, Wifi } from 'lucide-react'

const operations = [
  { name: 'L1 Cache', time: 0.5, unit: 'ns', icon: Cpu, color: 'text-green-400' },
  { name: 'L2 Cache', time: 7, unit: 'ns', icon: Cpu, color: 'text-green-400' },
  { name: 'RAM Access', time: 100, unit: 'ns', icon: Cpu, color: 'text-blue-400' },
  { name: 'SSD Random Read', time: 150, unit: 'μs', icon: HardDrive, color: 'text-orange-400' },
  { name: 'HDD Seek', time: 10, unit: 'ms', icon: HardDrive, color: 'text-red-400' },
  { name: 'Same DC Network', time: 0.5, unit: 'ms', icon: Wifi, color: 'text-purple-400' },
  { name: 'Cross-Country Network', time: 50, unit: 'ms', icon: Globe, color: 'text-pink-400' },
]

export default function LatencyCalculator() {
  const [selectedOps, setSelectedOps] = useState<number[]>([])
  const [scale, setScale] = useState<'human' | 'computer'>('computer')

  const toggleOperation = (index: number) => {
    setSelectedOps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // Convert all times to nanoseconds for calculation
  const convertToNs = (time: number, unit: string) => {
    switch (unit) {
      case 'ns': return time
      case 'μs': return time * 1000
      case 'ms': return time * 1000000
      default: return time
    }
  }

  const totalTimeNs = selectedOps.reduce((sum, index) => {
    const op = operations[index]
    return sum + convertToNs(op.time, op.unit)
  }, 0)

  // Format time with appropriate unit
  const formatTime = (ns: number) => {
    if (ns < 1000) return `${ns.toFixed(1)} ns`
    if (ns < 1000000) return `${(ns / 1000).toFixed(1)} μs`
    if (ns < 1000000000) return `${(ns / 1000000).toFixed(1)} ms`
    return `${(ns / 1000000000).toFixed(2)} s`
  }

  // Scale to human time (1 ns = 1 second)
  const humanScaleTime = (ns: number) => {
    const seconds = ns
    if (seconds < 60) return `${seconds.toFixed(0)} seconds`
    if (seconds < 3600) return `${(seconds / 60).toFixed(0)} minutes`
    if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} hours`
    if (seconds < 31536000) return `${(seconds / 86400).toFixed(1)} days`
    return `${(seconds / 31536000).toFixed(1)} years`
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">Latency Calculator</h2>
        <p className="text-gray-300 text-lg">
          Click operations to add them to your path. See how latencies compound in real systems.
        </p>
      </div>

      {/* Scale Toggle */}
      <div className="flex gap-4 p-1 bg-white/10 rounded-lg w-fit">
        <button
          onClick={() => setScale('computer')}
          className={`px-4 py-2 rounded-md transition-all ${
            scale === 'computer' 
              ? 'bg-violet-600 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Computer Time
        </button>
        <button
          onClick={() => setScale('human')}
          className={`px-4 py-2 rounded-md transition-all ${
            scale === 'human' 
              ? 'bg-violet-600 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Human Scale (1ns = 1s)
        </button>
      </div>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {operations.map((op, index) => {
          const Icon = op.icon
          const isSelected = selectedOps.includes(index)
          
          return (
            <motion.button
              key={index}
              onClick={() => toggleOperation(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg border transition-all ${
                isSelected
                  ? 'border-violet-400 bg-violet-400/20'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon className={`w-8 h-8 ${op.color}`} />
                <div className="text-left flex-1">
                  <p className="font-semibold">{op.name}</p>
                  <p className="text-sm text-gray-400">
                    {op.time} {op.unit}
                    {scale === 'human' && (
                      <span className="text-violet-400 ml-2">
                        = {humanScaleTime(convertToNs(op.time, op.unit))}
                      </span>
                    )}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">{selectedOps.indexOf(index) + 1}</span>
                  </div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Total Calculation */}
      {selectedOps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-lg p-6 border border-violet-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Calculator className="w-5 h-5 text-violet-400" /> Total Latency
            </h3>
            <button
              onClick={() => setSelectedOps([])}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear all
            </button>
          </div>
          
          <div className="space-y-2">
            {selectedOps.map((index, order) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-400">
                  {order + 1}. {operations[index].name}
                </span>
                <span className="text-gray-300">
                  {operations[index].time} {operations[index].unit}
                </span>
              </div>
            ))}
            <div className="border-t border-white/20 pt-2 mt-4">
              <div className="flex justify-between items-end">
                <span className="font-semibold">Total</span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-violet-400">
                    {formatTime(totalTimeNs)}
                  </p>
                  {scale === 'human' && (
                    <p className="text-sm text-gray-400">
                      = {humanScaleTime(totalTimeNs)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Insights */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-blue-500/20">
        <h3 className="text-xl font-semibold mb-3">Understanding the Gap</h3>
        <p className="text-gray-300 mb-4">
          If a CPU cycle (0.3ns) was 1 second, then:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li>• RAM access = 5.5 minutes</li>
          <li>• SSD read = 4.5 days</li>
          <li>• Network request to another continent = 4 years!</li>
        </ul>
        <p className="text-gray-400 mt-4 text-sm">
          This is why caching and data locality are critical in system design.
        </p>
      </div>
    </div>
  )
}
