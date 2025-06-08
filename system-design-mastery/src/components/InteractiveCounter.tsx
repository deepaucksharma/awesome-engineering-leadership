'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface InteractiveCounterProps {
  label: string
  value: number
  unit: string
  description: string
  icon: ReactNode
}

export default function InteractiveCounter({
  label,
  value,
  unit,
  description,
  icon
}: InteractiveCounterProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-surface/50 backdrop-blur border border-violet-500/20 rounded-xl p-6 cursor-pointer group"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-violet-500/20 rounded-lg text-violet-400 group-hover:text-violet-300 transition-colors">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-300">{label}</h3>
      </div>
      
      <div className="mb-2">
        <span className="text-4xl font-bold text-white">{value}</span>
        <span className="text-2xl text-violet-400 ml-1">{unit}</span>
      </div>
      
      <p className="text-sm text-gray-400">{description}</p>
      
      <motion.div
        className="mt-4 h-1 bg-violet-500/20 rounded-full overflow-hidden"
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-pink-500"
          animate={{ x: '-100%' }}
          whileHover={{ x: '0%' }}
          transition={{ duration: 1 }}
        />
      </motion.div>
    </motion.div>
  )
}
