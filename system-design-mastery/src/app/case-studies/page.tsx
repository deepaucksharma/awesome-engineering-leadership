'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CreditCard, ShoppingCart, MapPin, MessageSquare, 
  Camera, Cloud, Brain, Users, ArrowRight
} from 'lucide-react'

const caseStudies = [
  {
    id: 'upi-payment-system',
    title: 'UPI Payment System',
    subtitle: 'How India processes 10B transactions/month',
    icon: <CreditCard className="w-8 h-8" />,
    metrics: ['10B+ transactions/month', '300M+ users', '<1s latency', '99.99% uptime'],
    tags: ['Distributed Systems', 'Financial Tech', 'High Availability'],
    color: 'from-green-400 to-emerald-400',
    difficulty: 'Advanced'
  },
  {
    id: 'flipkart-big-billion',
    title: "Flipkart's Big Billion Days",
    subtitle: 'Handling 100M+ users during flash sales',
    icon: <ShoppingCart className="w-8 h-8" />,
    metrics: ['1.5M orders/hour', '25M concurrent users', '50TB+ data/day', '10x traffic spike'],
    tags: ['E-commerce', 'Auto-scaling', 'Caching'],
    color: 'from-blue-400 to-cyan-400',
    difficulty: 'Advanced'
  },
  {
    id: 'swiggy-realtime',
    title: 'Swiggy/Zomato Real-time Tracking',
    subtitle: 'Geo-location at massive scale',
    icon: <MapPin className="w-8 h-8" />,
    metrics: ['500K+ delivery partners', '1M+ orders/day', 'Real-time updates', 'Multi-city scale'],
    tags: ['Geo-spatial', 'Real-time', 'Mobile'],
    color: 'from-orange-400 to-red-400',
    difficulty: 'Intermediate'
  },
  {
    id: 'whatsapp-messaging',
    title: 'WhatsApp Architecture',
    subtitle: 'Billions of messages with end-to-end encryption',
    icon: <MessageSquare className="w-8 h-8" />,
    metrics: ['100B+ messages/day', '2B+ users', 'E2E encryption', 'Minimal server storage'],
    tags: ['Messaging', 'Encryption', 'Mobile-first'],
    color: 'from-green-400 to-green-600',
    difficulty: 'Advanced'
  },
  {
    id: 'instagram-design',
    title: 'Instagram System Design',
    subtitle: 'Photo sharing at billion-user scale',
    icon: <Camera className="w-8 h-8" />,
    metrics: ['500M+ daily users', '100M+ photos/day', 'CDN optimization', 'ML feed ranking'],
    tags: ['Social Media', 'CDN', 'ML Integration'],
    color: 'from-purple-400 to-pink-400',
    difficulty: 'Intermediate'
  }
]

const additionalTopics = [
  {
    title: 'Cloud Patterns',
    icon: <Cloud className="w-6 h-6" />,
    topics: ['AWS Lambda', 'Azure Functions', 'GCP BigQuery', 'Multi-cloud strategies']
  },
  {
    title: 'ML Systems',
    icon: <Brain className="w-6 h-6" />,
    topics: ['Feature stores', 'Model serving', 'Real-time inference', 'A/B testing']
  },
  {
    title: 'Interview Prep',
    icon: <Users className="w-6 h-6" />,
    topics: ['Common pitfalls', 'Trade-off analysis', 'Communication tips', 'Mock interviews']
  }
]

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Real-World Case Studies
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Learn from systems that serve millions of Indian users daily. 
            From UPI to Flipkart, understand how massive scale is achieved.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/case-studies/${study.id}`}>
                <div className="group relative">
                  {/* Background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${study.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                  />
                  
                  <div className="relative bg-surface/80 backdrop-blur border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${study.color} text-white`}>
                        {study.icon}
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        study.difficulty === 'Advanced' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {study.difficulty}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <h2 className="text-2xl font-bold mb-2">{study.title}</h2>
                    <p className="text-gray-400 mb-4">{study.subtitle}</p>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {study.metrics.map((metric, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="text-gray-500">• </span>
                          <span className="text-gray-300">{metric}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 text-xs bg-white/5 rounded-full text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm group-hover:text-white transition-colors">
                      <span>Explore case study</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional Topics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">More Topics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalTopics.map((topic, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-surface/50 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    {topic.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{topic.title}</h3>
                </div>
                
                <ul className="space-y-2">
                  {topic.topics.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interview Tips Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-2xl p-8 border border-violet-500/30"
        >
          <h3 className="text-2xl font-bold mb-4">Interview Success Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-violet-400 mb-2">Do's</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Start with requirements clarification</li>
                <li>✓ Provide specific numbers and calculations</li>
                <li>✓ Discuss trade-offs explicitly</li>
                <li>✓ Draw clear diagrams</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Don'ts</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✗ Jump to implementation details</li>
                <li>✗ Over-engineer the solution</li>
                <li>✗ Ignore cost considerations</li>
                <li>✗ Forget about failure scenarios</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
