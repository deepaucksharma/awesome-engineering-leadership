'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Trash2, Database } from 'lucide-react'

interface BTreeNode {
  keys: number[]
  children: BTreeNode[]
  isLeaf: boolean
}

export default function BTreeVisualization() {
  const [inputValue, setInputValue] = useState('')
  const [searchValue, setSearchValue] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  
  // Simple B-tree with sample data
  const [tree] = useState<BTreeNode>({
    keys: [50],
    isLeaf: false,
    children: [
      {
        keys: [10, 20, 30],
        isLeaf: true,
        children: []
      },
      {
        keys: [60, 70, 80, 90],
        isLeaf: true,
        children: []
      }
    ]
  })

  const handleSearch = () => {
    const value = parseInt(inputValue)
    if (isNaN(value)) {
      setMessage('Please enter a valid number')
      return
    }
    
    setSearchValue(value)
    setMessage(`Searching for ${value}...`)
    
    // Simulate search delay
    setTimeout(() => {
      // Simple search logic for demo
      let found = false
      if (value <= 50) {
        found = tree.children[0].keys.includes(value)
      } else {
        found = tree.children[1].keys.includes(value)
      }
      
      setMessage(found ? `Found ${value}!` : `${value} not found`)
      setTimeout(() => setSearchValue(null), 2000)
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">B-Tree: The Database Index</h2>
        <p className="text-gray-300 text-lg">
          B-Trees keep data sorted and searches fast. With a branching factor of 100, 
          a tree of height 3 can store 1 million records!
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter number"
          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400"
        />
        
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-2"
        >
          <Search className="w-4 h-4" /> Search
        </button>
        
        <button
          disabled
          className="px-4 py-2 bg-white/10 rounded-lg flex items-center gap-2 opacity-50 cursor-not-allowed"
        >
          <Plus className="w-4 h-4" /> Insert
        </button>
        
        <button
          disabled
          className="px-4 py-2 bg-white/10 rounded-lg flex items-center gap-2 opacity-50 cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-lg font-semibold text-blue-400"
        >
          {message}
        </motion.div>
      )}

      {/* B-Tree Visualization */}
      <div className="bg-black/50 rounded-xl p-8">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-400" /> B-Tree Structure (Order 5)
        </h3>
        
        <div className="flex flex-col items-center space-y-8">
          {/* Root Node */}
          <motion.div
            className={`px-6 py-4 rounded-lg border-2 ${
              searchValue && searchValue > 30 && searchValue <= 90 
                ? 'border-blue-400 bg-blue-400/20' 
                : 'border-white/20 bg-white/10'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-mono font-bold">50</span>
            </div>
          </motion.div>
          
          {/* Connectors */}
          <div className="flex items-center gap-32">
            <div className="w-px h-12 bg-white/20" />
            <div className="w-px h-12 bg-white/20" />
          </div>
          
          {/* Child Nodes */}
          <div className="flex gap-32">
            {/* Left Child */}
            <motion.div
              className={`px-4 py-3 rounded-lg border-2 ${
                searchValue && searchValue <= 30 
                  ? 'border-blue-400 bg-blue-400/20' 
                  : 'border-white/20 bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                {tree.children[0].keys.map((key, idx) => (
                  <span
                    key={idx}
                    className={`text-xl font-mono ${
                      searchValue === key ? 'text-blue-400 font-bold' : ''
                    }`}
                  >
                    {key}
                  </span>
                ))}
              </div>
            </motion.div>
            
            {/* Right Child */}
            <motion.div
              className={`px-4 py-3 rounded-lg border-2 ${
                searchValue && searchValue > 50 && searchValue <= 90 
                  ? 'border-blue-400 bg-blue-400/20' 
                  : 'border-white/20 bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                {tree.children[1].keys.map((key, idx) => (
                  <span
                    key={idx}
                    className={`text-xl font-mono ${
                      searchValue === key ? 'text-blue-400 font-bold' : ''
                    }`}
                  >
                    {key}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3">Search Algorithm</h3>
          <ol className="space-y-2 text-sm text-gray-300">
            <li>1. Start at root node</li>
            <li>2. Compare search value with keys</li>
            <li>3. If found, return success</li>
            <li>4. If not, go to appropriate child</li>
            <li>5. Repeat until found or leaf reached</li>
          </ol>
        </div>
        
        <div className="bg-black/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3">Why B-Trees?</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Always balanced (O(log n) operations)</li>
            <li>• Minimizes disk reads</li>
            <li>• Great for range queries</li>
            <li>• Efficient for both reads and writes</li>
            <li>• Used in virtually all databases</li>
          </ul>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-blue-500/20">
        <h3 className="text-xl font-semibold mb-3">Real-World Impact</h3>
        <ul className="space-y-2 text-gray-300">
          <li>• <strong>MySQL InnoDB:</strong> Uses B+ trees for all indexes</li>
          <li>• <strong>PostgreSQL:</strong> Default index type is B-tree</li>
          <li>• <strong>File Systems:</strong> NTFS, ext4, APFS all use B-trees</li>
          <li>• <strong>Performance:</strong> Can find any record among billions in ~3-4 disk reads</li>
        </ul>
      </div>
    </div>
  )
}
