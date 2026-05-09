"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { calculateCombo, formatCurrencyBRL, formatPercentBR, parseNumberInput, type ComboResult } from "../../lib/combo-calculator";

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

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
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

const formatSafe = (value: number, type: "currency" | "percent"): string => {
  if (type === "currency") {
    return formatCurrencyBRL(value);
  }
  return formatPercentBR(value);
};

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

  const result = useMemo((): ComboResult | null => {
    const comboResult = calculateCombo({
      precoVenda: parseNumberInput(inputs.precoVenda),
      custoBebidas: parseNumberInput(inputs.custoBebidas),
      custoAdicionais: parseNumberInput(inputs.custoAdicionais),
      custoEmbalagemGelo: parseNumberInput(inputs.custoEmbalagemGelo),
      custoEntrega: parseNumberInput(inputs.custoEntrega),
      taxaPagamentoPercentual: parseNumberInput(inputs.taxaPagamento),
      margemDesejadaPercentual: parseNumberInput(inputs.margemDesejada),
    });

    if (!comboResult.isValid) return null;

    return comboResult;
  }, [inputs]);

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
                Calculadora de margem
              </div>

              <h1 className="calc-headline">
                Você pode estar <em>perdendo dinheiro</em> em cada combo vendido na sua adega.
              </h1>

              <p className="calc-sub">
                Descubra o custo real do seu combo e nunca mais vendê-lo no escuro.
              </p>

              <button onClick={scrollToCalculator} className="vd-btn primary">
                Calcular agora
                <IconArrow />
              </button>
            </div>
          </div>
        </section>

        <section className="calc-why">
          <div className="vd-shell">
            <div className="calc-why-content">
              <h2 className="calc-why-title">Por que isso acontece?</h2>
              <p className="calc-why-text">
                A maioria dos donos de adega considera só o custo da bebida na hora de precificar o combo. Mas existem outros custos que pesam no resultado:
              </p>
              <ul className="calc-why-list">
                <li><span className="calc-why-bullet">Gelo</span> — quanto você gasta por combo?</li>
                <li><span className="calc-why-bullet">Energético</span> — se vem incluído, quanto custa?</li>
                <li><span className="calc-why-bullet">Embalagem</span> — caixas, sacolas, copos, taças</li>
                <li><span className="calc-why-bullet">Entrega</span> — se você subsidia, quanto sai por pedido?</li>
                <li><span className="calc-why-bullet">Taxa da máquina</span> — o percentual que vai para a bandeira</li>
                <li><span className="calc-why-bullet">Desconto</span> — se dá pra amigo, quanto deixa de ganhar?</li>
              </ul>
              <p className="calc-why-note">
                Esses custos parecem pequenos sozinhos, mas juntos podem transformar um combo aparentemente lucrativo em prejuízo.
              </p>
            </div>
          </div>
        </section>

        <section id="calculator" className="calc-section">
          <div className="vd-shell">
            <div className="calc-section-header">
              <h2 className="calc-section-title">O que a calculadora mostra?</h2>
              <p className="calc-section-sub">
                Tudo que você precisa saber para precificar sem erro:
              </p>
            </div>
            
            <div className="calc-features-grid">
              <div className="calc-feature-item">
                <span className="calc-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                </span>
                <span className="calc-feature-title">Custo total</span>
                <span className="calc-feature-desc">Quanto você gasta de verdade no combo</span>
              </div>
              <div className="calc-feature-item">
                <span className="calc-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                </span>
                <span className="calc-feature-title">Lucro por combo</span>
                <span className="calc-feature-desc">O que sobra depois de pagar tudo</span>
              </div>
              <div className="calc-feature-item">
                <span className="calc-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </span>
                <span className="calc-feature-title">Margem real</span>
                <span className="calc-feature-desc">Percentual que realmente fica na sua mão</span>
              </div>
              <div className="calc-feature-item">
                <span className="calc-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </span>
                <span className="calc-feature-title">Preço mínimo</span>
                <span className="calc-feature-desc">O menor preço pra não sair no prejuízo</span>
              </div>
            </div>

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
                    placeholder="Ex: Kit Happy Hour, Combo Presente"
                    value={inputs.nomeCombo}
                    onChange={(e) => handleInputChange("nomeCombo", e.target.value)}
                  />
                </div>

                <div className="calc-field">
                  <label htmlFor="precoVenda" className="calc-label">
                    Por quanto você vende este combo?
                  </label>
                  <div className="calc-input-wrapper">
                    <span className="calc-input-prefix">R$</span>
                    <input
                      id="precoVenda"
                      type="text"
                      inputMode="decimal"
                      className="calc-input calc-input-with-prefix"
                      placeholder="149,90"
                      
                      value={inputs.precoVenda}
                      onChange={(e) => handleInputChange("precoVenda", e.target.value)}
                    />
                  </div>
                </div>

                <div className="calc-field-section">
                  <span className="calc-field-section-title">Custos</span>
                </div>

                <div className="calc-field">
                  <label htmlFor="custoBebidas" className="calc-label">
                    Custo das bebidas
                  </label>
                  <div className="calc-input-wrapper">
                    <span className="calc-input-prefix">R$</span>
                    <input
                      id="custoBebidas"
                      type="text"
                      inputMode="decimal"
                      className="calc-input calc-input-with-prefix"
                      placeholder="Ex: 45,00"
                      
                      value={inputs.custoBebidas}
                      onChange={(e) => handleInputChange("custoBebidas", e.target.value)}
                    />
                  </div>
                </div>

                <div className="calc-field">
                  <label htmlFor="custoAdicionais" className="calc-label">
                    Custo dos adicionais
                  </label>
                  <div className="calc-input-wrapper">
                    <span className="calc-input-prefix">R$</span>
                    <input
                      id="custoAdicionais"
                      type="text"
                      inputMode="decimal"
                      className="calc-input calc-input-with-prefix"
                      placeholder="Ex: 5,00 (taças, snacks)"
                      
                      value={inputs.custoAdicionais}
                      onChange={(e) => handleInputChange("custoAdicionais", e.target.value)}
                    />
                  </div>
                </div>

                <div className="calc-field">
                  <label htmlFor="custoEmbalagemGelo" className="calc-label">
                    Embalagem e gelo
                  </label>
                  <div className="calc-input-wrapper">
                    <span className="calc-input-prefix">R$</span>
                    <input
                      id="custoEmbalagemGelo"
                      type="text"
                      inputMode="decimal"
                      className="calc-input calc-input-with-prefix"
                      placeholder="Ex: 8,00"
                      
                      value={inputs.custoEmbalagemGelo}
                      onChange={(e) => handleInputChange("custoEmbalagemGelo", e.target.value)}
                    />
                  </div>
                </div>

                <div className="calc-field">
                  <label htmlFor="custoEntrega" className="calc-label">
                    Entrega subsidiada (se aplicável)
                  </label>
                  <div className="calc-input-wrapper">
                    <span className="calc-input-prefix">R$</span>
                    <input
                      id="custoEntrega"
                      type="text"
                      inputMode="decimal"
                      className="calc-input calc-input-with-prefix"
                      placeholder="Ex: 12,00 (ou 0 se cliente paga)"
                      
                      value={inputs.custoEntrega}
                      onChange={(e) => handleInputChange("custoEntrega", e.target.value)}
                    />
                  </div>
                </div>

                <div className="calc-field-section">
                  <span className="calc-field-section-title">Parâmetros</span>
                </div>

                <div className="calc-field-group">
                  <div className="calc-field">
                    <label htmlFor="taxaPagamento" className="calc-label">
                      Taxa de pagamento
                    </label>
                    <div className="calc-input-wrapper">
                      <input
                        id="taxaPagamento"
                        type="text"
                      inputMode="decimal"
                        className="calc-input calc-input-with-suffix"
                        placeholder="3,5"

                        value={inputs.taxaPagamento}
                        onChange={(e) => handleInputChange("taxaPagamento", e.target.value)}
                      />
                      <span className="calc-input-suffix">%</span>
                    </div>
                    <span className="calc-field-hint">% da venda que vai para a máquina</span>
                  </div>

                  <div className="calc-field">
                    <label htmlFor="margemDesejada" className="calc-label">
                      Margem desejada
                    </label>
                    <div className="calc-input-wrapper">
                      <input
                        id="margemDesejada"
                        type="text"
                      inputMode="decimal"
                        className="calc-input calc-input-with-suffix"
                        placeholder="20"
                        min="0"
                        max="100"
                        step="1"
                        value={inputs.margemDesejada}
                        onChange={(e) => handleInputChange("margemDesejada", e.target.value)}
                      />
                      <span className="calc-input-suffix">%</span>
                    </div>
                    <span className="calc-field-hint">% de lucro que você quer ter</span>
                  </div>
                </div>
              </div>

              <div className="calc-result-wrapper">
                {result ? (
                  <div className={`calc-result-card ${result.status}`}>
                    <div className="calc-result-header">
                      <span className="calc-result-emoji">{result.statusEmoji}</span>
                      <span className="calc-result-status">{result.statusText}</span>
                    </div>

                    <div className="calc-result-impact">
                      {result.lucroEstimado < 0 ? (
                        <p className="calc-result-impact-text negative">
                          Com esse preço, você perde aproximadamente <strong>{formatSafe(Math.abs(result.lucroEstimado), "currency")}</strong> por combo vendido.
                        </p>
                      ) : (
                        <p className="calc-result-impact-text positive">
                          Com esse preço, cada combo vendido deixa aproximadamente <strong>{formatSafe(result.lucroEstimado, "currency")}</strong> de lucro.
                        </p>
                      )}
                    </div>

                    <div className="calc-result-grid">
                      <div className="calc-result-item">
                        <span className="calc-result-label">Receita</span>
                        <span className="calc-result-value">
                          {formatSafe(parseNumberInput(inputs.precoVenda), "currency")}
                        </span>
                      </div>

                      <div className="calc-result-item">
                        <span className="calc-result-label">Custo total</span>
                        <span className="calc-result-value cost">
                          − {formatSafe(result.custoTotal, "currency")}
                        </span>
                      </div>

                      <div className="calc-result-item">
                        <span className="calc-result-label">Taxa pagamento</span>
                        <span className="calc-result-value cost">
                          − {formatSafe(result.taxaPagamento, "currency")}
                        </span>
                      </div>

                      <div className="calc-result-item highlight">
                        <span className="calc-result-label">Sua margem</span>
                        <span className={`calc-result-value margin ${result.margemPercentual < 0 ? "negative" : "positive"}`}>
                          {formatSafe(result.margemPercentual, "percent")}
                        </span>
                      </div>
                    </div>

                    {result.precoMinimoSugerido > 0 && result.margemPercentual < parseNumberInput(inputs.margemDesejada) && (
                      <div className="calc-result-suggestion">
                        <div className="calc-suggestion-icon">
                          <IconCheck />
                        </div>
                        <div className="calc-suggestion-content">
                          <p className="calc-suggestion-text">
                            Para buscar uma margem de <strong>{inputs.margemDesejada}%</strong>, o preço mínimo é:
                          </p>
                          <span className="calc-suggestion-value">
                            {formatSafe(result.precoMinimoSugerido, "currency")}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="calc-result-microcopy">
                      <p>Essa conta é uma estimativa operacional. O objetivo é evitar promoção no escuro.</p>
                    </div>
                  </div>
                ) : (
                  <div className="calc-result-card calc-result-empty">
                    <div className="calc-empty-icon">
                      <IconCalculator />
                    </div>
                    <p className="calc-empty-title">Preencha os dados</p>
                    <p className="calc-empty-text">
                      Comece pelo <strong>preço de venda</strong> do seu combo para ver a análise.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="calc-after">
          <div className="vd-shell">
            <div className="calc-after-content">
              <h2 className="calc-after-title">Depois do cálculo</h2>
              <p className="calc-after-text">
                Saber o preço certo é o primeiro passo. O segundo é vender esse combo de forma organizada.
              </p>
              <p className="calc-after-sub">
                Se você hoje recebe pedidos pelo WhatsApp sem estrutura, sabe como é: cliente mandando lista, você respondendo preço, confirmando endereço, combinando pagamento. Uma venda que poderia levar 30 segundos vira uma troca de 10 mensagens.
              </p>
            </div>
          </div>
        </section>

        <section className="calc-venddup">
          <div className="vd-shell">
            <div className="calc-venddup-card">
              <h2 className="calc-venddup-title">
                Transforme seus combos em uma vitrine pronta para receber pedidos.
              </h2>
              <p className="calc-venddup-text">
                Com a Venddup, sua adega cria uma vitrine própria, cadastra produtos e kits, configura bairros e taxas, recebe pedidos organizados e finaliza pelo WhatsApp.
              </p>
              <a
                href="https://app.venddup.com.br/register"
                className="vd-btn primary calc-venddup-btn"
                rel="noopener"
              >
                Criar minha vitrine na Venddup
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