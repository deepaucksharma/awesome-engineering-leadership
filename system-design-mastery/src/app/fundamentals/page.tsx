'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Cpu, HardDrive, Network, Zap, Database, Server } from 'lucide-react'

const modules = [
  {
    id: 'physics',
    title: 'The Physics of Computing',
    subtitle: 'From electrons to APIs',
    icon: <Zap className="w-8 h-8" />,
    topics: [
      'Speed of light in copper vs fiber',
      'Why RAM is faster than SSD',
      'Network latency fundamentals',
      'Power consumption & heat'
    ],
    color: 'from-yellow-400 to-orange-400'
  },
  {
    id: 'storage',
    title: 'Storage: From Bits to Databases',
    subtitle: 'How data persists',
    icon: <Database className="w-8 h-8" />,
    topics: [
      'Magnetic vs SSD storage',
      'File systems & block storage',
      'B-trees & LSM trees',
      'Write amplification'
    ],
    color: 'from-blue-400 to-cyan-400'
  },
  {
    id: 'networking',
    title: 'Networking: Packets to Protocols',
    subtitle: 'How computers talk',
    icon: <Network className="w-8 h-8" />,
    topics: [
      'OSI layers explained',
      'TCP handshake visualized',
      'HTTP/2 vs HTTP/3',
      'CDN & edge computing'
    ],
    color: 'from-green-400 to-emerald-400'
  },
  {
    id: 'compute',
    title: 'Compute: Threads to Containers',
    subtitle: 'Making things happen',
    icon: <Server className="w-8 h-8" />,
    topics: [
      'CPU scheduling algorithms',
      'Context switching cost',
      'Virtual machines vs containers',
      'Serverless reality check'
    ],
    color: 'from-purple-400 to-pink-400'
  }
]

export default function FundamentalsPage() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >          <h1 className="text-5xl font-bold mb-4">
            System Design Fundamentals
          </h1>
          <p className="text-xl text-gray-400">
            Build your understanding from the ground up
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
            >
              <Link href={`/fundamentals/${module.id}`}>
                <div className="relative group">
                  {/* Background glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${module.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                  />
                  
                  <div className="relative bg-surface/80 backdrop-blur border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
                    {/* Icon with gradient */}
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${module.color} text-white mb-6`}>
                      {module.icon}
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
                    <p className="text-gray-400 mb-6">{module.subtitle}</p>
                    
                    {/* Topics preview */}
                    <div className="space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <motion.div
                          key={topicIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: hoveredModule === module.id ? 1 : 0.6,
                            x: hoveredModule === module.id ? 0 : -20
                          }}
                          transition={{ delay: topicIndex * 0.05 }}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${module.color}`} />
                          {topic}
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Progress indicator */}
                    <motion.div
                      className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${module.color}`}
                        initial={{ width: '0%' }}
                        animate={{ width: hoveredModule === module.id ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
