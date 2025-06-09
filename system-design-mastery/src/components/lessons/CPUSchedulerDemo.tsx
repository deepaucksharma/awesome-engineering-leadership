'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Cpu } from 'lucide-react'

interface Process {
  id: number
  name: string
  cpuTime: number
  remainingTime: number
  color: string
  state: 'ready' | 'running' | 'completed'
}

export default function CPUSchedulerDemo() {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 1, name: 'Browser', cpuTime: 4, remainingTime: 4, color: 'bg-blue-500', state: 'ready' },
    { id: 2, name: 'Music Player', cpuTime: 2, remainingTime: 2, color: 'bg-green-500', state: 'ready' },
    { id: 3, name: 'Code Editor', cpuTime: 6, remainingTime: 6, color: 'bg-purple-500', state: 'ready' },
    { id: 4, name: 'Video Call', cpuTime: 3, remainingTime: 3, color: 'bg-yellow-500', state: 'ready' }
  ])
  
  const [currentProcess, setCurrentProcess] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [algorithm, setAlgorithm] = useState<'fcfs' | 'rr'>('rr')
  const [timeQuantum] = useState(2)
  const [cpuUtilization, setCpuUtilization] = useState(0)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setProcesses(prev => {
        const active = prev.find(p => p.state === 'running')
        if (!active) {
          // Find next process to run
          const ready = prev.filter(p => p.state === 'ready')
          if (ready.length === 0) {
            setIsRunning(false)
            return prev
          }
          
          const next = ready[0]
          return prev.map(p => ({
            ...p,
            state: p.id === next.id ? 'running' : p.state
          }))
        }
        
        // Update running process
        const updated = prev.map(p => {
          if (p.id === active.id) {
            const newRemaining = p.remainingTime - 1
            if (newRemaining <= 0) {
              return { ...p, remainingTime: 0, state: 'completed' }
            }
            
            // Round Robin: switch after time quantum
            if (algorithm === 'rr' && (p.cpuTime - newRemaining) % timeQuantum === 0) {
              return { ...p, remainingTime: newRemaining, state: 'ready' }
            }
            
            return { ...p, remainingTime: newRemaining }
          }
          return p
        })
        
        setCpuUtilization(prev => Math.min(100, prev + 10))
        return updated
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, algorithm, timeQuantum])

  const reset = () => {
    setProcesses([
      { id: 1, name: 'Browser', cpuTime: 4, remainingTime: 4, color: 'bg-blue-500', state: 'ready' },
      { id: 2, name: 'Music Player', cpuTime: 2, remainingTime: 2, color: 'bg-green-500', state: 'ready' },
      { id: 3, name: 'Code Editor', cpuTime: 6, remainingTime: 6, color: 'bg-purple-500', state: 'ready' },
      { id: 4, name: 'Video Call', cpuTime: 3, remainingTime: 3, color: 'bg-yellow-500', state: 'ready' }
    ])
    setIsRunning(false)
    setCpuUtilization(0)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">CPU Scheduling Visualized</h2>
        <p className="text-gray-300 text-lg">
          See how your operating system decides which program gets to run when. 
          Every process wants CPU time, but there's only one CPU!
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg flex items-center gap-2"
          >
            {isRunning ? <Pause /> : <Play />}
            {isRunning ? 'Pause' : 'Start'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2"
          >
            <RotateCcw /> Reset
          </motion.button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setAlgorithm('fcfs')}
            className={`px-4 py-2 rounded-lg transition-all ${
              algorithm === 'fcfs' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            First Come First Serve
          </button>
          <button
            onClick={() => setAlgorithm('rr')}
            className={`px-4 py-2 rounded-lg transition-all ${
              algorithm === 'rr' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Round Robin (2s)
          </button>
        </div>
      </div>

      {/* CPU Core Visualization */}
      <div className="bg-black/50 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Cpu className="w-6 h-6 text-purple-400" /> CPU Core
          </h3>
          <div className="text-sm text-gray-400">
            Utilization: <span className="text-purple-400 font-bold">{cpuUtilization}%</span>
          </div>
        </div>

        {/* Process Queue */}
        <div className="space-y-4">
          {processes.map((process) => (
            <motion.div
              key={process.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: process.state === 'running' ? 20 : 0,
                scale: process.state === 'running' ? 1.05 : 1
              }}
              className={`p-4 rounded-lg border ${
                process.state === 'running' 
                  ? 'border-purple-400 bg-purple-400/20' 
                  : process.state === 'completed'
                  ? 'border-gray-600 bg-gray-600/10 opacity-50'
                  : 'border-white/20 bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${process.color}`} />
                  <div>
                    <p className="font-semibold">{process.name}</p>
                    <p className="text-sm text-gray-400">
                      {process.state === 'running' && '🏃 Running'}
                      {process.state === 'ready' && '⏳ Waiting'}
                      {process.state === 'completed' && '✅ Completed'}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-400">CPU Time</p>
                  <p className="font-mono">
                    {process.cpuTime - process.remainingTime}s / {process.cpuTime}s
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-32 h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      className={process.color}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${((process.cpuTime - process.remainingTime) / process.cpuTime) * 100}%` 
                      }}
                      transition={{ duration: 0.5 }}
                      style={{ height: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-purple-400" /> Key Insights
        </h3>
        <ul className="space-y-2 text-gray-300">
          <li>• <strong>Context Switching:</strong> Changing processes has overhead (~1-10μs)</li>
          <li>• <strong>Time Quantum:</strong> Too small = lots of switching. Too large = poor responsiveness</li>
          <li>• <strong>Starvation:</strong> In FCFS, short tasks wait for long tasks to complete</li>
          <li>• <strong>Modern CPUs:</strong> Have multiple cores, each can run one process</li>
        </ul>
      </div>
    </div>
  )
}
