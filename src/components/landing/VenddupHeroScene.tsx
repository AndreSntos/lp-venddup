"use client"

import { useEffect, useRef } from "react"

// Type-only imports — zero runtime bundle impact from 'three' here
import type {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Group,
  Mesh,
  CanvasTexture,
  MeshBasicMaterial,
  BufferGeometry,
  LineSegments,
  LineBasicMaterial,
  Points,
  PointsMaterial,
  Clock,
  BufferAttribute,
} from "three"

type ThreeMod = typeof import("three")

/* ── Canvas texture helpers ──────────────────────────────────── */

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function createVitrineTexture(T: ThreeMod): CanvasTexture {
  const W = 512, H = 360
  const canvas = document.createElement("canvas")
  canvas.width = W * 2
  canvas.height = H * 2
  const ctx = canvas.getContext("2d")!
  ctx.scale(2, 2)

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, "#0d1b31")
  bg.addColorStop(1, "#07111f")
  drawRoundRect(ctx, 0, 0, W, H, 20)
  ctx.fillStyle = bg
  ctx.fill()

  // Border
  drawRoundRect(ctx, 0.5, 0.5, W - 1, H - 1, 20)
  ctx.strokeStyle = "rgba(125,211,252,0.38)"
  ctx.lineWidth = 1
  ctx.stroke()

  // Chrome bar
  ctx.fillStyle = "rgba(125,211,252,0.04)"
  ctx.fillRect(1, 1, W - 2, 40)
  ctx.strokeStyle = "rgba(125,211,252,0.15)"
  ctx.lineWidth = 0.5
  ctx.beginPath(); ctx.moveTo(0, 41); ctx.lineTo(W, 41); ctx.stroke()

  // Traffic lights
  const trafColors = ["#fb7185", "#f59e0b", "#25d366"]
  trafColors.forEach((c, i) => {
    ctx.beginPath()
    ctx.arc(16 + i * 16, 21, 4, 0, Math.PI * 2)
    ctx.fillStyle = c
    ctx.fill()
  })

  // URL bar
  ctx.fillStyle = "rgba(125,211,252,0.08)"
  drawRoundRect(ctx, 68, 12, 256, 18, 4)
  ctx.fill()
  ctx.strokeStyle = "rgba(125,211,252,0.16)"
  ctx.lineWidth = 0.5
  ctx.stroke()
  ctx.fillStyle = "#627792"
  ctx.font = "9px 'JetBrains Mono', monospace"
  ctx.textAlign = "center"
  ctx.fillText("vitrine.venddup.com.br/adega-joao", 196, 24.5)

  // Store logo circle
  ctx.fillStyle = "rgba(56,189,248,0.18)"
  drawRoundRect(ctx, 14, 52, 38, 38, 10)
  ctx.fill()
  ctx.strokeStyle = "rgba(56,189,248,0.22)"
  ctx.lineWidth = 0.5
  ctx.stroke()
  ctx.strokeStyle = "#38bdf8"
  ctx.lineWidth = 1.4
  ctx.beginPath(); ctx.moveTo(33, 59); ctx.lineTo(33, 81); ctx.stroke()
  ctx.beginPath(); ctx.arc(33, 73, 5, 0, Math.PI * 2); ctx.stroke()

  // Store name
  ctx.fillStyle = "#f8fbff"
  ctx.font = "bold 12px 'Inter', system-ui"
  ctx.textAlign = "left"
  ctx.fillText("Adega do João", 60, 66)
  ctx.fillStyle = "#627792"
  ctx.font = "9px 'JetBrains Mono', monospace"
  ctx.fillText("Vila Madalena · São Paulo", 60, 80)

  // "Aberta" badge
  ctx.fillStyle = "rgba(37,211,102,0.12)"
  drawRoundRect(ctx, W - 80, 59, 65, 20, 10)
  ctx.fill()
  ctx.strokeStyle = "rgba(37,211,102,0.35)"
  ctx.lineWidth = 0.5
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(W - 69, 69, 3.5, 0, Math.PI * 2)
  ctx.fillStyle = "#25d366"
  ctx.fill()
  ctx.fillStyle = "#25d366"
  ctx.font = "bold 9px 'Inter', system-ui"
  ctx.textAlign = "left"
  ctx.fillText("Aberta", W - 61, 73)

  // Section separator
  ctx.strokeStyle = "rgba(125,211,252,0.15)"
  ctx.lineWidth = 0.5
  ctx.beginPath(); ctx.moveTo(0, 98); ctx.lineTo(W, 98); ctx.stroke()

  // Products
  type ProductRow = { name: string; cat: string; price: string; isKit?: boolean }
  const products: ProductRow[] = [
    { name: "Bordeaux Reserva 750ml", cat: "Tinto · França", price: "R$ 89,90" },
    { name: "Malbec Reserva 750ml", cat: "Tinto · Argentina", price: "R$ 76,00" },
    { name: "Kit Aniversário Premium", cat: "3 rótulos · caixa inclusa", price: "R$ 297,00", isKit: true },
  ]

  products.forEach((p, i) => {
    const py = 106 + i * 56

    ctx.fillStyle = "rgba(125,211,252,0.04)"
    drawRoundRect(ctx, 8, py, W - 16, 48, 10)
    ctx.fill()
    ctx.strokeStyle = "rgba(125,211,252,0.10)"
    ctx.lineWidth = 0.5
    ctx.stroke()

    const thumbFill = p.isKit ? "rgba(163,230,53,0.14)" : "rgba(139,92,246,0.18)"
    ctx.fillStyle = thumbFill
    drawRoundRect(ctx, 16, py + 8, 34, 32, 7)
    ctx.fill()

    ctx.strokeStyle = p.isKit ? "#a3e635" : "rgba(216,180,254,0.80)"
    ctx.lineWidth = 1.2
    if (p.isKit) {
      ctx.strokeRect(25, py + 16, 14, 12)
      ctx.beginPath(); ctx.moveTo(25, py + 22); ctx.lineTo(39, py + 22); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(32, py + 16); ctx.lineTo(32, py + 28); ctx.stroke()
    } else {
      ctx.beginPath(); ctx.moveTo(33, py + 14); ctx.lineTo(33, py + 32); ctx.stroke()
      ctx.beginPath(); ctx.arc(33, py + 26, 5, 0, Math.PI * 2); ctx.stroke()
    }

    ctx.fillStyle = "#f8fbff"
    ctx.font = "bold 11px 'Inter', system-ui"
    ctx.textAlign = "left"
    ctx.fillText(p.name, 58, py + 18)
    ctx.fillStyle = "#627792"
    ctx.font = "9px 'JetBrains Mono', monospace"
    ctx.fillText(p.cat, 58, py + 32)
    ctx.fillStyle = p.isKit ? "#38bdf8" : "#f8fbff"
    ctx.font = "bold 12px 'Inter', system-ui"
    ctx.textAlign = "right"
    ctx.fillText(p.price, W - 16, py + 26)
    ctx.textAlign = "left"
  })

  // Footer
  ctx.fillStyle = "rgba(7,17,31,0.96)"
  ctx.fillRect(1, H - 35, W - 2, 34)
  ctx.strokeStyle = "rgba(125,211,252,0.15)"
  ctx.lineWidth = 0.5
  ctx.beginPath(); ctx.moveTo(0, H - 35); ctx.lineTo(W, H - 35); ctx.stroke()
  ctx.fillStyle = "#9fb4d0"
  ctx.font = "10px 'Inter', system-ui"
  ctx.textAlign = "left"
  ctx.fillText("🛒 1 item no carrinho", 14, H - 15)
  ctx.fillStyle = "#38bdf8"
  ctx.font = "bold 10px 'JetBrains Mono', monospace"
  ctx.textAlign = "right"
  ctx.fillText("Ver carrinho →", W - 14, H - 15)

  return new T.CanvasTexture(canvas)
}

function createPedidoTexture(T: ThreeMod): CanvasTexture {
  const W = 380, H = 260
  const canvas = document.createElement("canvas")
  canvas.width = W * 2
  canvas.height = H * 2
  const ctx = canvas.getContext("2d")!
  ctx.scale(2, 2)

  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, "#0b1525")
  bg.addColorStop(1, "#030712")
  drawRoundRect(ctx, 0, 0, W, H, 18)
  ctx.fillStyle = bg
  ctx.fill()

  drawRoundRect(ctx, 0.5, 0.5, W - 1, H - 1, 18)
  ctx.strokeStyle = "rgba(56,189,248,0.40)"
  ctx.lineWidth = 1
  ctx.stroke()

  // Top glow
  const glow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 110)
  glow.addColorStop(0, "rgba(56,189,248,0.13)")
  glow.addColorStop(1, "rgba(56,189,248,0)")
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, 110)

  ctx.fillStyle = "#f8fbff"
  ctx.font = "bold 14px 'Inter', system-ui"
  ctx.textAlign = "left"
  ctx.fillText("Pedido #1.247", 18, 30)

  // "Novo" badge
  ctx.fillStyle = "rgba(37,211,102,0.12)"
  drawRoundRect(ctx, W - 58, 14, 42, 20, 10)
  ctx.fill()
  ctx.strokeStyle = "rgba(37,211,102,0.35)"
  ctx.lineWidth = 0.5
  ctx.stroke()
  ctx.fillStyle = "#25d366"
  ctx.font = "bold 9px 'Inter', system-ui"
  ctx.textAlign = "right"
  ctx.fillText("Novo", W - 12, 28)

  ctx.fillStyle = "#627792"
  ctx.font = "10px 'JetBrains Mono', monospace"
  ctx.textAlign = "left"
  ctx.fillText("Hoje · 14h32", 18, 48)

  ctx.strokeStyle = "rgba(125,211,252,0.13)"
  ctx.lineWidth = 0.5
  ctx.beginPath(); ctx.moveTo(14, 58); ctx.lineTo(W - 14, 58); ctx.stroke()

  type OrderItem = { label: string; price: string }
  const items: OrderItem[] = [
    { label: "Bordeaux Reserva × 2", price: "R$ 179,80" },
    { label: "Kit Aniversário × 1", price: "R$ 297,00" },
  ]
  items.forEach((item, i) => {
    const iy = 70 + i * 44
    ctx.fillStyle = "rgba(125,211,252,0.05)"
    drawRoundRect(ctx, 10, iy, W - 20, 36, 8)
    ctx.fill()
    ctx.strokeStyle = "rgba(125,211,252,0.10)"
    ctx.lineWidth = 0.5
    ctx.stroke()
    ctx.fillStyle = "#9fb4d0"
    ctx.font = "11px 'Inter', system-ui"
    ctx.textAlign = "left"
    ctx.fillText(item.label, 18, iy + 22)
    ctx.fillStyle = "#38bdf8"
    ctx.font = "bold 11px 'Inter', system-ui"
    ctx.textAlign = "right"
    ctx.fillText(item.price, W - 16, iy + 22)
  })

  ctx.strokeStyle = "rgba(125,211,252,0.18)"
  ctx.lineWidth = 0.5
  ctx.beginPath(); ctx.moveTo(10, 168); ctx.lineTo(W - 10, 168); ctx.stroke()

  ctx.fillStyle = "#9fb4d0"
  ctx.font = "12px 'Inter', system-ui"
  ctx.textAlign = "left"
  ctx.fillText("Total", 18, 190)
  ctx.fillStyle = "#f8fbff"
  ctx.font = "bold 22px 'Space Grotesk', system-ui"
  ctx.textAlign = "right"
  ctx.fillText("R$ 476,80", W - 16, 192)

  ctx.fillStyle = "rgba(37,211,102,0.10)"
  drawRoundRect(ctx, 10, 208, W - 20, 36, 18)
  ctx.fill()
  ctx.strokeStyle = "rgba(37,211,102,0.25)"
  ctx.lineWidth = 0.5
  ctx.stroke()
  ctx.fillStyle = "#25d366"
  ctx.font = "bold 11px 'JetBrains Mono', monospace"
  ctx.textAlign = "center"
  ctx.fillText("✓ Confirmar via WhatsApp", W / 2, 231)

  return new T.CanvasTexture(canvas)
}

function createWATexture(T: ThreeMod): CanvasTexture {
  const W = 240, H = 158
  const canvas = document.createElement("canvas")
  canvas.width = W * 2
  canvas.height = H * 2
  const ctx = canvas.getContext("2d")!
  ctx.scale(2, 2)

  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, "rgba(37,211,102,0.16)")
  bg.addColorStop(1, "rgba(7,17,31,0.96)")
  drawRoundRect(ctx, 0, 0, W, H, 16)
  ctx.fillStyle = bg
  ctx.fill()

  drawRoundRect(ctx, 0.5, 0.5, W - 1, H - 1, 16)
  ctx.strokeStyle = "rgba(37,211,102,0.40)"
  ctx.lineWidth = 1
  ctx.stroke()

  // Green glow top
  const glow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 72)
  glow.addColorStop(0, "rgba(37,211,102,0.22)")
  glow.addColorStop(1, "rgba(37,211,102,0)")
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, 72)

  // WA icon circle
  const gr = ctx.createLinearGradient(14, 14, 44, 44)
  gr.addColorStop(0, "#25d366")
  gr.addColorStop(1, "#08a045")
  ctx.beginPath()
  ctx.arc(29, 29, 15, 0, Math.PI * 2)
  ctx.fillStyle = gr
  ctx.fill()
  ctx.fillStyle = "#fff"
  ctx.font = "bold 12px 'Inter', system-ui"
  ctx.textAlign = "center"
  ctx.fillText("✆", 29, 35)

  ctx.fillStyle = "#f8fbff"
  ctx.font = "bold 11px 'Inter', system-ui"
  ctx.textAlign = "left"
  ctx.fillText("João Silva", 52, 26)
  ctx.fillStyle = "#627792"
  ctx.font = "9px 'JetBrains Mono', monospace"
  ctx.fillText("Pedido enviado", 52, 40)

  ctx.strokeStyle = "rgba(37,211,102,0.18)"
  ctx.lineWidth = 0.5
  ctx.beginPath(); ctx.moveTo(10, 52); ctx.lineTo(W - 10, 52); ctx.stroke()

  ctx.fillStyle = "rgba(37,211,102,0.10)"
  drawRoundRect(ctx, 10, 60, W - 20, 62, 10)
  ctx.fill()
  ctx.strokeStyle = "rgba(37,211,102,0.22)"
  ctx.lineWidth = 0.5
  ctx.stroke()

  ctx.fillStyle = "#9fb4d0"
  ctx.font = "9px 'Inter', system-ui"
  ctx.textAlign = "left"
  ctx.fillText("Oi! Quero o Kit Aniversário +", 18, 79)
  ctx.fillText("2 Bordeaux. Total R$ 476,80.", 18, 93)
  ctx.fillText("Link da vitrine ✓", 18, 107)

  ctx.fillStyle = "#25d366"
  ctx.font = "9px 'JetBrains Mono', monospace"
  ctx.textAlign = "right"
  ctx.fillText("✓✓ 14h32", W - 14, 130)

  return new T.CanvasTexture(canvas)
}

/* ── Component ───────────────────────────────────────────────── */

// Typed refs for cleanup across async boundary
type SceneRefs = {
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera
  group: Group
  cards: Mesh[]
  lineSegs: LineSegments
  particles: Points
  geos: BufferGeometry[]
  mats: (MeshBasicMaterial | LineBasicMaterial | PointsMaterial)[]
  textures: CanvasTexture[]
  clock: Clock
  attrs: BufferAttribute[]
}

export default function VenddupHeroScene(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.innerWidth < 1024) return

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let animId = 0
    let visible = true
    let refs: SceneRefs | null = null
    let cancelled = false

    const run = async () => {
      const T: ThreeMod = await import("three")
      if (cancelled) return

      /* ── Renderer ── */
      const renderer = new T.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      /* ── Scene + Camera ── */
      const scene = new T.Scene()
      const aspect = container.clientWidth / container.clientHeight
      const camera = new T.PerspectiveCamera(42, aspect, 0.1, 100)
      camera.position.z = 5.5

      /* ── Group (for parallax) ── */
      const group = new T.Group()
      scene.add(group)

      /* ── Textures ── */
      const vitrineTex = createVitrineTexture(T)
      const pedidoTex = createPedidoTexture(T)
      const waTex = createWATexture(T)

      /* ── Vitrine card ── */
      const vitrineGeo = new T.PlaneGeometry(3.2, 2.25)
      const vitrineMat = new T.MeshBasicMaterial({ map: vitrineTex, transparent: true })
      const vitrineCard = new T.Mesh(vitrineGeo, vitrineMat)
      vitrineCard.position.set(-0.5, 0.28, 0)
      vitrineCard.rotation.set(-0.04, 0.09, 0)
      group.add(vitrineCard)

      /* ── Pedido card ── */
      const pedidoGeo = new T.PlaneGeometry(2.38, 1.63)
      const pedidoMat = new T.MeshBasicMaterial({ map: pedidoTex, transparent: true })
      const pedidoCard = new T.Mesh(pedidoGeo, pedidoMat)
      pedidoCard.position.set(0.85, -0.52, 0.56)
      pedidoCard.rotation.set(0.05, -0.13, 0)
      group.add(pedidoCard)

      /* ── WhatsApp chip ── */
      const waGeo = new T.PlaneGeometry(1.42, 0.94)
      const waMat = new T.MeshBasicMaterial({ map: waTex, transparent: true })
      const waCard = new T.Mesh(waGeo, waMat)
      waCard.position.set(1.62, 0.88, 0.84)
      waCard.rotation.set(-0.08, -0.20, 0)
      group.add(waCard)

      /* ── Connecting lines ── */
      const lineGeo = new T.BufferGeometry()
      const linePositions = new Float32Array([
        -0.5, 0.28, 0,   0.85, -0.52, 0.56,
        0.85, -0.52, 0.56,  1.62, 0.88, 0.84,
      ])
      const lineAttr = new T.BufferAttribute(linePositions, 3)
      lineGeo.setAttribute("position", lineAttr)
      const lineMat = new T.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.22,
      })
      const lineSegs = new T.LineSegments(lineGeo, lineMat)
      group.add(lineSegs)

      /* ── Particles ── */
      const particleCount = 28
      const particleGeo = new T.BufferGeometry()
      const pPos = new Float32Array(particleCount * 3)
      for (let i = 0; i < particleCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 7
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 5
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 2.5
      }
      const pAttr = new T.BufferAttribute(pPos, 3)
      particleGeo.setAttribute("position", pAttr)
      const particleMat = new T.PointsMaterial({
        color: 0x38bdf8,
        size: 0.025,
        transparent: true,
        opacity: 0.38,
      })
      const particles = new T.Points(particleGeo, particleMat)
      group.add(particles)

      refs = {
        renderer, scene, camera, group,
        cards: [vitrineCard, pedidoCard, waCard],
        lineSegs, particles,
        geos: [vitrineGeo, pedidoGeo, waGeo, lineGeo, particleGeo],
        mats: [vitrineMat, pedidoMat, waMat, lineMat, particleMat],
        textures: [vitrineTex, pedidoTex, waTex],
        clock: new T.Clock(),
        attrs: [lineAttr, pAttr],
      }

      /* ── Mouse parallax ── */
      let mouseX = 0, mouseY = 0
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2
      }
      window.addEventListener("mousemove", handleMouseMove, { passive: true })

      /* ── Resize ── */
      const handleResize = () => {
        const w = container.clientWidth
        const h = container.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener("resize", handleResize, { passive: true })

      /* ── IntersectionObserver ── */
      const observer = new IntersectionObserver(
        ([entry]) => { visible = entry.isIntersecting },
        { threshold: 0 },
      )
      observer.observe(container)

      /* ── Animation loop ── */
      const clock = refs.clock
      const animate = () => {
        animId = requestAnimationFrame(animate)
        if (!visible) return

        const t = clock.getElapsedTime()

        if (!prefersReduced) {
          vitrineCard.position.y = 0.28 + Math.sin(t * 0.55) * 0.055
          pedidoCard.position.y = -0.52 + Math.sin(t * 0.46 + 1.2) * 0.072
          waCard.position.y = 0.88 + Math.sin(t * 0.68 + 2.4) * 0.048
          particles.rotation.y = t * 0.018

          group.rotation.y += (mouseX * 0.11 - group.rotation.y) * 0.04
          group.rotation.x += (mouseY * 0.07 - group.rotation.x) * 0.04
        }

        renderer.render(scene, camera)
      }
      animate()

      /* ── Fade in canvas ── */
      const canvasEl = renderer.domElement
      canvasEl.style.opacity = "0"
      canvasEl.style.transition = "opacity 0.7s ease"
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { canvasEl.style.opacity = "1" })
      })

      /* ── Store cleanup helpers ── */
      const cleanup = () => {
        cancelAnimationFrame(animId)
        observer.disconnect()
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("resize", handleResize)
        if (refs) {
          refs.geos.forEach((g) => g.dispose())
          refs.mats.forEach((m) => m.dispose())
          refs.textures.forEach((tex) => tex.dispose())
          refs.renderer.dispose()
        }
        const el = canvasEl
        if (el.parentNode) el.parentNode.removeChild(el)
      }

      // Attach cleanup so the outer return can call it
      ;(container as HTMLDivElement & { _threeCleanup?: () => void })._threeCleanup = cleanup
    }

    run()

    return () => {
      cancelled = true
      cancelAnimationFrame(animId)
      const el = container as (HTMLDivElement & { _threeCleanup?: () => void }) | null
      el?._threeCleanup?.()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="lp-three-scene"
      aria-hidden="true"
    />
  )
}
