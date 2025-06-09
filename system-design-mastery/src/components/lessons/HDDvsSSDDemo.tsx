'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HardDrive, Zap, Activity } from 'lucide-react'

export default function HDDvsSSDDemo() {
  const [isReading, setIsReading] = useState(false)
  const [readType, setReadType] = useState<'sequential' | 'random'>('random')
  const [currentDrive, setCurrentDrive] = useState<'hdd' | 'ssd'>('hdd')
  
  const [hddProgress, setHddProgress] = useState(0)
  const [ssdProgress, setSsdProgress] = useState(0)
  const [hddSeekTime, setHddSeekTime] = useState(0)
  
  useEffect(() => {
    if (!isReading) return
    
    const interval = setInterval(() => {
      if (currentDrive === 'hdd') {
        if (readType === 'random' && hddProgress % 20 === 0) {
          // Simulate seek time for HDD
          setHddSeekTime(10 + Math.random() * 5)
        }
        setHddProgress(prev => Math.min(100, prev + (readType === 'random' ? 0.5 : 2)))
      } else {
        setSsdProgress(prev => Math.min(100, prev + 10))
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [isReading, currentDrive, readType, hddProgress])
  
  useEffect(() => {
    if (hddProgress >= 100 || ssdProgress >= 100) {
      setIsReading(false)
    }
  }, [hddProgress, ssdProgress])

  const reset = () => {
    setHddProgress(0)
    setSsdProgress(0)
    setHddSeekTime(0)
    setIsReading(false)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">HDD vs SSD: The Physics of Speed</h2>
        <p className="text-gray-300 text-lg">
          HDDs have spinning disks and moving heads. SSDs have no moving parts. 
          This fundamental difference explains everything.
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <div className="flex gap-2">
          <button
            onClick={() => setReadType('sequential')}
            className={`px-4 py-2 rounded-lg transition-all ${
              readType === 'sequential' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Sequential Read
          </button>
          <button
            onClick={() => setReadType('random')}
            className={`px-4 py-2 rounded-lg transition-all ${
              readType === 'random' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Random Read
          </button>
        </div>
        
        <button
          onClick={() => {
            reset()
            setIsReading(true)
          }}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg"
        >
          Start Reading 100MB
        </button>
        
        <button
          onClick={reset}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* Drive Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* HDD */}
        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-orange-400" /> Hard Disk Drive
          </h3>
          
          {/* Spinning Disk Animation */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-700 to-gray-800"
              animate={{ rotate: isReading ? 360 : 0 }}
              transition={{ 
                duration: 0.5, 
                repeat: isReading ? Infinity : 0,
                ease: "linear"
              }}
            >
              {/* Disk tracks */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-gray-600"
                  style={{
                    margin: `${i * 16}px`,
                  }}
                />
              ))}
            </motion.div>
            
            {/* Read head */}
            <motion.div
              className="absolute top-1/2 left-0 w-1/2 h-1 bg-red-500"
              style={{ transformOrigin: 'right center' }}
              animate={{ 
                rotate: readType === 'random' ? [0, 45, -30, 60, -45] : [0, 10, 20, 30, 40]
              }}
              transition={{ 
                duration: 2,
                repeat: isReading ? Infinity : 0
              }}
            />
            
            {/* Seek indicator */}
            {hddSeekTime > 0 && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-red-400 text-sm font-mono">
                Seeking... {hddSeekTime.toFixed(0)}ms
              </div>
            )}
          </div>
          
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{hddProgress.toFixed(0)}%</span>
            </div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-orange-400"
                initial={{ width: 0 }}
                animate={{ width: `${hddProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">
              Speed: {readType === 'random' ? '100 IOPS' : '150 MB/s'}
            </p>
          </div>
        </div>

        {/* SSD */}
        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-400" /> Solid State Drive
          </h3>
          
          {/* Memory Chips Grid */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <div className="grid grid-cols-4 gap-2 p-4 bg-gray-800 rounded-lg">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square bg-gray-700 rounded"
                  animate={{
                    backgroundColor: isReading && i === Math.floor(ssdProgress / 6.25) 
                      ? '#3B82F6' 
                      : '#374151'
                  }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                    NAND
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* No seek time for SSD */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-green-400 text-sm font-mono">
              No seek time!
            </div>
          </div>
          
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{ssdProgress.toFixed(0)}%</span>
            </div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-400"
                initial={{ width: 0 }}
                animate={{ width: `${ssdProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">
              Speed: {readType === 'random' ? '100,000 IOPS' : '550 MB/s'}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-black/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Performance Comparison</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="pb-2 text-gray-400">Metric</th>
                <th className="pb-2 text-orange-400">HDD</th>
                <th className="pb-2 text-blue-400">SSD</th>
                <th className="pb-2 text-green-400">Difference</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/10">
                <td className="py-2">Random Read (4KB)</td>
                <td className="py-2 font-mono">~0.1 MB/s</td>
                <td className="py-2 font-mono">~400 MB/s</td>
                <td className="py-2 font-mono text-green-400">4000x faster</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2">Sequential Read</td>
                <td className="py-2 font-mono">~150 MB/s</td>
                <td className="py-2 font-mono">~550 MB/s</td>
                <td className="py-2 font-mono text-green-400">3.7x faster</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2">Seek Time</td>
                <td className="py-2 font-mono">~10ms</td>
                <td className="py-2 font-mono">~0.1ms</td>
                <td className="py-2 font-mono text-green-400">100x faster</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2">IOPS (4KB Random)</td>
                <td className="py-2 font-mono">~100</td>
                <td className="py-2 font-mono">~100,000</td>
                <td className="py-2 font-mono text-green-400">1000x more</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-lg p-6 border border-orange-500/20">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" /> Why This Matters
        </h3>
        <ul className="space-y-2 text-gray-300">
          <li>• <strong>Database Performance:</strong> Random reads are critical for databases</li>
          <li>• <strong>Boot Times:</strong> OS loads thousands of small files (random reads)</li>
          <li>• <strong>Cost vs Performance:</strong> HDDs still win for bulk storage (movies, backups)</li>
          <li>• <strong>Hybrid Approach:</strong> Many systems use SSD for OS/apps, HDD for data</li>
        </ul>
      </div>
    </div>
  )
}
