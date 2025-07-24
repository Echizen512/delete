"use client"

import { useEffect, useRef } from "react"
import { RainbowKitCustomConnectButton } from "../../components/scaffold-eth";
import { Users, Vote, Calendar, DollarSign, TrendingUp, Shield } from "lucide-react"


export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return


    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

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

    
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      type: "star" | "dot" | "glow" | "diamond"
      pulse: number
      pulseSpeed: number
      rotation: number
      rotationSpeed: number
    }> = []

    
    const createParticles = () => {
      const { width, height } = getDisplaySize()
      particles.length = 0

      for (let i = 0; i < 180; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 3.5 + 0.8,
          opacity: Math.random() * 0.8 + 0.2,
          type: Math.random() > 0.7 ? "star" : Math.random() > 0.5 ? "glow" : Math.random() > 0.3 ? "diamond" : "dot",
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.025 + 0.008,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        })
      }
    }

    createParticles()

    
    const gridLines: Array<{
      x1: number
      y1: number
      x2: number
      y2: number
      opacity: number
      fadeSpeed: number
      thickness: number
    }> = []

    const createGridLines = () => {
      const { width, height } = getDisplaySize()
      gridLines.length = 0

      for (let i = 0; i < 25; i++) {
        gridLines.push({
          x1: Math.random() * width,
          y1: Math.random() * height,
          x2: Math.random() * width,
          y2: Math.random() * height,
          opacity: Math.random() * 0.35 + 0.05,
          fadeSpeed: Math.random() * 0.002 + 0.0005,
          thickness: Math.random() > 0.8 ? 1.5 : 0.8,
        })
      }
    }

    createGridLines()

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.016 
      const { width, height } = getDisplaySize()

      
      ctx.clearRect(0, 0, width, height)

      
      const bgGradient = ctx.createLinearGradient(0, 0, width, height)
      bgGradient.addColorStop(0, "rgb(5, 15, 25)")
      bgGradient.addColorStop(0.3, "rgb(0, 8, 20)")
      bgGradient.addColorStop(0.7, "rgb(8, 0, 15)")
      bgGradient.addColorStop(1, "rgb(15, 5, 25)")
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, width, height)

      
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const opacity = Math.random() * 0.03
        ctx.fillStyle = `rgba(0, 255, 255, ${opacity})`
        ctx.fillRect(x, y, 1, 1)
      }

      
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      
      ctx.strokeStyle = "rgba(0, 255, 255, 0.04)"
      ctx.lineWidth = 0.5
      const gridSize = 45

      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, height)
        ctx.stroke()
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(width, y + 0.5)
        ctx.stroke()
      }

      
      ctx.strokeStyle = "rgba(0, 255, 255, 0.015)"
      ctx.lineWidth = 0.3

      for (let i = -height; i <= width; i += gridSize * 1.5) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + height, height)
        ctx.stroke()
      }

      for (let i = 0; i <= width + height; i += gridSize * 1.5) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i - height, height)
        ctx.stroke()
      }

      
      particles.forEach((particle, index) => {
        
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulse += particle.pulseSpeed
        particle.rotation += particle.rotationSpeed

        
        if (particle.x < -15) particle.x = width + 15
        if (particle.x > width + 15) particle.x = -15
        if (particle.y < -15) particle.y = height + 15
        if (particle.y > height + 15) particle.y = -15

        
        const pulseOpacity = particle.opacity * (0.4 + 0.6 * (Math.sin(particle.pulse) * 0.5 + 0.5))

        ctx.save()

        if (particle.type === "star") {
          
          ctx.translate(particle.x, particle.y)
          ctx.rotate(particle.rotation)
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 2)
          gradient.addColorStop(0, `rgba(0, 255, 255, ${pulseOpacity})`)
          gradient.addColorStop(0.7, `rgba(0, 255, 255, ${pulseOpacity * 0.3})`)
          gradient.addColorStop(1, `rgba(0, 255, 255, 0)`)
          ctx.fillStyle = gradient
          ctx.beginPath()
          for (let i = 0; i < 10; i++) {
            const angle = (i * Math.PI) / 5
            const radius = i % 2 === 0 ? particle.size : particle.size * 0.4
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.fill()
        } else if (particle.type === "diamond") {
          ctx.translate(particle.x, particle.y)
          ctx.rotate(particle.rotation)

          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 1.5)
          gradient.addColorStop(0, `rgba(255, 0, 255, ${pulseOpacity})`)
          gradient.addColorStop(0.6, `rgba(255, 0, 255, ${pulseOpacity * 0.4})`)
          gradient.addColorStop(1, `rgba(255, 0, 255, 0)`)
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.moveTo(0, -particle.size)
          ctx.lineTo(particle.size, 0)
          ctx.lineTo(0, particle.size)
          ctx.lineTo(-particle.size, 0)
          ctx.closePath()
          ctx.fill()
        } else if (particle.type === "glow") {
          const sizes = [particle.size * 4, particle.size * 2.5, particle.size * 1.2]
          const opacities = [pulseOpacity * 0.15, pulseOpacity * 0.3, pulseOpacity * 0.8]
          sizes.forEach((size, i) => {
            const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size)
            gradient.addColorStop(0, `rgba(0, 255, 255, ${opacities[i]})`)
            gradient.addColorStop(0.4, `rgba(0, 200, 255, ${opacities[i] * 0.6})`)
            gradient.addColorStop(0.8, `rgba(100, 0, 255, ${opacities[i] * 0.2})`)
            gradient.addColorStop(1, `rgba(0, 255, 255, 0)`)
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
            ctx.fill()
          })
        } else {
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 1.5,
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${pulseOpacity})`)
          gradient.addColorStop(0.6, `rgba(200, 255, 255, ${pulseOpacity * 0.5})`)
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      })
      gridLines.forEach((line) => {
        line.opacity -= line.fadeSpeed
        if (line.opacity <= 0) {
          
          line.x1 = Math.random() * width
          line.y1 = Math.random() * height
          line.x2 = Math.random() * width
          line.y2 = Math.random() * height
          line.opacity = Math.random() * 0.35 + 0.05
        }
        ctx.strokeStyle = `rgba(0,255,255,${line.opacity})`
        ctx.lineWidth = line.thickness
        ctx.beginPath()
        ctx.moveTo(line.x1, line.y1)
        ctx.lineTo(line.x2, line.y2)
        ctx.stroke()
      })
      const cornerSize = 40
      const cornerOpacity = 0.4 + 0.2 * Math.sin(time * 2)
      const corners: [number, number, number, number, number, number][] = [
        [0, 0, cornerSize, 0, 0, cornerSize],
        [width - cornerSize, 0, width, 0, width, cornerSize],
        [0, height - cornerSize, 0, height, cornerSize, height],
        [width - cornerSize, height, width, height, width, height - cornerSize],
      ]

      ctx.strokeStyle = `rgba(0,255,255,${cornerOpacity})`
      ctx.lineWidth = 2.5
      ctx.lineCap = "round"
      corners.forEach(([x1, y1, x2, y2, x3, y3]) => {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.lineTo(x3, y3)
        ctx.stroke()
      })
      animationId = requestAnimationFrame(animate)
    }

    animate()
    const handleResize = () => {
      setCanvasSize()
      createParticles()
      createGridLines()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const features = [
    { icon: Users, title: "DAO Management", desc: "Create and join decentralized organizations" },
    { icon: Vote, title: "Governance", desc: "Participate in democratic decision making" },
    { icon: Calendar, title: "Events", desc: "Organize and attend community events" },
    { icon: DollarSign, title: "Fundraising", desc: "Raise funds for your projects" },
    { icon: TrendingUp, title: "DeFi Tools", desc: "Advanced financial instruments" },
    { icon: Shield, title: "Auditing", desc: "Transparent audit system" },
  ]

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

      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-1"></div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-cyan-400 font-mono leading-tight">
            THE FUTURE 
            <br />
            <span className="text-white">OF DAO´s</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-mono">
            Build, govern, and grow your DAO
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RainbowKitCustomConnectButton />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400 font-mono">POWERFUL FEATURES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/80 border-2 border-cyan-500/30 p-6 hover:border-cyan-400 transition-all duration-300 hover:transform hover:scale-105 text-center"
              >
                <feature.icon className="h-12 w-12 text-cyan-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2 font-mono">{feature.title}</h3>
                <p className="text-gray-400 font-mono text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white font-mono">READY TO SHAPE THE FUTURE?</h2>
          <p className="text-xl text-gray-300 mb-8 font-mono">
            Join thousands of innovators building the decentralized economy
          </p>
            <RainbowKitCustomConnectButton />
        </div>
      </div>
    </div>
  )
}
