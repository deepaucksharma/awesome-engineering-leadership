'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function NetworkVisualization() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 50

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create nodes
    const nodeGeometry = new THREE.SphereGeometry(0.5, 16, 16)
    const nodeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.8
    })

    const nodes: THREE.Mesh[] = []
    const nodeCount = 50

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
      node.position.x = (Math.random() - 0.5) * 80
      node.position.y = (Math.random() - 0.5) * 40
      node.position.z = (Math.random() - 0.5) * 40
      nodes.push(node)
      scene.add(node)
    }

    // Create connections
    const connectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0x8b5cf6,
      opacity: 0.3,
      transparent: true 
    })

    const connections: THREE.Line[] = []
    
    for (let i = 0; i < nodeCount; i++) {
      const connectionsPerNode = Math.floor(Math.random() * 3) + 1
      
      for (let j = 0; j < connectionsPerNode; j++) {
        const targetIndex = Math.floor(Math.random() * nodeCount)
        if (targetIndex !== i) {
          const points = []
          points.push(nodes[i].position)
          points.push(nodes[targetIndex].position)
          
          const geometry = new THREE.BufferGeometry().setFromPoints(points)
          const line = new THREE.Line(geometry, connectionMaterial)
          connections.push(line)
          scene.add(line)
        }
      }
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate nodes
      nodes.forEach((node, i) => {
        node.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01
        node.rotation.x += 0.01
        node.rotation.y += 0.01
      })

      // Pulse effect
      const pulse = Math.sin(Date.now() * 0.002) * 0.3 + 0.7
      nodeMaterial.opacity = pulse

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 opacity-30"
    />
  )
}
