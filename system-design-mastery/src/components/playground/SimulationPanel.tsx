'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, AlertCircle, TrendingUp, Users } from 'lucide-react'

export default function SimulationPanel() {
  const [metrics, setMetrics] = useState({
    rps: 0,
    latency: 0,
    errorRate: 0,
    activeUsers: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        rps: Math.floor(Math.random() * 5000) + 1000,
        latency: Math.floor(Math.random() * 50) + 10,
        errorRate: Math.random() * 5,
        activeUsers: Math.floor(Math.random() * 10000) + 5000
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const metricCards = [
    {
      label: 'Requests/sec',
      value: metrics.rps.toLocaleString(),
      icon: Activity,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      label: 'Latency',
      value: `${metrics.latency}ms`,
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      label: 'Error Rate',
      value: `${metrics.errorRate.toFixed(2)}%`,
      icon: AlertCircle,
      color: metrics.errorRate > 3 ? 'text-red-400' : 'text-yellow-400',
      bgColor: metrics.errorRate > 3 ? 'bg-red-400/10' : 'bg-yellow-400/10'
    },
    {
      label: 'Active Users',
      value: metrics.activeUsers.toLocaleString(),
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    }
  ]

  return (
    <div className="w-80 bg-surface/50 backdrop-blur border-l border-white/10 p-4">
      <h2 className="text-lg font-semibold mb-4">Live Metrics</h2>
      
      <div className="space-y-4">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon
          
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border border-white/10 ${metric.bgColor}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{metric.label}</span>
                <Icon className={`w-4 h-4 ${metric.color}`} />
              </div>
              <div className={`text-2xl font-bold ${metric.color}`}>
                {metric.value}
              </div>
            </motion.div>
          )
        })}
      </div>
      
      <div className="mt-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
        <h3 className="text-sm font-semibold text-orange-400 mb-2">
          System Status
        </h3>
        <p className="text-xs text-gray-300">
          All systems operational. Database at 67% capacity.
        </p>
      </div>
    </div>
  )
}
