'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Server, Package, Layers, HardDrive, Cpu, MemoryStick } from 'lucide-react'

export default function ContainerVsVMDemo() {
  const [view, setView] = useState<'vm' | 'container'>('vm')
  
  const vmLayers = [
    { name: 'App 1', color: 'bg-blue-500', size: 'h-16' },
    { name: 'Guest OS', color: 'bg-orange-500', size: 'h-20' },
    { name: 'App 2', color: 'bg-green-500', size: 'h-16' },
    { name: 'Guest OS', color: 'bg-orange-500', size: 'h-20' },
    { name: 'Hypervisor', color: 'bg-purple-500', size: 'h-24' },
    { name: 'Host OS', color: 'bg-red-500', size: 'h-20' },
    { name: 'Hardware', color: 'bg-gray-600', size: 'h-16' }
  ]
  
  const containerLayers = [
    { name: 'App 1', color: 'bg-blue-500', size: 'h-16' },
    { name: 'App 2', color: 'bg-green-500', size: 'h-16' },
    { name: 'App 3', color: 'bg-yellow-500', size: 'h-16' },
    { name: 'Container Engine', color: 'bg-purple-500', size: 'h-20' },
    { name: 'Host OS', color: 'bg-red-500', size: 'h-20' },
    { name: 'Hardware', color: 'bg-gray-600', size: 'h-16' }
  ]

  const metrics = {
    vm: {
      startupTime: '30-60s',
      size: '1-10 GB',
      overhead: 'High',
      isolation: 'Complete',
      density: '10s of VMs'
    },
    container: {
      startupTime: '< 1s',
      size: '10-100 MB',
      overhead: 'Minimal',
      isolation: 'Process-level',
      density: '1000s of containers'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">Containers vs Virtual Machines</h2>
        <p className="text-gray-300 text-lg">
          Understanding the fundamental difference between containers and VMs. 
          It's all about what gets virtualized.
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-4 p-1 bg-white/10 rounded-lg w-fit mx-auto">
        <button
          onClick={() => setView('vm')}
          className={`px-6 py-3 rounded-md transition-all font-semibold ${
            view === 'vm' 
              ? 'bg-orange-600 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Virtual Machines
        </button>
        <button
          onClick={() => setView('container')}
          className={`px-6 py-3 rounded-md transition-all font-semibold ${
            view === 'container' 
              ? 'bg-purple-600 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Containers
        </button>
      </div>

      {/* Architecture Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Stack Visualization */}
        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5" />
            {view === 'vm' ? 'VM Architecture' : 'Container Architecture'}
          </h3>
          
          <div className="space-y-2">
            {(view === 'vm' ? vmLayers : containerLayers).map((layer, index) => (
              <motion.div
                key={`${view}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${layer.color} ${layer.size} rounded-lg flex items-center justify-center font-semibold text-white`}
              >
                {layer.name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            {view === 'vm' ? 'VM Characteristics' : 'Container Characteristics'}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Startup Time</span>
              <span className="font-mono text-lg">
                {metrics[view].startupTime}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Typical Size</span>
              <span className="font-mono text-lg">
                {metrics[view].size}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Resource Overhead</span>
              <span className="font-mono text-lg">
                {metrics[view].overhead}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Isolation Level</span>
              <span className="font-mono text-lg">
                {metrics[view].isolation}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Density per Host</span>
              <span className="font-mono text-lg">
                {metrics[view].density}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Usage Comparison */}
      <div className="bg-black/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Resource Usage Comparison</h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Cpu className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <p className="text-sm text-gray-400">CPU Overhead</p>
            <div className="mt-2 h-20 bg-white/10 rounded-lg relative overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-blue-400"
                initial={{ height: 0 }}
                animate={{ height: view === 'vm' ? '60%' : '10%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="mt-1 text-sm font-mono">
              {view === 'vm' ? '5-10%' : '< 1%'}
            </p>
          </div>
          
          <div className="text-center">
            <MemoryStick className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <p className="text-sm text-gray-400">Memory Usage</p>
            <div className="mt-2 h-20 bg-white/10 rounded-lg relative overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-green-400"
                initial={{ height: 0 }}
                animate={{ height: view === 'vm' ? '80%' : '20%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="mt-1 text-sm font-mono">
              {view === 'vm' ? '1-4 GB' : '100 MB'}
            </p>
          </div>
          
          <div className="text-center">
            <HardDrive className="w-8 h-8 mx-auto mb-2 text-orange-400" />
            <p className="text-sm text-gray-400">Disk Space</p>
            <div className="mt-2 h-20 bg-white/10 rounded-lg relative overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-orange-400"
                initial={{ height: 0 }}
                animate={{ height: view === 'vm' ? '90%' : '15%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="mt-1 text-sm font-mono">
              {view === 'vm' ? '10+ GB' : '< 1 GB'}
            </p>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-lg p-6 border border-orange-500/20">
        <h3 className="text-xl font-semibold mb-3">When to Use What?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-orange-400 mb-2">Use VMs when:</h4>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Need complete OS isolation</li>
              <li>• Running different OS types</li>
              <li>• Security is paramount</li>
              <li>• Legacy application support</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-400 mb-2">Use Containers when:</h4>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Need fast startup times</li>
              <li>• Deploying microservices</li>
              <li>• Maximizing resource efficiency</li>
              <li>• Consistent environments needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
