import { describe, it, expect } from "vitest";
import { formatBRL, slugify, truncate } from "@/lib/format";

describe("formatBRL", () => {
  it("formata zero centavos", () => {
    const result = formatBRL(0);
    expect(result).toContain("0");
  });

  it("formata 9700 centavos como R$97,00", () => {
    const result = formatBRL(9700);
    expect(result).toContain("97");
    expect(result).toMatch(/R\$|BRL/);
  });

  it("formata valores grandes corretamente", () => {
    const result = formatBRL(47680);
    expect(result).toContain("476");
  });
});

describe("slugify", () => {
  it("converte texto simples para slug", () => {
    expect(slugify("Adega do João")).toBe("adega-do-joao");
  });

  it("remove acentos e caracteres especiais", () => {
    expect(slugify("São Paulo - Ribeirão Preto")).toBe("sao-paulo-ribeirao-preto");
  });

  it("remove hifens no início e fim", () => {
    expect(slugify("-test-")).toBe("test");
  });

  it("trata string vazia", () => {
    expect(slugify("")).toBe("");
  });
});

describe("truncate", () => {
  it("retorna o texto completo se menor que o limite", () => {
    expect(truncate("Bordeaux", 20)).toBe("Bordeaux");
  });

  it("trunca texto longo com reticências", () => {
    const result = truncate("Kit Aniversário Premium Completo", 15);
    expect(result).toContain("…");
    expect(result.length).toBeLessThanOrEqual(16);
  });

  it("não trunca texto exatamente no limite", () => {
    expect(truncate("abc", 3)).toBe("abc");
  });
});
