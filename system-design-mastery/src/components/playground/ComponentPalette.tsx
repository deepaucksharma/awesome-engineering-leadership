'use client'

import { Server, Database, Cloud, Shield, Users, Zap } from 'lucide-react'

const components = [
  { id: 'server', name: 'Server', icon: Server, color: 'text-blue-400' },
  { id: 'database', name: 'Database', icon: Database, color: 'text-green-400' },
  { id: 'loadbalancer', name: 'Load Balancer', icon: Shield, color: 'text-purple-400' },
  { id: 'cdn', name: 'CDN', icon: Cloud, color: 'text-orange-400' },
  { id: 'users', name: 'Users', icon: Users, color: 'text-pink-400' },
  { id: 'queue', name: 'Message Queue', icon: Zap, color: 'text-yellow-400' },
]

export default function ComponentPalette() {
  const handleDragStart = (e: React.DragEvent, component: typeof components[0]) => {
    e.dataTransfer.setData('component', JSON.stringify(component))
  }

  return (
    <div className="w-64 bg-surface/50 backdrop-blur border-r border-white/10 p-4">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      
      <div className="space-y-2">
        {components.map((component) => {
          const Icon = component.icon
          
          return (
            <div
              key={component.id}
              draggable
              onDragStart={(e) => handleDragStart(e, component)}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-lg cursor-move transition-colors hover:scale-105 active:scale-95"
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-6 h-6 ${component.color}`} />
                <span className="text-sm font-medium">{component.name}</span>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-8 p-4 bg-violet-500/10 rounded-lg border border-violet-500/20">
        <p className="text-sm text-gray-300">
          <strong>Tip:</strong> Drag components onto the canvas and connect them by clicking.
        </p>
      </div>
    </div>
  )
}
