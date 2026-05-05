/**
 * Wrapper PostHog seguro para uso em "use client" components.
 *
 * - No-op em SSR (window undefined).
 * - No-op se NEXT_PUBLIC_POSTHOG_KEY não estiver definida.
 * - Nunca lança exceção para o chamador.
 * - UTMs são super-props via posthog.register() no Provider;
 *   não precisam ser incluídas manualmente aqui.
 */
import posthog from "posthog-js";
import type { CtaEventProperties } from "./events";

export function trackEvent(
  eventName: string,
  properties?: CtaEventProperties
): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  try {
    posthog.capture(eventName, {
      pathname: window.location.pathname,
      ...properties,
    });
  } catch {
    // nunca expõe erros de tracking ao usuário
  }
}
