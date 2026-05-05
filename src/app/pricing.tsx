"use client";

import { useState } from "react";

type Period = "anual" | "semestral" | "mensal";

const periods: Array<{ id: Period; label: string; tag: string | null }> = [
  { id: "anual",     label: "Anual",      tag: "2 meses grátis" },
  { id: "semestral", label: "Semestral",  tag: "Economize 10%"  },
  { id: "mensal",    label: "Mensal",     tag: null              },
];

const starterPricing: Record<Period, { main: string; period: string; note: string }> = {
  anual:     { main: "970",  period: "/ano",       note: "≈ R$ 80,83/mês · 30 dias grátis" },
  semestral: { main: "522",  period: "/semestre",  note: "≈ R$ 87,00/mês · 30 dias grátis" },
  mensal:    { main: "97",   period: "/mês",       note: "30 dias grátis · Sem fidelidade"  },
};

const starterFeatures: React.ReactNode[] = [
  <>Vitrine própria com <strong>link exclusivo</strong></>,
  <>Catálogo <strong>ilimitado</strong> de produtos</>,
  <>Kits com <strong>margem calculada</strong></>,
  <>Pedidos completos <strong>no WhatsApp</strong></>,
  <><strong>Chave Pix</strong> fixa da adega</>,
  <><strong>Dashboard</strong> de pedidos e histórico</>,
  <>Políticas e <strong>confirmação 18+</strong></>,
  <>Suporte via <strong>WhatsApp</strong></>,
];

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function GlowIcon() {
  return (
    <div className="lp-pricing-glow" aria-hidden="true" />
  );
}

export function PricingSection() {
  const [period, setPeriod] = useState<Period>("anual");
  const pricing = starterPricing[period];

  return (
    <section id="preco" className="vd-section">
      <div className="vd-shell">

        {/* Cabeçalho da seção */}
        <div className="lp-section-head">
          <span className="vd-kicker">Preço</span>
          <h2 className="lp-section-title">
            Escolha como sua adega quer começar
          </h2>
          <p className="lp-section-sub">
            Comece no Starter e escolha a forma de pagamento que faz mais sentido para a sua operação.
          </p>
        </div>

        {/* Toggle de forma de cobrança */}
        <div className="lp-period-wrap">
          <div className="lp-period-toggle" role="group" aria-label="Forma de cobrança">
            {periods.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`lp-period-btn${period === p.id ? " active" : ""}`}
                onClick={() => setPeriod(p.id)}
                aria-pressed={period === p.id}
              >
                {p.label}
                {p.tag && (
                  <span className="lp-period-tag">{p.tag}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de planos */}
        <div className="lp-plans-grid">

          {/* ── Starter — disponível agora ── */}
          <div className="lp-plan-card starter">
            <GlowIcon />

            <div className="lp-plan-header">
              <div className="lp-plan-available-badge">
                <span className="vd-dot" />
                Disponível agora
              </div>

              <h3 className="lp-plan-name">Starter</h3>

              <p className="lp-plan-desc">
                Para adegas que querem publicar uma vitrine própria e receber pedidos organizados pelo WhatsApp.
              </p>

              <div className="lp-price lp-price-top">
                <span className="lp-price-currency">R$</span>
                <span className="lp-price-amount">{pricing.main}</span>
                <span className="lp-price-period">{pricing.period}</span>
              </div>
              <p className="lp-price-note">{pricing.note}</p>
            </div>

            <div className="lp-plan-body">
              <ul className="lp-features-list">
                {starterFeatures.map((feat, i) => (
                  <li key={i} className="lp-feature-item">
                    <div className="lp-check-icon">
                      <CheckIcon />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="lp-plan-cta-wrap">
                <a
                  href="https://app.venddup.com.br/cadastro"
                  className="vd-btn primary lp-plan-cta-btn"
                  rel="noopener"
                >
                  Começar teste grátis
                  <ArrowIcon />
                </a>
                <p className="lp-trial-note">
                  Sem cartão · Cancele quando quiser
                </p>
              </div>
            </div>
          </div>

          {/* ── Essencial — em breve ── */}
          <div className="lp-plan-card soon" aria-label="Essencial — em breve">
            <div className="lp-plan-header">
              <div className="lp-plan-soon-badge">Em breve</div>

              <h3 className="lp-plan-name lp-plan-name-soon">Essencial</h3>

              <p className="lp-plan-desc">
                Para adegas que querem mais controle operacional depois de validar a vitrine.
              </p>
            </div>

            <div className="lp-plan-body lp-plan-body-soon">
              <ul className="lp-soon-list">
                <li className="lp-soon-item">
                  <span className="lp-soon-dot" aria-hidden="true" />
                  Mais recursos de organização
                </li>
                <li className="lp-soon-item">
                  <span className="lp-soon-dot" aria-hidden="true" />
                  Mais visão da operação
                </li>
                <li className="lp-soon-item">
                  <span className="lp-soon-dot" aria-hidden="true" />
                  Evolução para times maiores
                </li>
              </ul>

              <div className="lp-btn-soon">Em breve</div>
            </div>
          </div>

          {/* ── Pro — em breve ── */}
          <div className="lp-plan-card soon" aria-label="Pro — em breve">
            <div className="lp-plan-header">
              <div className="lp-plan-soon-badge">Em breve</div>

              <h3 className="lp-plan-name lp-plan-name-soon">Pro</h3>

              <p className="lp-plan-desc">
                Para adegas com operação mais madura e necessidade de crescimento.
              </p>
            </div>

            <div className="lp-plan-body lp-plan-body-soon">
              <ul className="lp-soon-list">
                <li className="lp-soon-item">
                  <span className="lp-soon-dot" aria-hidden="true" />
                  Mais recursos avançados
                </li>
                <li className="lp-soon-item">
                  <span className="lp-soon-dot" aria-hidden="true" />
                  Mais suporte à expansão
                </li>
                <li className="lp-soon-item">
                  <span className="lp-soon-dot" aria-hidden="true" />
                  Preparado para próximas etapas do Venddup
                </li>
              </ul>

              <div className="lp-btn-soon">Em breve</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
