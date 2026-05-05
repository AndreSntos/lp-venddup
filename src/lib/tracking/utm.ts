const STORAGE_KEY = "vd_utm";

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmParam = (typeof UTM_PARAMS)[number];

export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
  first_seen_at?: string;
}

/**
 * Extrai UTMs de uma query string.
 * Sem dependência de window — pode ser chamada em qualquer contexto.
 */
export function captureUtms(
  search: string,
  referrer: string,
  pathname: string
): UtmData {
  const params = new URLSearchParams(search);
  const data: UtmData = {};

  for (const key of UTM_PARAMS) {
    const val = params.get(key);
    if (val) data[key] = val;
  }

  if (referrer) data.referrer = referrer;
  data.landing_page = pathname;
  data.first_seen_at = new Date().toISOString();

  return data;
}

/**
 * Persiste UTMs no localStorage (first-party).
 * No-op silencioso em SSR ou se o storage estiver indisponível.
 */
export function persistUtms(data: UtmData): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // quota exceeded ou modo privado — ignora sem lançar
  }
}

/**
 * Lê UTMs persistidas. Retorna {} em SSR ou se o storage falhar.
 */
export function getPersistedUtms(): UtmData {
  if (typeof localStorage === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      return parsed as UtmData;
    }
    return {};
  } catch {
    return {};
  }
}

/**
 * Captura UTMs da URL atual e persiste — apenas na primeira visita.
 * Visitas posteriores reutilizam a atribuição original (first-touch).
 * Seguro para chamar apenas no client (verifica window).
 */
export function initUtms(): UtmData {
  if (typeof window === "undefined") return {};

  const existing = getPersistedUtms();
  if (existing.first_seen_at) return existing;

  const fresh = captureUtms(
    window.location.search,
    document.referrer,
    window.location.pathname
  );
  persistUtms(fresh);
  return fresh;
}
