export interface ComboInput {
  precoVenda: number;
  custoBebidas: number;
  custoAdicionais: number;
  custoEmbalagemGelo: number;
  custoEntrega: number;
  taxaPagamentoPercentual: number;
  margemDesejadaPercentual: number;
}

export type ComboStatus = "prejuizo" | "perigoso" | "aceitavel" | "saudavel";

export interface ComboResult {
  custoTotal: number;
  taxaPagamento: number;
  lucroEstimado: number;
  margemPercentual: number;
  precoMinimoSugerido: number;
  status: ComboStatus;
  statusText: string;
  statusEmoji: string;
  isValid: boolean;
}

const isValidNumber = (value: number): boolean => {
  return !isNaN(value) && isFinite(value);
};

export function calculateCombo(input: ComboInput): ComboResult {
  const {
    precoVenda,
    custoBebidas,
    custoAdicionais,
    custoEmbalagemGelo,
    custoEntrega,
    taxaPagamentoPercentual,
    margemDesejadaPercentual,
  } = input;

  if (precoVenda <= 0 || !isValidNumber(precoVenda)) {
    return {
      custoTotal: 0,
      taxaPagamento: 0,
      lucroEstimado: 0,
      margemPercentual: 0,
      precoMinimoSugerido: 0,
      status: "prejuizo",
      statusText: "Preço inválido",
      statusEmoji: "⚠️",
      isValid: false,
    };
  }

  if (!isValidNumber(custoBebidas) || !isValidNumber(custoAdicionais) || 
      !isValidNumber(custoEmbalagemGelo) || !isValidNumber(custoEntrega) ||
      !isValidNumber(taxaPagamentoPercentual) || !isValidNumber(margemDesejadaPercentual)) {
    return {
      custoTotal: 0,
      taxaPagamento: 0,
      lucroEstimado: 0,
      margemPercentual: 0,
      precoMinimoSugerido: 0,
      status: "prejuizo",
      statusText: "Dados inválidos",
      statusEmoji: "⚠️",
      isValid: false,
    };
  }

  const custoTotal = custoBebidas + custoAdicionais + custoEmbalagemGelo + custoEntrega;
  const taxaPagamento = precoVenda * (taxaPagamentoPercentual / 100);
  const lucroEstimado = precoVenda - custoTotal - taxaPagamento;
  const margemPercentual = (lucroEstimado / precoVenda) * 100;

  const denominador = 1 - (margemDesejadaPercentual / 100) - (taxaPagamentoPercentual / 100);
  const precoMinimoSugerido = denominador > 0 && isValidNumber(denominador) 
    ? custoTotal / denominador 
    : 0;

  let status: ComboStatus;
  let statusText: string;
  let statusEmoji: string;

  if (margemPercentual < 0) {
    status = "prejuizo";
    statusText = "Prejuízo detectado";
    statusEmoji = "⚠️";
  } else if (margemPercentual <= 15) {
    status = "perigoso";
    statusText = "Margem crítica";
    statusEmoji = "🔥";
  } else if (margemPercentual <= 30) {
    status = "aceitavel";
    statusText = "Margem aceitável";
    statusEmoji = "✅";
  } else {
    status = "saudavel";
    statusText = "Combo saudável";
    statusEmoji = "💰";
  }

  const result: ComboResult = {
    custoTotal: isValidNumber(custoTotal) ? custoTotal : 0,
    taxaPagamento: isValidNumber(taxaPagamento) ? taxaPagamento : 0,
    lucroEstimado: isValidNumber(lucroEstimado) ? lucroEstimado : 0,
    margemPercentual: isValidNumber(margemPercentual) ? margemPercentual : 0,
    precoMinimoSugerido: isValidNumber(precoMinimoSugerido) ? precoMinimoSugerido : 0,
    status,
    statusText,
    statusEmoji,
    isValid: true,
  };

  return result;
}

export function formatCurrencyBRL(value: number): string {
  if (!isValidNumber(value)) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentBR(value: number): string {
  if (!isValidNumber(value)) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

export function parseNumberInput(value: string): number {
  if (!value || value.trim() === "") return 0;
  
  const trimmed = value.trim();
  
  const normalized = trimmed.includes(",") && trimmed.includes(".")
    ? trimmed.replace(/\./g, "").replace(",", ".")
    : trimmed.includes(",")
      ? trimmed.replace(",", ".")
      : trimmed;
  
  const hasMultipleDots = (normalized.match(/\./g) || []).length > 1;
  if (hasMultipleDots) return 0;
  
  const parsed = parseFloat(normalized);
  
  if (isNaN(parsed) || !isFinite(parsed)) return 0;
  
  return parsed;
}

export function getComboImprovementTips(result: ComboResult): string[] {
  if (!result.isValid) return [];

  switch (result.status) {
    case "prejuizo":
      return [
        "Revise o preço imediatamente: este combo está consumindo margem.",
        "Confira se gelo, embalagem, entrega e taxa estão sendo considerados.",
        "Teste uma versão menor do combo ou remova adicionais que não aumentam o valor percebido.",
      ];
    case "perigoso":
      return [
        "A margem está apertada. Pequenos descontos podem transformar esse combo em prejuízo.",
        "Tente aumentar o preço ou reduzir custos invisíveis como gelo, embalagem e entrega.",
        "Evite usar esse combo em promoção sem recalcular.",
      ];
    case "aceitavel":
      return [
        "A margem é aceitável, mas ainda vale acompanhar descontos e entrega subsidiada.",
        "Use esse combo como oferta principal, mas preserve o preço mínimo sugerido.",
        "Teste kits com adicionais de maior percepção e baixo custo.",
      ];
    case "saudavel":
      return [
        "Esse combo tem boa margem e pode ser usado como destaque.",
        "Considere transformá-lo em kit fixo na sua vitrine.",
        "Acompanhe se o preço continua saudável quando houver promoção ou entrega grátis.",
      ];
    default:
      return [];
  }
}