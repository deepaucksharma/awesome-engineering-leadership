'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Zap, Gauge } from 'lucide-react'

interface HTTPVersion {
  version: string
  year: number
  features: string[]
  performance: {
    connections: number
    multiplexing: boolean
    serverPush: boolean
    headerCompression: boolean
  }
}

export default function HTTPEvolutionDemo() {
  const [selectedVersion, setSelectedVersion] = useState<string>('HTTP/1.0')
  
  const versions: Record<string, HTTPVersion> = {
    'HTTP/1.0': {
      version: 'HTTP/1.0',
      year: 1996,
      features: [
        'One request per connection',
        'Connection closes after response',
        'No persistent connections',
        'Simple but inefficient'
      ],
      performance: {
        connections: 1,
        multiplexing: false,
        serverPush: false,
        headerCompression: false
      }
    },
    'HTTP/1.1': {
      version: 'HTTP/1.1',
      year: 1997,
      features: [
        'Persistent connections (Keep-Alive)',
        'Pipelining (rarely used)',
        'Chunked transfer encoding',
        'Better caching headers'
      ],
      performance: {
        connections: 6,
        multiplexing: false,
        serverPush: false,
        headerCompression: false
      }
    },
    'HTTP/2': {
      version: 'HTTP/2',
      year: 2015,
      features: [
        'Binary protocol (not text)',
        'Multiplexing over single connection',
        'Server push capability',
        'Header compression (HPACK)'
      ],
      performance: {
        connections: 1,
        multiplexing: true,
        serverPush: true,
        headerCompression: true
      }
    },
    'HTTP/3': {
      version: 'HTTP/3',
      year: 2022,
      features: [
        'Built on QUIC (not TCP)',
        '0-RTT connection establishment',
        'Better mobile performance',
        'No head-of-line blocking'
      ],
      performance: {
        connections: 1,
        multiplexing: true,
        serverPush: true,
        headerCompression: true
      }
    }
  }

  const currentVersion = versions[selectedVersion]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">HTTP Evolution: Getting Faster</h2>
        <p className="text-gray-300 text-lg">
          From simple text protocol to binary multiplexing. 
          Each version solved the bottlenecks of the previous one.
        </p>
      </div>

      {/* Version Selector */}
      <div className="flex gap-4 flex-wrap">
        {Object.keys(versions).map((version) => (
          <button
            key={version}
            onClick={() => setSelectedVersion(version)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedVersion === version
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {version}
            <span className="block text-xs mt-1 opacity-70">
              {versions[version].year}
            </span>
          </button>
        ))}
      </div>

      {/* Performance Visualization */}
      <div className="bg-black/50 rounded-xl p-8">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Gauge className="w-6 h-6 text-green-400" /> Performance Characteristics
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {currentVersion.performance.connections}
            </div>
            <p className="text-sm text-gray-400 mt-1">Connections</p>
          </div>
          
          <div className="text-center">
            <div className={`text-3xl font-bold ${
              currentVersion.performance.multiplexing ? 'text-green-400' : 'text-red-400'
            }`}>
              {currentVersion.performance.multiplexing ? '✓' : '✗'}
            </div>
            <p className="text-sm text-gray-400 mt-1">Multiplexing</p>
          </div>
          
          <div className="text-center">
            <div className={`text-3xl font-bold ${
              currentVersion.performance.serverPush ? 'text-green-400' : 'text-red-400'
            }`}>
              {currentVersion.performance.serverPush ? '✓' : '✗'}
            </div>
            <p className="text-sm text-gray-400 mt-1">Server Push</p>
          </div>
          
          <div className="text-center">
            <div className={`text-3xl font-bold ${
              currentVersion.performance.headerCompression ? 'text-green-400' : 'text-red-400'
            }`}>
              {currentVersion.performance.headerCompression ? '✓' : '✗'}
            </div>
            <p className="text-sm text-gray-400 mt-1">Header Compression</p>
          </div>
        </div>
      </div>

      {/* Feature List */}
      <div className="bg-black/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
        <ul className="space-y-3">
          {currentVersion.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <Zap className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Visual Comparison */}
      <div className="bg-black/50 rounded-xl p-8">
        <h3 className="text-xl font-semibold mb-6">Request Flow Comparison</h3>
        
        <div className="space-y-8">
          {/* HTTP/1.0 & 1.1 */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-orange-400">
              {selectedVersion === 'HTTP/1.0' || selectedVersion === 'HTTP/1.1' ? selectedVersion : 'HTTP/1.x'}
            </h4>
            <div className="flex items-center gap-4">
              <Globe className="w-8 h-8 text-blue-400" />
              <div className="flex-1">
                {[...Array(selectedVersion === 'HTTP/1.0' ? 3 : 1)].map((_, i) => (
                  <div key={i} className="mb-2">
                    <div className="h-2 bg-orange-500 rounded mb-1" style={{ width: '100%' }} />
                    <div className="h-2 bg-blue-500 rounded" style={{ width: '100%' }} />
                  </div>
                ))}
              </div>
              <Server className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {selectedVersion === 'HTTP/1.0' 
                ? 'New connection for each request' 
                : 'Sequential requests on same connection'}
            </p>
          </div>
          
          {/* HTTP/2 & 3 */}
          {(selectedVersion === 'HTTP/2' || selectedVersion === 'HTTP/3') && (
            <div>
              <h4 className="text-lg font-semibold mb-3 text-green-400">{selectedVersion}</h4>
              <div className="flex items-center gap-4">
                <Globe className="w-8 h-8 text-blue-400" />
                <div className="flex-1 relative h-16">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded"
                      style={{
                        top: `${i * 12}px`,
                        width: `${80 + Math.random() * 20}%`
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${80 + Math.random() * 20}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  ))}
                </div>
                <Server className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Parallel requests on single connection
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Real World Impact */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
        <h3 className="text-xl font-semibold mb-3">Page Load Time Impact</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>HTTP/1.0 (multiple connections)</span>
            <span className="font-mono text-red-400">~3.2s</span>
          </div>
          <div className="flex items-center justify-between">
            <span>HTTP/1.1 (persistent connections)</span>
            <span className="font-mono text-orange-400">~2.4s</span>
          </div>
          <div className="flex items-center justify-between">
            <span>HTTP/2 (multiplexing)</span>
            <span className="font-mono text-yellow-400">~1.2s</span>
          </div>
          <div className="flex items-center justify-between">
            <span>HTTP/3 (QUIC, 0-RTT)</span>
            <span className="font-mono text-green-400">~0.8s</span>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          * Times for typical website with 100+ resources over 150ms latency connection
        </p>
      </div>
    </div>
  )
}

// Add Server icon import at the top
import { Server } from 'lucide-react'
