"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export const metadata = {
  title: "Combo Sem Prejuízo — Calcule a margem do seu combo",
  description:
    "Calcule o custo real do seu combo, descubra sua margem e veja o preço mínimo para não vender no escuro.",
};

function VenddupSymbol({ size = 28 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="calc-topGrad" x1="95" y1="100" x2="405" y2="255" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#27E8E5" />
          <stop offset="50%" stopColor="#1CC8F2" />
          <stop offset="100%" stopColor="#1595FF" />
        </linearGradient>
        <linearGradient id="calc-blueGrad" x1="110" y1="205" x2="390" y2="430" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A91FF" />
          <stop offset="50%" stopColor="#176BFF" />
          <stop offset="100%" stopColor="#0E4FFF" />
        </linearGradient>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M95 100 L250 252 L405 100" stroke="url(#calc-topGrad)" strokeWidth="74" />
        <path d="M112 214 L250 341 L388 214" stroke="url(#calc-blueGrad)" strokeWidth="58" />
        <path d="M112 302 L250 430 L388 302" stroke="url(#calc-blueGrad)" strokeWidth="58" />
      </g>
    </svg>
  );
}

function IconCalculator() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="8" y2="10.01" />
      <line x1="12" y1="10" x2="12" y2="10.01" />
      <line x1="16" y1="10" x2="16" y2="10.01" />
      <line x1="8" y1="14" x2="8" y2="14.01" />
      <line x1="12" y1="14" x2="12" y2="14.01" />
      <line x1="16" y1="14" x2="16" y2="14.01" />
      <line x1="8" y1="18" x2="8" y2="18.01" />
      <line x1="12" y1="18" x2="12" y2="18.01" />
      <line x1="16" y1="18" x2="16" y2="18.01" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

interface CalculatorInputs {
  nomeCombo: string;
  precoVenda: string;
  custoBebidas: string;
  custoAdicionais: string;
  custoEmbalagemGelo: string;
  custoEntrega: string;
  taxaPagamento: string;
  margemDesejada: string;
}

interface Result {
  custoTotal: number;
  taxaPagamento: number;
  lucroEstimado: number;
  margemPercentual: number;
  precoMinimoSugerido: number;
  status: "prejuizo" | "perigoso" | "aceitavel" | "saudavel";
  statusText: string;
}

export default function ComboSemPrejuizo() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    nomeCombo: "",
    precoVenda: "",
    custoBebidas: "",
    custoAdicionais: "",
    custoEmbalagemGelo: "",
    custoEntrega: "",
    taxaPagamento: "3",
    margemDesejada: "20",
  });

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const result = useMemo((): Result | null => {
    const precoVenda = parseFloat(inputs.precoVenda) || 0;
    const custoBebidas = parseFloat(inputs.custoBebidas) || 0;
    const custoAdicionais = parseFloat(inputs.custoAdicionais) || 0;
    const custoEmbalagemGelo = parseFloat(inputs.custoEmbalagemGelo) || 0;
    const custoEntrega = parseFloat(inputs.custoEntrega) || 0;
    const taxaPagamentoPercentual = parseFloat(inputs.taxaPagamento) || 0;
    const margemDesejadaPercentual = parseFloat(inputs.margemDesejada) || 0;

    if (precoVenda <= 0) return null;

    const custoTotal = custoBebidas + custoAdicionais + custoEmbalagemGelo + custoEntrega;
    const taxaPagamento = precoVenda * (taxaPagamentoPercentual / 100);
    const lucroEstimado = precoVenda - custoTotal - taxaPagamento;
    const margemPercentual = (lucroEstimado / precoVenda) * 100;

    const denominador = 1 - (margemDesejadaPercentual / 100) - (taxaPagamentoPercentual / 100);
    const precoMinimoSugerido = denominador > 0 ? custoTotal / denominador : 0;

    let status: Result["status"];
    let statusText: string;

    if (margemPercentual < 0) {
      status = "prejuizo";
      statusText = "Esse combo está dando prejuízo.";
    } else if (margemPercentual <= 15) {
      status = "perigoso";
      statusText = "Esse combo vende, mas sua margem está perigosa.";
    } else if (margemPercentual <= 30) {
      status = "aceitavel";
      statusText = "Esse combo tem margem aceitável.";
    } else {
      status = "saudavel";
      statusText = "Esse combo está saudável.";
    }

    return {
      custoTotal,
      taxaPagamento,
      lucroEstimado,
      margemPercentual,
      precoMinimoSugerido,
      status,
      statusText,
    };
  }, [inputs]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };

  const scrollToCalculator = () => {
    const el = document.getElementById("calculator");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className="calc-nav" aria-label="Navegação">
        <Link href="/" className="calc-logo" aria-label="Venddup — página inicial">
          <VenddupSymbol size={26} />
          <span className="calc-logo-text">Venddup</span>
        </Link>
      </nav>

      <main>
        <section className="calc-hero">
          <div className="vd-shell">
            <div className="calc-hero-content">
              <div className="calc-pill">
                <IconCalculator />
                Calculadora de combos
              </div>

              <h1 className="calc-headline">
                Você pode estar <em>perdendo dinheiro</em> em cada combo vendido na sua adega.
              </h1>

              <p className="calc-sub">
                Calcule o custo real do seu combo, descubra sua margem e veja o preço mínimo para não vender no escuro.
              </p>

              <button onClick={scrollToCalculator} className="vd-btn primary">
                Calcular meu combo agora
                <IconArrow />
              </button>
            </div>
          </div>
        </section>

        <section id="calculator" className="calc-section">
          <div className="vd-shell">
            <div className="calc-grid">
              <div className="calc-form-card">
                <h2 className="calc-form-title">Dados do combo</h2>

                <div className="calc-field">
                  <label htmlFor="nomeCombo" className="calc-label">
                    Nome do combo
                  </label>
                  <input
                    id="nomeCombo"
                    type="text"
                    className="calc-input"
                    placeholder="Ex: Kit Happy Hour"
                    value={inputs.nomeCombo}
                    onChange={(e) => handleInputChange("nomeCombo", e.target.value)}
                  />
                </div>

                <div className="calc-field">
                  <label htmlFor="precoVenda" className="calc-label">
                    Preço de venda (R$)
                  </label>
                  <input
                    id="precoVenda"
                    type="number"
                    className="calc-input"
                    placeholder="0,00"
                    min="0"
                    step="0.01"
                    value={inputs.precoVenda}
                    onChange={(e) => handleInputChange("precoVenda", e.target.value)}
                  />
                </div>

                <div className="calc-field-group">
                  <div className="calc-field">
                    <label htmlFor="custoBebidas" className="calc-label">
                      Custo das bebidas (R$)
                    </label>
                    <input
                      id="custoBebidas"
                      type="number"
                      className="calc-input"
                      placeholder="0,00"
                      min="0"
                      step="0.01"
                      value={inputs.custoBebidas}
                      onChange={(e) => handleInputChange("custoBebidas", e.target.value)}
                    />
                  </div>

                  <div className="calc-field">
                    <label htmlFor="custoAdicionais" className="calc-label">
                      Custo dos adicionais (R$)
                    </label>
                    <input
                      id="custoAdicionais"
                      type="number"
                      className="calc-input"
                      placeholder="0,00"
                      min="0"
                      step="0.01"
                      value={inputs.custoAdicionais}
                      onChange={(e) => handleInputChange("custoAdicionais", e.target.value)}
                    />
                  </div>
                </div>

                <div className="calc-field-group">
                  <div className="calc-field">
                    <label htmlFor="custoEmbalagemGelo" className="calc-label">
                      Embalagem e gelo (R$)
                    </label>
                    <input
                      id="custoEmbalagemGelo"
                      type="number"
                      className="calc-input"
                      placeholder="0,00"
                      min="0"
                      step="0.01"
                      value={inputs.custoEmbalagemGelo}
                      onChange={(e) => handleInputChange("custoEmbalagemGelo", e.target.value)}
                    />
                  </div>

                  <div className="calc-field">
                    <label htmlFor="custoEntrega" className="calc-label">
                      Entrega subsidiada (R$)
                    </label>
                    <input
                      id="custoEntrega"
                      type="number"
                      className="calc-input"
                      placeholder="0,00"
                      min="0"
                      step="0.01"
                      value={inputs.custoEntrega}
                      onChange={(e) => handleInputChange("custoEntrega", e.target.value)}
                    />
                  </div>
                </div>

                <div className="calc-field-group">
                  <div className="calc-field">
                    <label htmlFor="taxaPagamento" className="calc-label">
                      Taxa de pagamento (%)
                    </label>
                    <input
                      id="taxaPagamento"
                      type="number"
                      className="calc-input"
                      placeholder="3"
                      min="0"
                      max="100"
                      step="0.1"
                      value={inputs.taxaPagamento}
                      onChange={(e) => handleInputChange("taxaPagamento", e.target.value)}
                    />
                  </div>

                  <div className="calc-field">
                    <label htmlFor="margemDesejada" className="calc-label">
                      Margem desejada (%)
                    </label>
                    <input
                      id="margemDesejada"
                      type="number"
                      className="calc-input"
                      placeholder="20"
                      min="0"
                      max="100"
                      step="1"
                      value={inputs.margemDesejada}
                      onChange={(e) => handleInputChange("margemDesejada", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="calc-result-card">
                <h2 className="calc-result-title">Resultado</h2>

                {result ? (
                  <div className="calc-result-content">
                    <div className={`calc-status-badge ${result.status}`}>
                      {result.statusText}
                    </div>

                    <div className="calc-result-grid">
                      <div className="calc-result-item">
                        <span className="calc-result-label">Custo total</span>
                        <span className="calc-result-value">{formatCurrency(result.custoTotal)}</span>
                      </div>

                      <div className="calc-result-item">
                        <span className="calc-result-label">Taxa de pagamento</span>
                        <span className="calc-result-value">{formatCurrency(result.taxaPagamento)}</span>
                      </div>

                      <div className="calc-result-item">
                        <span className="calc-result-label">Lucro estimado</span>
                        <span className={`calc-result-value ${result.lucroEstimado < 0 ? "negative" : ""}`}>
                          {formatCurrency(result.lucroEstimado)}
                        </span>
                      </div>

                      <div className="calc-result-item">
                        <span className="calc-result-label">Margem</span>
                        <span className={`calc-result-value ${result.margemPercentual < 0 ? "negative" : ""}`}>
                          {formatPercent(result.margemPercentual)}
                        </span>
                      </div>
                    </div>

                    <div className="calc-minimo">
                      <span className="calc-minimo-label">Preço mínimo sugerido</span>
                      <span className="calc-minimo-value">
                        {result.precoMinimoSugerido > 0
                          ? formatCurrency(result.precoMinimoSugerido)
                          : "—"}
                      </span>
                      <span className="calc-minimo-note">
                        para margem de {inputs.margemDesejada}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="calc-result-empty">
                    <p>Preencha o preço de venda para ver o resultado.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="calc-upsell">
          <div className="vd-shell">
            <div className="calc-upsell-card">
              <h2 className="calc-upsell-title">
                Agora coloque seus combos em uma vitrine e receba pedidos organizados no WhatsApp.
              </h2>
              <p className="calc-upsell-text">
                Agora que você sabe quais combos dão lucro, o próximo problema é não perder venda respondendo preço manualmente. Com a Venddup, sua adega cria uma vitrine própria, cadastra produtos e kits, recebe pedidos organizados e fecha a venda pelo WhatsApp.
              </p>
              <a
                href="https://app.venddup.com.br/register"
                className="vd-btn primary"
                rel="noopener"
              >
                Criar minha vitrine com Venddup
                <IconArrow />
              </a>
            </div>
          </div>
        </section>

        <footer className="calc-footer">
          <div className="vd-shell">
            <div className="calc-footer-inner">
              <Link href="/" className="calc-logo" aria-label="Venddup — página inicial">
                <VenddupSymbol size={22} />
                <span className="calc-logo-text" style={{ fontSize: "15px" }}>Venddup</span>
              </Link>

              <nav className="calc-footer-links" aria-label="Links do rodapé">
                <Link href="/privacidade">Privacidade</Link>
                <Link href="/termos">Termos de uso</Link>
              </nav>

              <span className="calc-footer-copy">
                © {new Date().getFullYear()} Venddup. Todos os direitos reservados.
              </span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}