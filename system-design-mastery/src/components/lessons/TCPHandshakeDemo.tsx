'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Server, ArrowRight, Check, X } from 'lucide-react'

interface Packet {
  type: 'SYN' | 'SYN-ACK' | 'ACK' | 'DATA' | 'FIN'
  from: 'client' | 'server'
  seq?: number
  ack?: number
}

export default function TCPHandshakeDemo() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [packets, setPackets] = useState<Packet[]>([])
  const [connectionState, setConnectionState] = useState<'closed' | 'connecting' | 'established'>('closed')

  const steps = [
    { packet: { type: 'SYN', from: 'client', seq: 1000 }, description: 'Client: "Hey, want to connect?" (SYN)' },
    { packet: { type: 'SYN-ACK', from: 'server', seq: 4000, ack: 1001 }, description: 'Server: "Sure, I acknowledge" (SYN-ACK)' },
    { packet: { type: 'ACK', from: 'client', ack: 4001 }, description: 'Client: "Great, connection established!" (ACK)' }
  ]

  useEffect(() => {
    if (!isConnecting || currentStep >= steps.length) return

    const timer = setTimeout(() => {
      setPackets(prev => [...prev, steps[currentStep].packet as Packet])
      setCurrentStep(prev => prev + 1)
      
      if (currentStep === steps.length - 1) {
        setConnectionState('established')
        setIsConnecting(false)
      } else if (currentStep === 0) {
        setConnectionState('connecting')
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [isConnecting, currentStep])

  const startHandshake = () => {
    setIsConnecting(true)
    setCurrentStep(0)
    setPackets([])
    setConnectionState('connecting')
  }

  const reset = () => {
    setIsConnecting(false)
    setCurrentStep(0)
    setPackets([])
    setConnectionState('closed')
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">TCP Three-Way Handshake</h2>
        <p className="text-gray-300 text-lg">
          Before any data can be sent, TCP establishes a reliable connection 
          using a three-way handshake. This ensures both sides are ready.
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={startHandshake}
          disabled={isConnecting || connectionState === 'established'}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            isConnecting || connectionState === 'established'
              ? 'bg-white/10 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-500 text-white'
          }`}
        >
          Start Handshake
        </button>
        
        <button
          onClick={reset}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
        >
          Reset
        </button>
        
        <div className={`px-4 py-2 rounded-lg ${
          connectionState === 'established' ? 'bg-green-600/20 text-green-400' :
          connectionState === 'connecting' ? 'bg-yellow-600/20 text-yellow-400' :
          'bg-red-600/20 text-red-400'
        }`}>
          Status: {connectionState.toUpperCase()}
        </div>
      </div>

      {/* Visual Demonstration */}
      <div className="bg-black/50 rounded-xl p-8">
        <div className="flex items-center justify-between">
          {/* Client */}
          <div className="text-center">
            <Monitor className="w-16 h-16 mx-auto mb-2 text-blue-400" />
            <h3 className="font-semibold">Client</h3>
            <p className="text-sm text-gray-400">Your Computer</p>
          </div>
          
          {/* Connection Visualization */}
          <div className="flex-1 mx-8 relative h-32">
            {packets.map((packet, index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 transform -translate-y-1/2"
                initial={{ 
                  left: packet.from === 'client' ? '0%' : '100%',
                  opacity: 0 
                }}
                animate={{ 
                  left: packet.from === 'client' ? '100%' : '0%',
                  opacity: 1 
                }}
                transition={{ duration: 1 }}
              >
                <div className={`px-3 py-1 rounded-lg text-sm font-mono ${
                  packet.type === 'SYN' ? 'bg-blue-600' :
                  packet.type === 'SYN-ACK' ? 'bg-orange-600' :
                  'bg-green-600'
                }`}>
                  {packet.type}
                  {packet.seq && ` seq=${packet.seq}`}
                  {packet.ack && ` ack=${packet.ack}`}
                </div>
              </motion.div>
            ))}
            
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20 -translate-y-1/2" />
          </div>
          
          {/* Server */}
          <div className="text-center">
            <Server className="w-16 h-16 mx-auto mb-2 text-green-400" />
            <h3 className="font-semibold">Server</h3>
            <p className="text-sm text-gray-400">Web Server</p>
          </div>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="bg-black/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Handshake Steps</h3>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-lg border ${
                index < currentStep 
                  ? 'border-green-400/50 bg-green-400/10' 
                  : index === currentStep && isConnecting
                  ? 'border-yellow-400/50 bg-yellow-400/10'
                  : 'border-white/10 bg-white/5'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex-shrink-0">
                {index < currentStep ? (
                  <Check className="w-6 h-6 text-green-400" />
                ) : index === currentStep && isConnecting ? (
                  <motion.div
                    className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <div className="w-6 h-6 border-2 border-white/20 rounded-full" />
                )}
              </div>
              
              <div className="flex-1">
                <p className="font-semibold">{step.description}</p>
                {step.packet.seq && (
                  <p className="text-sm text-gray-400 mt-1">
                    Sequence: {step.packet.seq}
                    {step.packet.ack && `, Acknowledge: ${step.packet.ack}`}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3">Sequence Numbers</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Each side picks a random starting number</li>
            <li>• Prevents old packets from being accepted</li>
            <li>• ACK = received sequence + 1</li>
            <li>• Tracks bytes sent/received</li>
          </ul>
        </div>
        
        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3">Why Three Steps?</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Both sides confirm ability to send</li>
            <li>• Both sides confirm ability to receive</li>
            <li>• Synchronizes sequence numbers</li>
            <li>• Minimum steps for reliable setup</li>
          </ul>
        </div>
      </div>

      {/* Real World Impact */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
        <h3 className="text-xl font-semibold mb-3">Real-World Impact</h3>
        <ul className="space-y-2 text-gray-300">
          <li>• <strong>Latency Cost:</strong> 1.5 RTT before any data transfer</li>
          <li>• <strong>TCP Fast Open:</strong> Modern optimization to send data with SYN</li>
          <li>• <strong>HTTP/3 Uses QUIC:</strong> 0-RTT connection establishment</li>
          <li>• <strong>Mobile Networks:</strong> High latency makes handshake costly (100-200ms)</li>
        </ul>
      </div>
    </div>
  )
}
