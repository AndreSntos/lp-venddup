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