'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface SystemComponent {
  id: string
  type: string
  name: string
  x: number
  y: number
  color: string
}

interface Connection {
  from: string
  to: string
}

interface SystemCanvasProps {
  isSimulating: boolean
}

export default function SystemCanvas({ isSimulating }: SystemCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [components, setComponents] = useState<SystemComponent[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [connecting, setConnecting] = useState<string | null>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const data = JSON.parse(e.dataTransfer.getData('component'))
    const rect = canvasRef.current?.getBoundingClientRect()
    
    if (rect) {
      const newComponent: SystemComponent = {
        id: `${data.id}-${Date.now()}`,
        type: data.id,
        name: data.name,
        x: e.clientX - rect.left - 50,
        y: e.clientY - rect.top - 30,
        color: data.color
      }
      
      setComponents([...components, newComponent])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleComponentClick = (componentId: string) => {
    if (connecting) {
      if (connecting !== componentId) {
        setConnections([...connections, { from: connecting, to: componentId }])
      }
      setConnecting(null)
    } else {
      setConnecting(componentId)
      setSelectedComponent(componentId)
    }
  }

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full bg-grid-pattern"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Connections */}
      <svg className="absolute inset-0 pointer-events-none">
        {connections.map((conn, index) => {
          const fromComp = components.find(c => c.id === conn.from)
          const toComp = components.find(c => c.id === conn.to)
          
          if (!fromComp || !toComp) return null
          
          return (
            <motion.line
              key={index}
              x1={fromComp.x + 50}
              y1={fromComp.y + 30}
              x2={toComp.x + 50}
              y2={toComp.y + 30}
              stroke="rgb(139, 92, 246)"
              strokeWidth="2"
              strokeDasharray={isSimulating ? "5,5" : "0"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            >
              {isSimulating && (
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;10"
                  dur="1s"
                  repeatCount="indefinite"
                />
              )}
            </motion.line>
          )
        })}
      </svg>

      {/* Components */}
      {components.map((component) => (
        <motion.div
          key={component.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute w-24 h-16 bg-surface/90 border-2 rounded-lg cursor-pointer flex items-center justify-center ${
            selectedComponent === component.id
              ? 'border-violet-400 shadow-lg shadow-violet-400/50'
              : 'border-white/20 hover:border-white/40'
          }`}
          style={{ left: component.x, top: component.y }}
          onClick={() => handleComponentClick(component.id)}
          drag
          dragMomentum={false}
          onDragEnd={(e, info) => {
            setComponents(components.map(c => 
              c.id === component.id 
                ? { ...c, x: c.x + info.offset.x, y: c.y + info.offset.y }
                : c
            ))
          }}
        >
          <div className="text-center">
            <div className={`text-xs font-semibold ${component.color}`}>
              {component.name}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Instructions */}
      {components.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <p className="text-xl mb-2">Drag components here to start designing</p>
            <p className="text-sm">Click components to connect them</p>
          </div>
        </div>
      )}

      {/* Connection Mode Indicator */}
      {connecting && (
        <div className="absolute top-4 right-4 px-4 py-2 bg-violet-600/20 border border-violet-400 rounded-lg">
          <p className="text-sm text-violet-400">
            Click another component to connect
          </p>
        </div>
      )}
    </div>
  )
}
