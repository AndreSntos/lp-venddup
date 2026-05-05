"use client";

/**
 * AnalyticsProvider — componente client-only que:
 * 1. Inicializa o PostHog após o primeiro render (sem bloquear FCP/LCP).
 * 2. Captura e persiste UTMs da primeira visita (first-touch attribution).
 * 3. Registra UTMs como super-props (todas as sessões carregam a atribuição).
 * 4. Dispara lp_viewed na montagem.
 * 5. Escuta cliques em qualquer elemento com [data-track] —
 *    isso permite instrumentar Server Components sem convertê-los em client.
 *
 * Session replay:
 *   - Controlado por NEXT_PUBLIC_POSTHOG_REPLAY_RATE (0–1, default 0 = off).
 *   - 0 desliga completamente; 0.05 = 5 % das sessões etc.
 *
 * Privacidade:
 *   - autocapture desativado (apenas eventos explícitos).
 *   - Nenhum dado pessoal sensível é coletado.
 *   - Preparado para desligar via env (key ausente = sem tracking).
 */

import { useEffect } from "react";
import posthog from "posthog-js";
import { LP_EVENTS } from "./events";
import { initUtms } from "./utm";
import { trackEvent } from "./posthog-client";

export function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /* ── Inicialização do PostHog ── */
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return; // sem key, sem tracking

    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

    const replayRate = Math.max(
      0,
      Math.min(
        1,
        parseFloat(process.env.NEXT_PUBLIC_POSTHOG_REPLAY_RATE ?? "0") || 0
      )
    );

    posthog.init(key, {
      api_host: host,
      capture_pageview: false,   // disparado manualmente abaixo
      capture_pageleave: true,
      autocapture: false,        // apenas eventos explícitos
      disable_session_recording: replayRate <= 0,
      loaded(ph) {
        // Amostragem de replay após init
        if (replayRate > 0 && replayRate < 1 && Math.random() > replayRate) {
          ph.stopSessionRecording?.();
        }
        if (process.env.NODE_ENV === "development") {
          ph.debug(true);
        }
      },
    });

    // Captura / restaura UTMs como super-props
    const utms = initUtms();
    posthog.register(utms);

    // Page view manual
    posthog.capture(LP_EVENTS.LP_VIEWED, {
      pathname: window.location.pathname,
    });
  }, []);

  /* ── Listener global para [data-track] ── */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest?.("[data-track]");
      if (!el) return;

      const eventName = el.getAttribute("data-track");
      if (!eventName) return;

      const label = el.getAttribute("data-track-label") ?? undefined;
      const location = el.getAttribute("data-track-location") ?? undefined;
      const destination =
        (el as HTMLAnchorElement).href ||
        el.getAttribute("data-track-destination") ||
        undefined;

      trackEvent(eventName, {
        cta_label: label,
        cta_location: location,
        cta_destination: destination || undefined,
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return <>{children}</>;
}
