import { describe, it, expect } from "vitest";
import { calculateCombo, formatCurrencyBRL, formatPercentBR } from "../lib/combo-calculator";

describe("calculateCombo", () => {
  const baseInput = {
    custoBebidas: 45,
    custoAdicionais: 5,
    custoEmbalagemGelo: 8,
    custoEntrega: 12,
    taxaPagamentoPercentual: 3,
    margemDesejadaPercentual: 20,
  };

  describe("cenários de margem", () => {
    it("deve retornar lucro positivo quando venda > custos + taxa", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: 149.9,
      });

      expect(result.isValid).toBe(true);
      expect(result.lucroEstimado).toBeGreaterThan(0);
      expect(result.status).toBe("saudavel");
      expect(result.margemPercentual).toBeGreaterThan(30);
    });

    it("deve retornar prejuízo quando venda < custos + taxa", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: 50,
      });

      expect(result.isValid).toBe(true);
      expect(result.lucroEstimado).toBeLessThan(0);
      expect(result.status).toBe("prejuizo");
      expect(result.margemPercentual).toBeLessThan(0);
    });

    it("deve retornar margem perigosa entre 0 e 15%", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: 85,
      });

      expect(result.isValid).toBe(true);
      expect(result.margemPercentual).toBeGreaterThan(0);
      expect(result.margemPercentual).toBeLessThanOrEqual(15);
      expect(result.status).toBe("perigoso");
    });

    it("deve retornar margem aceitável entre 15 e 30%", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: 100,
      });

      expect(result.isValid).toBe(true);
      expect(result.margemPercentual).toBeGreaterThan(15);
      expect(result.margemPercentual).toBeLessThanOrEqual(30);
      expect(result.status).toBe("aceitavel");
    });

    it("deve retornar margem saudável acima de 30%", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: 150,
      });

      expect(result.isValid).toBe(true);
      expect(result.margemPercentual).toBeGreaterThan(30);
      expect(result.status).toBe("saudavel");
    });
  });

  describe("validação de entradas inválidas", () => {
    it("deve retornar resultado inválido quando preço de venda é zero", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: 0,
      });

      expect(result.isValid).toBe(false);
      expect(result.status).toBe("prejuizo");
    });

    it("deve retornar resultado inválido quando preço de venda é negativo", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: -10,
      });

      expect(result.isValid).toBe(false);
    });

    it("deve retornar resultado inválido quando preço de venda é NaN", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: NaN,
      });

      expect(result.isValid).toBe(false);
    });

    it("deve lidar com custos undefined usando valor padrão", () => {
      const result = calculateCombo({
        precoVenda: 100,
        custoBebidas: 0,
        custoAdicionais: 0,
        custoEmbalagemGelo: 0,
        custoEntrega: 0,
        taxaPagamentoPercentual: 0,
        margemDesejadaPercentual: 20,
      });

      expect(result.isValid).toBe(true);
      expect(result.custoTotal).toBe(0);
    });

    it("deve retornar valores seguros para custos com NaN", () => {
      const result = calculateCombo({
        precoVenda: 100,
        custoBebidas: NaN,
        custoAdicionais: NaN,
        custoEmbalagemGelo: NaN,
        custoEntrega: NaN,
        taxaPagamentoPercentual: 3,
        margemDesejadaPercentual: 20,
      });

      expect(result.isValid).toBe(false);
    });
  });

  describe("cálculos de fórmula", () => {
    it("deve calcular custo total corretamente", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: 100,
      });

      const custoTotalEsperado = 45 + 5 + 8 + 12;
      expect(result.custoTotal).toBe(custoTotalEsperado);
    });

    it("deve calcular taxa de pagamento corretamente", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: 100,
      });

      const taxaEsperada = 100 * (3 / 100);
      expect(result.taxaPagamento).toBe(taxaEsperada);
    });

    it("deve calcular lucro estimado corretamente", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: 100,
      });

      const custoTotal = 45 + 5 + 8 + 12;
      const taxaPagamento = 100 * (3 / 100);
      const lucroEsperado = 100 - custoTotal - taxaPagamento;
      expect(result.lucroEstimado).toBe(lucroEsperado);
    });

    it("deve calcular margem percentual corretamente", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: 100,
      });

      const custoTotal = 45 + 5 + 8 + 12;
      const taxaPagamento = 100 * (3 / 100);
      const lucro = 100 - custoTotal - taxaPagamento;
      const margemEsperada = (lucro / 100) * 100;
      expect(result.margemPercentual).toBe(margemEsperada);
    });

    it("deve calcular preço mínimo sugerido corretamente", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: 80,
      });

      const custoTotal = 70;
      const taxaPagamentoPercentual = 3;
      const margemDesejadaPercentual = 20;
      const denominador = 1 - (margemDesejadaPercentual / 100) - (taxaPagamentoPercentual / 100);
      const precoMinimoEsperado = custoTotal / denominador;

      expect(result.precoMinimoSugerido).toBe(precoMinimoEsperado);
    });

    it("deve retornar 0 para preço mínimo quando denominador é zero ou negativo", () => {
      const result = calculateCombo({
        ...baseInput,
        precoVenda: 100,
        margemDesejadaPercentual: 100,
      });

      expect(result.precoMinimoSugerido).toBe(0);
    });
  });

  describe("formatCurrencyBRL", () => {
    it("deve formatar货币 em BRL corretamente", () => {
      const formatted = formatCurrencyBRL(149.9);
      expect(formatted).toContain("149");
      expect(formatted).toContain("R$");
    });

    it("deve retornar '—' para valores inválidos", () => {
      expect(formatCurrencyBRL(NaN)).toBe("—");
      expect(formatCurrencyBRL(Infinity)).toBe("—");
      expect(formatCurrencyBRL(Number.NaN)).toBe("—");
      expect(formatCurrencyBRL(Number.POSITIVE_INFINITY)).toBe("—");
      expect(formatCurrencyBRL(Number.NEGATIVE_INFINITY)).toBe("—");
    });
  });

  describe("formatPercentBR", () => {
    it("deve formatar percentual corretamente", () => {
      const formatted = formatPercentBR(25.5);
      expect(formatted).toContain("25");
      expect(formatted).toContain("%");
    });

    it("deve retornar '—' para valores inválidos", () => {
      expect(formatPercentBR(NaN)).toBe("—");
      expect(formatPercentBR(Infinity)).toBe("—");
    });
  });
});