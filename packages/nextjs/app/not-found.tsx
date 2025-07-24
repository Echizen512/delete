"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // High DPI support
    const dpr = window.devicePixelRatio || 1

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
    }

    setCanvasSize()

    const getDisplaySize = () => ({
      width: canvas.getBoundingClientRect().width,
      height: canvas.getBoundingClientRect().height,
    })

    // Glitch particles for 404 effect
    const glitchParticles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      glitchOffset: number
      type: "square" | "line" | "dot"
    }> = []

    const createGlitchParticles = () => {
      const { width, height } = getDisplaySize()
      glitchParticles.length = 0

      for (let i = 0; i < 100; i++) {
        glitchParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 8 + 2,
          opacity: Math.random() * 0.8 + 0.2,
          color: Math.random() > 0.5 ? "255, 0, 100" : "0, 255, 255",
          glitchOffset: Math.random() * 10,
          type: Math.random() > 0.6 ? "square" : Math.random() > 0.3 ? "line" : "dot",
        })
      }
    }

    createGlitchParticles()

    // Glitch lines for digital corruption effect
    const glitchLines: Array<{
      y: number
      width: number
      height: number
      opacity: number
      color: string
      speed: number
    }> = []

    const createGlitchLines = () => {
      const { width, height } = getDisplaySize()
      glitchLines.length = 0

      for (let i = 0; i < 15; i++) {
        glitchLines.push({
          y: Math.random() * height,
          width: Math.random() * width * 0.8 + width * 0.2,
          height: Math.random() * 4 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: Math.random() > 0.5 ? "255, 0, 100" : "0, 255, 255",
          speed: Math.random() * 2 + 0.5,
        })
      }
    }

    createGlitchLines()

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.016
      const { width, height } = getDisplaySize()

      // Clear with dark background
      ctx.fillStyle = "rgb(5, 5, 15)"
      ctx.fillRect(0, 0, width, height)

      // Add digital noise background
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const opacity = Math.random() * 0.1
        ctx.fillStyle = `rgba(0, 255, 255, ${opacity})`
        ctx.fillRect(x, y, 1, 1)
      }

      // Draw glitch grid
      ctx.strokeStyle = "rgba(255, 0, 100, 0.1)"
      ctx.lineWidth = 0.5
      const gridSize = 40

      for (let x = 0; x <= width; x += gridSize) {
        if (Math.random() > 0.7) {
          // Random glitch offset
          const offset = (Math.random() - 0.5) * 10
          ctx.beginPath()
          ctx.moveTo(x + offset, 0)
          ctx.lineTo(x + offset, height)
          ctx.stroke()
        }
      }

      for (let y = 0; y <= height; y += gridSize) {
        if (Math.random() > 0.7) {
          const offset = (Math.random() - 0.5) * 10
          ctx.beginPath()
          ctx.moveTo(0, y + offset)
          ctx.lineTo(width, y + offset)
          ctx.stroke()
        }
      }

      // Update and draw glitch particles
      glitchParticles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.glitchOffset = Math.sin(time * 10) * 5

        // Boundary wrapping
        if (particle.x < -20) particle.x = width + 20
        if (particle.x > width + 20) particle.x = -20
        if (particle.y < -20) particle.y = height + 20
        if (particle.y > height + 20) particle.y = -20

        ctx.save()

        if (particle.type === "square") {
          // Glitchy squares
          ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`
          ctx.fillRect(particle.x + particle.glitchOffset, particle.y, particle.size, particle.size)

          // Add glitch duplicate
          if (Math.random() > 0.8) {
            ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity * 0.5})`
            ctx.fillRect(particle.x + particle.glitchOffset + 3, particle.y + 2, particle.size, particle.size)
          }
        } else if (particle.type === "line") {
          // Glitch lines
          ctx.strokeStyle = `rgba(${particle.color}, ${particle.opacity})`
          ctx.lineWidth = particle.size * 0.3
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particle.x + particle.size * 3, particle.y + particle.glitchOffset)
          ctx.stroke()
        } else {
          // Glowing dots
          const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size)
          gradient.addColorStop(0, `rgba(${particle.color}, ${particle.opacity})`)
          gradient.addColorStop(1, `rgba(${particle.color}, 0)`)

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(particle.x + particle.glitchOffset, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })

      // Draw glitch lines (horizontal corruption)
      glitchLines.forEach((line) => {
        line.y += line.speed
        if (line.y > height + 10) {
          line.y = -10
          line.width = Math.random() * width * 0.8 + width * 0.2
        }

        // Random glitch effect
        if (Math.random() > 0.9) {
          ctx.fillStyle = `rgba(${line.color}, ${line.opacity})`
          ctx.fillRect(Math.random() * 20, line.y, line.width, line.height)
        }
      })

      // Add scan lines effect
      for (let y = 0; y < height; y += 4) {
        ctx.fillStyle = "rgba(0, 255, 255, 0.02)"
        ctx.fillRect(0, y, width, 1)
      }

      // Random digital corruption blocks
      if (Math.random() > 0.95) {
        const blockX = Math.random() * width
        const blockY = Math.random() * height
        const blockW = Math.random() * 100 + 20
        const blockH = Math.random() * 20 + 5

        ctx.fillStyle = `rgba(255, 0, 100, ${Math.random() * 0.3})`
        ctx.fillRect(blockX, blockY, blockW, blockH)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setCanvasSize()
      createGlitchParticles()
      createGlitchLines()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{
          display: "block",
          imageRendering: "auto",
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60 z-1"></div>

      {/* 404 Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          {/* Glitchy 404 */}
          <div className="relative mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 font-mono">
              404
            </h1>
            {/* Glitch effect overlay */}
            <h1 className="absolute top-0 left-0 text-8xl md:text-9xl font-bold text-red-500 font-mono opacity-30 transform translate-x-1 translate-y-1">
              404
            </h1>
            <h1 className="absolute top-0 left-0 text-8xl md:text-9xl font-bold text-cyan-400 font-mono opacity-20 transform -translate-x-1 -translate-y-1">
              404
            </h1>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">PAGE NOT FOUND</h2>

          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto font-mono">
            The page you're looking for has been lost in the digital void.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-black text-lg px-8 py-4 font-mono font-bold transition-colors border-2 border-cyan-400 flex items-center justify-center">
                <Home className="mr-2 h-5 w-5" />
                GO HOME
              </button>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="border-2 border-gray-600 text-gray-300 hover:bg-gray-700 text-lg px-8 py-4 font-mono font-bold transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              GO BACK
            </button>
          </div>
        </div>
      </div>

      {/* Corner glitch effects */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-cyan-400 opacity-60 z-10"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-r-4 border-t-4 border-pink-500 opacity-60 z-10"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-4 border-b-4 border-pink-500 opacity-60 z-10"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-cyan-400 opacity-60 z-10"></div>
    </div>
  )
}
