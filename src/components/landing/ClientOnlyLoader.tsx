"use client"

import dynamic from "next/dynamic"

// These are loaded only on the client (ssr: false).
// This file must be a Client Component to allow ssr: false in Next.js 16+.

export const VenddupHeroScene = dynamic(
  () => import("./VenddupHeroScene"),
  { ssr: false },
)

export const LandingAnimations = dynamic(
  () => import("./LandingAnimations"),
  { ssr: false },
)
