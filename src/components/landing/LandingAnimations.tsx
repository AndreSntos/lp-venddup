"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function LandingAnimations(): null {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) return

    const ctx = gsap.context(() => {
      /* ── Hero: entrance sequence ─────────────────────────── */
      const ease = "power2.out"

      gsap.fromTo(
        "#hero .lp-badge",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.48, ease, delay: 0.08 },
      )
      gsap.fromTo(
        "#hero .lp-headline",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.56, ease, delay: 0.18 },
      )
      gsap.fromTo(
        "#hero .lp-sub",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.48, ease, delay: 0.30 },
      )
      gsap.fromTo(
        "#hero .lp-actions",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.46, ease, delay: 0.40 },
      )
      gsap.fromTo(
        "#hero .lp-microcopy",
        { opacity: 0 },
        { opacity: 1, duration: 0.40, ease, delay: 0.52 },
      )
      /* Stage entra como unidade */
      gsap.fromTo(
        "#hero .lp-stage, #hero .lp-stage-mobile",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.60, ease, delay: 0.22 },
      )
      /* Cards entram em stagger dentro do stage (só opacity — float usa transform) */
      gsap.fromTo(
        "#hero .lp-vitrine-card",
        { opacity: 0 },
        { opacity: 1, duration: 0.50, ease, delay: 0.34 },
      )
      gsap.fromTo(
        "#hero .lp-order-card",
        { opacity: 0 },
        { opacity: 1, duration: 0.44, ease, delay: 0.52 },
      )
      gsap.fromTo(
        "#hero .lp-wa-card",
        { opacity: 0 },
        { opacity: 1, duration: 0.40, ease, delay: 0.66 },
      )

      /* ── How it works ── */
      gsap.fromTo(
        "#como-funciona .lp-step",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          ease,
          stagger: 0.11,
          scrollTrigger: {
            trigger: "#como-funciona .lp-steps",
            start: "top 82%",
          },
        },
      )

      gsap.fromTo(
        "#como-funciona .lp-section-head",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          ease,
          scrollTrigger: {
            trigger: "#como-funciona",
            start: "top 80%",
          },
        },
      )

      /* ── Features ── */
      gsap.fromTo(
        "#funcionalidades .lp-section-head",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          ease,
          scrollTrigger: {
            trigger: "#funcionalidades",
            start: "top 80%",
          },
        },
      )
      gsap.fromTo(
        "#funcionalidades .lp-feature-card",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.46,
          ease,
          stagger: 0.075,
          scrollTrigger: {
            trigger: "#funcionalidades .lp-features-grid",
            start: "top 80%",
          },
        },
      )

      /* ── Conversion copy ── */
      gsap.fromTo(
        ".lp-conv-card",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.46,
          ease,
          stagger: 0.10,
          scrollTrigger: {
            trigger: ".lp-conv-grid",
            start: "top 82%",
          },
        },
      )

      /* ── Pricing ── */
      gsap.fromTo(
        "#preco .lp-section-head",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          ease,
          scrollTrigger: {
            trigger: "#preco",
            start: "top 80%",
          },
        },
      )
      gsap.fromTo(
        "#preco .lp-plan-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          ease,
          stagger: 0.10,
          scrollTrigger: {
            trigger: "#preco .lp-plans-grid",
            start: "top 80%",
          },
        },
      )

      /* ── FAQ ── */
      gsap.fromTo(
        "#faq .lp-section-head",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.46,
          ease,
          scrollTrigger: {
            trigger: "#faq",
            start: "top 82%",
          },
        },
      )
      gsap.fromTo(
        "#faq details",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.40,
          ease,
          stagger: 0.07,
          scrollTrigger: {
            trigger: "#faq .lp-faq",
            start: "top 82%",
          },
        },
      )

      /* ── CTA final ── */
      gsap.fromTo(
        ".lp-cta-section",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.56,
          ease,
          scrollTrigger: {
            trigger: ".lp-cta-section",
            start: "top 84%",
          },
        },
      )
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return null
}
