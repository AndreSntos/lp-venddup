"use client"

import { useEffect } from "react"

/**
 * CSS 3D parallax controller for the hero stage.
 * Targets .lp-stage-group and applies a subtle perspective tilt
 * on mousemove — no WebGL, no canvas, no Three.js.
 * Renders null (purely behavioral).
 */
export default function VenddupHeroScene(): null {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return
    if (window.innerWidth < 1024) return

    const stage = document.querySelector<HTMLElement>(".lp-stage")
    const group = document.querySelector<HTMLElement>(".lp-stage-group")
    if (!stage || !group) return

    let raf = 0
    let tx = 0, ty = 0
    let cx = 0, cy = 0

    const onMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect()
      if (r.width === 0) return
      tx = ((e.clientX - r.left) / r.width - 0.5) * 7
      ty = -((e.clientY - r.top) / r.height - 0.5) * 4
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      cx += (tx - cx) * 0.055
      cy += (ty - cy) * 0.055
      group.style.transform =
        `perspective(1100px) rotateY(${cx}deg) rotateX(${cy}deg)`
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      group.style.transform = ""
    }
  }, [])

  return null
}
