'use client'

import { useState } from 'react'
import SystemCanvas from '@/components/playground/SystemCanvas'
import ComponentPalette from '@/components/playground/ComponentPalette'
import SimulationPanel from '@/components/playground/SimulationPanel'
import { motion } from 'framer-motion'
import { Play, Settings, Save } from 'lucide-react'

export default function PlaygroundPage() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-surface/50 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">System Design Playground</h1>
            <p className="text-sm text-gray-400">
              Drag components to design. Connect them. Simulate traffic.
            </p>
          </div>
          
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" /> Settings
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" /> Save Design
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSimulating(!isSimulating)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isSimulating 
                  ? 'bg-red-600 hover:bg-red-500 text-white' 
                  : 'bg-green-600 hover:bg-green-500 text-white glow'
              }`}
            >
              <Play className="w-4 h-4" /> 
              {isSimulating ? 'Stop' : 'Start'} Simulation
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Component Palette */}
        <ComponentPalette />
        
        {/* Canvas */}
        <div className="flex-1 relative">
          <SystemCanvas isSimulating={isSimulating} />
        </div>
        
        {/* Simulation Panel */}
        {isSimulating && <SimulationPanel />}
      </div>
    </div>
  )
}
