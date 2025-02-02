"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreatGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Create globe with red stroke
    const geometry = new THREE.SphereGeometry(3.5, 50, 50)
    const material = new THREE.MeshBasicMaterial({
      color: '#CE203C',
      wireframe: true,
      transparent: true,
      opacity: 0.3
    })
    const globe = new THREE.Mesh(geometry, material)
    scene.add(globe)

    // Add particles with noisy shell distribution
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000
    const posArray = new Float32Array(particlesCount * 3)
    
    for(let i = 0; i < particlesCount; i++) {
      // Generate spherical coordinates with variable radius
      const baseRadius = 4.5 // Base radius
      const noise = (Math.random() - 0.5) * 0.6 // Random noise between -0.25 and 0.25
      const radius = baseRadius + noise
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      
      // Convert to Cartesian coordinates
      posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      posArray[i * 3 + 2] = radius * Math.cos(phi)
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: '#000000'
    })
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    camera.position.z = 10

    const animate = () => {
      requestAnimationFrame(animate)
      globe.rotation.y += 0.002
      particlesMesh.rotation.y += 0.001
      renderer.render(scene, camera)
    }
    animate()

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

  return <div ref={containerRef} className="absolute inset-0" />
} 