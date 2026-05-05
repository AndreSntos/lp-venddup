import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  captureUtms,
  persistUtms,
  getPersistedUtms,
  initUtms,
} from "@/lib/tracking/utm";

/* ── Mock de localStorage ─────────────────────────────────── */
const store: Record<string, string> = {};

const localStorageMock = {
  getItem:    (k: string) => store[k] ?? null,
  setItem:    (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
  clear:      () => { for (const k in store) delete store[k]; },
  length:     0,
  key:        () => null,
} satisfies Storage;

vi.stubGlobal("localStorage", localStorageMock);

/* ── captureUtms ─────────────────────────────────────────── */
describe("captureUtms", () => {
  it("captura todos os parâmetros UTM presentes", () => {
    const r = captureUtms(
      "?utm_source=google&utm_medium=cpc&utm_campaign=adega&utm_content=banner&utm_term=vinho",
      "https://google.com",
      "/landing"
    );
    expect(r.utm_source).toBe("google");
    expect(r.utm_medium).toBe("cpc");
    expect(r.utm_campaign).toBe("adega");
    expect(r.utm_content).toBe("banner");
    expect(r.utm_term).toBe("vinho");
    expect(r.referrer).toBe("https://google.com");
    expect(r.landing_page).toBe("/landing");
    expect(r.first_seen_at).toBeDefined();
  });

  it("ignora UTMs ausentes (sem chave extra no objeto)", () => {
    const r = captureUtms("?utm_source=instagram", "", "/");
    expect(r.utm_source).toBe("instagram");
    expect(r.utm_medium).toBeUndefined();
    expect(r.utm_campaign).toBeUndefined();
  });

  it("não define referrer quando vazio", () => {
    const r = captureUtms("", "", "/");
    expect(r.referrer).toBeUndefined();
  });

  it("sempre define landing_page e first_seen_at", () => {
    const r = captureUtms("", "", "/preco");
    expect(r.landing_page).toBe("/preco");
    expect(typeof r.first_seen_at).toBe("string");
  });

  it("lida com search string sem '?'", () => {
    const r = captureUtms("utm_source=whatsapp", "", "/");
    expect(r.utm_source).toBe("whatsapp");
  });
});

/* ── persistUtms / getPersistedUtms ─────────────────────── */
describe("persistUtms / getPersistedUtms", () => {
  beforeEach(() => localStorageMock.clear());

  it("faz roundtrip correto", () => {
    const data = { utm_source: "facebook", landing_page: "/", first_seen_at: "2024-01-01T00:00:00.000Z" };
    persistUtms(data);
    expect(getPersistedUtms()).toEqual(data);
  });

  it("retorna {} quando nada foi armazenado", () => {
    expect(getPersistedUtms()).toEqual({});
  });

  it("retorna {} para JSON inválido", () => {
    localStorageMock.setItem("vd_utm", "{{não-é-json}}");
    expect(getPersistedUtms()).toEqual({});
  });

  it("retorna {} quando o valor armazenado é um array", () => {
    localStorageMock.setItem("vd_utm", JSON.stringify(["a", "b"]));
    expect(getPersistedUtms()).toEqual({});
  });

  it("retorna {} quando o valor armazenado é null no JSON", () => {
    localStorageMock.setItem("vd_utm", "null");
    expect(getPersistedUtms()).toEqual({});
  });

  it("persistUtms é silencioso quando setItem lança", () => {
    const original = localStorageMock.setItem;
    localStorageMock.setItem = () => { throw new Error("quota"); };
    expect(() => persistUtms({ utm_source: "x" })).not.toThrow();
    localStorageMock.setItem = original;
  });
});

/* ── initUtms ────────────────────────────────────────────── */
describe("initUtms", () => {
  beforeEach(() => localStorageMock.clear());

  it("captura e persiste dados da URL do jsdom na primeira visita", () => {
    // jsdom: window existe, location.pathname = "/" (sem UTMs na URL)
    const result = initUtms();
    // deve sempre definir landing_page e first_seen_at
    expect(result.landing_page).toBeDefined();
    expect(typeof result.first_seen_at).toBe("string");

    // resultado deve ser persistido
    const persisted = getPersistedUtms();
    expect(persisted.landing_page).toBe(result.landing_page);
    expect(persisted.first_seen_at).toBe(result.first_seen_at);
  });

  it("reutiliza dados já persistidos (first-touch attribution)", () => {
    const existing = {
      utm_source: "email",
      landing_page: "/promo",
      first_seen_at: "2024-01-01T00:00:00.000Z",
    };
    localStorageMock.setItem("vd_utm", JSON.stringify(existing));

    const result = initUtms();
    // deve retornar os dados originais, sem sobrescrever
    expect(result.utm_source).toBe("email");
    expect(result.landing_page).toBe("/promo");
    expect(result.first_seen_at).toBe("2024-01-01T00:00:00.000Z");
  });

  it("não sobrescreve atribuição mesmo chamando initUtms várias vezes", () => {
    // primeira chamada: sem dados
    const first = initUtms();
    expect(first.first_seen_at).toBeDefined();

    // segunda chamada: deve retornar os mesmos dados
    const second = initUtms();
    expect(second.first_seen_at).toBe(first.first_seen_at);
    expect(second.landing_page).toBe(first.landing_page);
  });
});
