'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CPUSchedulerDemo from '@/components/lessons/CPUSchedulerDemo'
import ContainerVsVMDemo from '@/components/lessons/ContainerVsVMDemo'
import { ArrowLeft, ArrowRight, Cpu } from 'lucide-react'
import Link from 'next/link'

const lessons = [
  {
    title: 'CPU Scheduling: How Computers Juggle Tasks',
    content: CPUSchedulerDemo,
    description: 'Visualize how your CPU manages multiple processes'
  },
  {
    title: 'Containers vs VMs: The Real Difference',
    content: ContainerVsVMDemo,
    description: 'Understand virtualization from the ground up'
  }
]

export default function ComputeModule() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const CurrentContent = lessons[currentLesson].content

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/fundamentals">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft /> Back to Fundamentals
            </motion.button>
          </Link>
          
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-purple-400" />
            <span className="text-sm text-gray-400">Compute: Threads to Containers</span>
          </div>
        </div>

        {/* Lesson Navigation */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            {lessons.map((lesson, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentLesson(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 p-4 rounded-lg border transition-all ${
                  currentLesson === index
                    ? 'border-purple-400 bg-purple-400/10 text-white'
                    : 'border-white/10 hover:border-white/20 text-gray-400'
                }`}
              >                <div>
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <p className="text-sm mt-1">{lesson.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Lesson Content */}
        <motion.div
          key={currentLesson}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface/50 backdrop-blur border border-white/10 rounded-2xl p-8"
        >
          <CurrentContent />
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
            disabled={currentLesson === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              currentLesson === 0
                ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <ArrowLeft /> Previous
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))}
            disabled={currentLesson === lessons.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              currentLesson === lessons.length - 1
                ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-violet-600 hover:bg-violet-500 text-white glow'
            }`}
          >
            Next <ArrowRight />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
