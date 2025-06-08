'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Globe, Wifi } from 'lucide-react'

export default function SpeedOfLightDemo() {
  const [distance, setDistance] = useState(1000) // km
  const [medium, setMedium] = useState<'fiber' | 'copper'>('fiber')
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Speed of light in different media (km/s)
  const speeds = {
    vacuum: 299792,
    fiber: 200000, // ~2/3 speed of light
    copper: 200000 // roughly same as fiber for electrical signals
  }
  
  const latency = (distance / speeds[medium === 'fiber' ? 'fiber' : 'copper']) * 1000 // ms

  const runAnimation = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), latency)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">Speed of Light: The Ultimate Limit</h2>
        <p className="text-gray-300 text-lg">
          No information can travel faster than light. This fundamental limit of physics 
          determines the minimum latency in any network communication.
        </p>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Distance</label>
          <input
            type="range"
            min="1"
            max="20000"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>1 km</span>
            <span className="text-white font-semibold">{distance.toLocaleString()} km</span>
            <span>20,000 km</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Medium</label>
          <div className="flex gap-4">
            {(['fiber', 'copper'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMedium(m)}
                className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                  medium === m
                    ? 'border-yellow-400 bg-yellow-400/20 text-white'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                {m === 'fiber' ? 'Fiber Optic' : 'Copper Cable'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-black/50 rounded-xl p-8 relative overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="text-center">
            <Wifi className="w-12 h-12 text-blue-400 mx-auto mb-2" />
            <p className="text-sm">Source</p>
          </div>
          
          {/* Animated Signal */}
          <div className="flex-1 mx-8 relative h-2">
            <div className="absolute inset-0 bg-white/10 rounded-full" />
            <motion.div
              className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"
              animate={{
                x: isAnimating ? '100%' : '0%'
              }}
              transition={{
                duration: latency / 1000,
                ease: 'linear'
              }}
            />
          </div>
          
          <div className="text-center">
            <Globe className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <p className="text-sm">Destination</p>
          </div>
        </div>

        <button
          onClick={runAnimation}
          className="w-full py-3 bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400 rounded-lg text-yellow-400 font-semibold transition-all"
        >
          Send Signal
        </button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface/50 rounded-lg p-4 border border-white/10">
          <p className="text-sm text-gray-400 mb-1">One-way Latency</p>
          <p className="text-2xl font-bold text-yellow-400">
            {latency.toFixed(2)} ms
          </p>
        </div>
        
        <div className="bg-surface/50 rounded-lg p-4 border border-white/10">
          <p className="text-sm text-gray-400 mb-1">Round Trip Time</p>
          <p className="text-2xl font-bold text-blue-400">
            {(latency * 2).toFixed(2)} ms
          </p>
        </div>
        
        <div className="bg-surface/50 rounded-lg p-4 border border-white/10">
          <p className="text-sm text-gray-400 mb-1">Signal Speed</p>
          <p className="text-2xl font-bold text-green-400">
            {speeds[medium === 'fiber' ? 'fiber' : 'copper'].toLocaleString()} km/s
          </p>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-6 border border-yellow-500/20">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" /> Key Insights
        </h3>
        <ul className="space-y-2 text-gray-300">
          <li>• NYC to London (~5,500 km): minimum {(5500 / speeds.fiber * 1000).toFixed(1)} ms latency</li>
          <li>• This is physics - no amount of engineering can make it faster</li>
          <li>• Real-world latency is always higher due to routing, processing, and congestion</li>
          <li>• This is why CDNs exist - to put content physically closer to users</li>
        </ul>
      </div>
    </div>
  )
}
