import type { Metadata } from "next";
import Link from "next/link";
import { PricingSection } from "./pricing";

export const metadata: Metadata = {
  title: "Venddup — Sua adega vendendo pelo WhatsApp com vitrine própria",
  description:
    "Crie uma vitrine online para sua adega, cadastre produtos e kits, receba pedidos completos e feche tudo pelo WhatsApp da loja. Sem marketplace. Sem checkout complicado.",
};

/* ── ícones SVG inline ───────────────────────────────────── */

function IconStorefront() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconPackage() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconWhatsApp({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function IconBarChart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconGift({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
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

/* Ícones exclusivos do mockup/vitrine */
function IconBottle({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 2h5l.5 4.5A5.5 5.5 0 0117 11v9a2 2 0 01-2 2H9a2 2 0 01-2-2v-9a5.5 5.5 0 012-4.5L9.5 2z" />
      <line x1="8" y1="2" x2="16" y2="2" />
      <line x1="7.5" y1="15" x2="16.5" y2="15" />
    </svg>
  );
}

function IconDocument({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconCart({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6" />
    </svg>
  );
}

/* ── Logo SVG do Venddup ─────────────────────────────────── */
function VenddupSymbol({ size = 28, idPrefix = "vd" }: { size?: number; idPrefix?: string }) {
  const topId = `${idPrefix}-topGrad`;
  const blueId = `${idPrefix}-blueGrad`;
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
        <linearGradient id={topId} x1="95" y1="100" x2="405" y2="255" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#27E8E5" />
          <stop offset="50%" stopColor="#1CC8F2" />
          <stop offset="100%" stopColor="#1595FF" />
        </linearGradient>
        <linearGradient id={blueId} x1="110" y1="205" x2="390" y2="430" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A91FF" />
          <stop offset="50%" stopColor="#176BFF" />
          <stop offset="100%" stopColor="#0E4FFF" />
        </linearGradient>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M95 100 L250 252 L405 100" stroke={`url(#${topId})`} strokeWidth="74" />
        <path d="M112 214 L250 341 L388 214" stroke={`url(#${blueId})`} strokeWidth="58" />
        <path d="M112 302 L250 430 L388 302" stroke={`url(#${blueId})`} strokeWidth="58" />
      </g>
    </svg>
  );
}

/* ── Navbar ──────────────────────────────────────────────── */
function Navbar() {
  return (
    <nav className="lp-nav" aria-label="Navegação principal">
      <Link href="/" className="lp-logo" aria-label="Venddup — página inicial">
        <VenddupSymbol size={30} idPrefix="nav" />
        <span className="lp-logo-text">Venddup</span>
      </Link>

      <div className="lp-nav-links">
        <a href="#como-funciona">Como funciona</a>
        <a href="#funcionalidades">Funcionalidades</a>
        <a href="#preco">Preço</a>
        <a href="#faq">Dúvidas</a>
      </div>

      <a
        href="https://app.venddup.com.br/cadastro"
        className="vd-btn primary sm lp-nav-cta"
        rel="noopener"
      >
        Começar grátis
      </a>
    </nav>
  );
}

/* ── Hero Visual — Stage (desktop, aria-hidden) ──────────── */
function HeroStage() {
  return (
    <div className="lp-stage" aria-hidden="true">
      {/* Cartão 1: Vitrine online */}
      <div className="lp-vitrine-card">
        <div className="lp-vitrine-bar">
          <div className="lp-traffic">
            <span />
            <span />
            <span />
          </div>
          <span className="lp-url-bar">vitrine.venddup.com.br/adega-joao</span>
          <span />
        </div>

        <div className="lp-vitrine-header">
          <div className="lp-store-logo">
            <IconBottle size={20} />
          </div>
          <div className="lp-store-meta">
            <div className="lp-store-name">Adega do João</div>
            <div className="lp-store-tag">Vila Madalena · São Paulo</div>
          </div>
          <span className="vd-status good">
            <span className="vd-dot" />
            Aberta
          </span>
        </div>

        <div className="lp-products-list">
          <div className="lp-product-row">
            <div className="lp-product-thumb wine">
              <IconBottle size={17} />
            </div>
            <div className="lp-product-info">
              <div className="lp-product-name">Bordeaux Reserva 750ml</div>
              <div className="lp-product-cat">Tinto · França</div>
            </div>
            <div className="lp-product-price">R$&nbsp;89,90</div>
          </div>

          <div className="lp-product-row">
            <div className="lp-product-thumb wine">
              <IconBottle size={17} />
            </div>
            <div className="lp-product-info">
              <div className="lp-product-name">Malbec Reserva 750ml</div>
              <div className="lp-product-cat">Tinto · Argentina</div>
            </div>
            <div className="lp-product-price">R$&nbsp;76,00</div>
          </div>

          <div className="lp-product-row">
            <div className="lp-product-thumb kit">
              <IconGift size={17} />
            </div>
            <div className="lp-product-info">
              <div className="lp-product-name">Kit Aniversário Premium</div>
              <div className="lp-product-cat">3 rótulos · caixa inclusa</div>
            </div>
            <div className="lp-product-price lp-price-highlight">R$&nbsp;297,00</div>
          </div>
        </div>

        <div className="lp-vitrine-footer">
          <span className="lp-cart-label">
            <IconCart size={13} />
            1 item no carrinho
          </span>
          <span className="lp-vitrine-view-btn">
            Ver carrinho →
          </span>
        </div>
      </div>

      {/* Cartão 2: Pedido organizado */}
      <div className="lp-order-card">
        <div className="lp-order-top">
          <div>
            <div className="lp-order-id">
              <IconDocument size={14} />
              Pedido #1.247
            </div>
            <div className="lp-order-time">Hoje · 14h32</div>
          </div>
          <span className="vd-status good">Novo</span>
        </div>

        <div className="lp-order-items">
          <div className="lp-order-item">
            <span>Bordeaux Reserva × 2</span>
            <span>R$ 179,80</span>
          </div>
          <div className="lp-order-item">
            <span>Kit Aniversário × 1</span>
            <span>R$ 297,00</span>
          </div>
        </div>

        <div className="lp-order-total">
          <span className="lp-total-label">Total</span>
          <span className="lp-total-value">R$ 476,80</span>
        </div>

        {/* Status decorativo — não é botão clicável */}
        <div className="lp-mockup-status">
          <IconWhatsApp size={14} />
          Confirmar via WhatsApp
        </div>
      </div>

      {/* Cartão 3: notificação WhatsApp */}
      <div className="lp-wa-card">
        <div className="lp-wa-top">
          <div className="lp-wa-icon">
            <IconWhatsApp size={16} />
          </div>
          <div className="lp-wa-meta">
            <div className="lp-wa-name">João Silva</div>
            <div className="lp-wa-sub">Pedido enviado</div>
          </div>
        </div>
        <div className="lp-wa-bubble">
          Oi! Quero o Kit Aniversário + 2 Bordeaux. Total R$&nbsp;476,80. Link da vitrine ✓
        </div>
        <div className="lp-wa-tick">✓✓ Recebido · 14h32</div>
      </div>
    </div>
  );
}

/* ── Hero Stage Mobile (aria-hidden — decorativo) ────────── */
function HeroStageMobile() {
  return (
    <div className="lp-stage-mobile" aria-hidden="true">
      <div className="lp-mobile-order">
        <div className="lp-order-top">
          <div>
            <div className="lp-order-id">
              <IconDocument size={14} />
              Pedido #1.247
            </div>
            <div className="lp-order-time">Hoje · 14h32 · João Silva</div>
          </div>
          <span className="vd-status good">Novo</span>
        </div>

        <div className="lp-order-items" style={{ margin: "16px 0" }}>
          <div className="lp-order-item">
            <span>Bordeaux Reserva × 2</span>
            <span>R$ 179,80</span>
          </div>
          <div className="lp-order-item">
            <span>Kit Aniversário × 1</span>
            <span>R$ 297,00</span>
          </div>
        </div>

        <div className="lp-order-total" style={{ borderTop: "1px solid var(--vd-line)", paddingTop: "12px", marginBottom: "16px" }}>
          <span style={{ color: "var(--vd-muted)", fontSize: "14px" }}>Total</span>
          <span className="lp-total-value">R$ 476,80</span>
        </div>

        {/* Status chip decorativo */}
        <div className="lp-mockup-status">
          <IconWhatsApp size={14} />
          Confirmado via WhatsApp ✓
        </div>
      </div>
    </div>
  );
}

/* ── Trust Bar ───────────────────────────────────────────── */
const trustItems = [
  "Vitrine própria com link para divulgar",
  "Pedido completo formatado",
  "Kits com margem calculada",
  "Sem marketplace",
  "Sem checkout complicado",
  "Cliente escolhe, você confirma",
  "Menos bagunça no WhatsApp",
  "Mais profissional sem complicar",
];

function TrustBar() {
  const doubled = [...trustItems, ...trustItems];
  return (
    <div className="lp-trust" aria-hidden="true">
      <div className="lp-trust-track">
        {doubled.map((item, i) => (
          <span key={i} className="lp-trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--vd-cyan)" aria-hidden="true">
              <circle cx="12" cy="12" r="10" opacity=".2" />
              <path d="M9 12l2 2 4-4" stroke="var(--vd-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Seção: Como funciona ────────────────────────────────── */
const steps = [
  {
    num: "1",
    title: "Cadastre sua adega",
    desc: "Crie sua conta, configure o nome, endereço e horários da loja em minutos.",
  },
  {
    num: "2",
    title: "Adicione produtos e kits",
    desc: "Cadastre seus rótulos com preço e monte kits personalizados para ocasiões especiais.",
  },
  {
    num: "3",
    title: "Compartilhe o link",
    desc: "Sua vitrine tem um link exclusivo. Divulgue no WhatsApp, Instagram ou onde quiser.",
  },
  {
    num: "4",
    title: "Receba pedidos organizados",
    desc: "Seu cliente escolhe tudo na vitrine e você recebe o pedido completo no WhatsApp.",
  },
];

function HowItWorks() {
  return (
    <section id="como-funciona" className="vd-section">
      <div className="vd-shell">
        <div className="lp-section-head">
          <span className="vd-kicker">Como funciona</span>
          <h2 className="lp-section-title">
            Do link compartilhado ao pedido no WhatsApp
          </h2>
          <p className="lp-section-sub">
            Sem app para o cliente instalar. Sem integração complexa. Seu WhatsApp continua sendo o fechamento — o Venddup organiza o pedido antes.
          </p>
        </div>

        <div className="lp-steps">
          {steps.map((s) => (
            <div key={s.num} className="lp-step">
              <div className="lp-step-num">{s.num}</div>
              <h3 className="lp-step-title">{s.title}</h3>
              <p className="lp-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Seção: Funcionalidades ──────────────────────────────── */
type FeatureColor = "cyan" | "violet" | "lime" | "amber" | "green" | "pink";

const features: Array<{
  icon: React.ReactNode;
  color: FeatureColor;
  primary: boolean;
  title: string;
  desc: string;
}> = [
  /* Primárias: os 3 maiores diferenciais */
  {
    icon: <IconStorefront />,
    color: "cyan",
    primary: true,
    title: "Vitrine própria",
    desc: "Link exclusivo da sua adega para divulgar no WhatsApp, Instagram ou onde quiser. Sem marketplace, sem comissão.",
  },
  {
    icon: <IconPackage />,
    color: "amber",
    primary: true,
    title: "Pedido completo",
    desc: "Em vez de áudio, print e mensagem perdida, você recebe um pedido completo e organizado para confirmar.",
  },
  {
    icon: <IconGift />,
    color: "lime",
    primary: true,
    title: "Kits com margem",
    desc: "Monte kits presenteáveis com rótulos da sua adega. O sistema mostra a margem de cada kit automaticamente.",
  },
  /* Secundárias: suporte às primárias */
  {
    icon: <IconGrid />,
    color: "violet",
    primary: false,
    title: "Catálogo ilimitado",
    desc: "Cadastre quantos produtos quiser com foto, descrição, preço e categoria. Fácil de atualizar.",
  },
  {
    icon: <IconWhatsApp />,
    color: "green",
    primary: false,
    title: "Notificação no WhatsApp",
    desc: "Cada pedido novo chega no WhatsApp da loja com todos os dados: itens, cliente, endereço e total.",
  },
  {
    icon: <IconBarChart />,
    color: "pink",
    primary: false,
    title: "Dashboard de pedidos",
    desc: "Acompanhe todos os pedidos em um painel simples. Veja histórico, status e valores em um lugar só.",
  },
];

function Features() {
  return (
    <section id="funcionalidades" className="vd-section">
      <div className="vd-shell">
        <div className="lp-section-head">
          <span className="vd-kicker">Funcionalidades</span>
          <h2 className="lp-section-title">
            Tudo que sua adega precisa no Starter
          </h2>
          <p className="lp-section-sub">
            Um conjunto focado no que realmente funciona para adegas que vendem pelo WhatsApp. Sem exagero, sem recurso que você não vai usar.
          </p>
        </div>

        <div className="lp-features-grid">
          {features.map((f, i) => (
            <div key={i} className={`lp-feature-card${f.primary ? " primary" : ""}`}>
              <div className={`lp-feature-icon ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="lp-feature-title">{f.title}</h3>
              <p className="lp-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Seção: Copy de conversão ────────────────────────────── */
const conversionItems = [
  {
    icon: <IconWhatsApp size={22} />,
    color: "green" as FeatureColor,
    text: "Seu WhatsApp continua sendo o fechamento. O Venddup organiza o pedido antes de chegar pra você.",
  },
  {
    icon: <IconDocument size={22} />,
    color: "cyan" as FeatureColor,
    text: "Em vez de áudio, print e mensagem perdida, você recebe um pedido completo com tudo que precisa.",
  },
  {
    icon: <IconLink />,
    color: "violet" as FeatureColor,
    text: "Cadastre produtos, monte kits e compartilhe um link bonito da sua adega. Simples assim.",
  },
];

function ConversionCopy() {
  return (
    <section className="vd-section tight">
      <div className="vd-shell">
        <div className="lp-conv-grid">
          {conversionItems.map((item, i) => (
            <div key={i} className="vd-card lp-conv-card">
              <span className={`lp-conv-icon ${item.color}`}>
                {item.icon}
              </span>
              <p className="lp-conv-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ── Seção: FAQ ──────────────────────────────────────────── */
const faqs = [
  {
    q: "O Venddup substitui o WhatsApp da minha adega?",
    a: (
      <>
        Não. <strong>Seu WhatsApp continua sendo o canal de fechamento.</strong> O Venddup organiza o pedido antes de chegar pra você. O cliente escolhe tudo na vitrine e envia um pedido completo para o seu WhatsApp — sem áudios, sem prints, sem mensagem perdida.
      </>
    ),
  },
  {
    q: "Meu cliente precisa instalar algum aplicativo?",
    a: (
      <>
        Não. A vitrine abre direto no navegador do celular, sem cadastro e sem app para instalar. Você compartilha o link e o cliente acessa na hora. <strong>É como um cardápio digital da sua adega.</strong>
      </>
    ),
  },
  {
    q: "Como meu cliente faz o pedido?",
    a: (
      <>
        O cliente acessa a vitrine pelo link, escolhe produtos e kits, adiciona ao carrinho e envia o pedido. <strong>Você recebe a notificação no WhatsApp da loja</strong> com o pedido completo: itens, quantidades, endereço e total. Você confirma disponibilidade e combina entrega e pagamento manualmente.
      </>
    ),
  },
  {
    q: "Funciona para kits presenteáveis e cestas?",
    a: (
      <>
        Sim. Você monta os kits no painel com os rótulos que quiser, define o preço e uma foto. <strong>O sistema mostra a margem de cada kit</strong> para você saber o quanto está ganhando. O kit aparece na vitrine com destaque.
      </>
    ),
  },
  {
    q: "O Venddup processa pagamento ou entrega?",
    a: (
      <>
        Não. O Venddup <strong>não é um checkout de e-commerce.</strong> O pagamento (Pix, dinheiro, cartão) e a entrega são combinados diretamente entre você e o cliente no WhatsApp, do jeito que você já faz hoje. O Venddup apenas organiza o pedido antes desse contato.
      </>
    ),
  },
  {
    q: "Posso cancelar quando quiser?",
    a: (
      <>
        Sim. Não existe fidelidade mínima. Você começa com 30 dias grátis e, se decidir continuar, paga R$97/mês. <strong>Pode cancelar a qualquer momento</strong> pelo painel sem burocracia.
      </>
    ),
  },
];

function FAQ() {
  return (
    <section id="faq" className="vd-section">
      <div className="vd-shell">
        <div className="lp-section-head">
          <span className="vd-kicker">Dúvidas frequentes</span>
          <h2 className="lp-section-title">Perguntas que a gente já sabe que você tem</h2>
        </div>

        <div className="lp-faq">
          {faqs.map((item, i) => (
            <details key={i}>
              <summary>
                {item.q}
                <span className="lp-faq-chevron" aria-hidden="true">
                  <IconChevronDown />
                </span>
              </summary>
              <div className="lp-faq-body">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Final ───────────────────────────────────────────── */
function CTAFinal() {
  return (
    <section className="lp-cta-section">
      <div className="lp-cta-glow" aria-hidden="true" />
      <div className="vd-shell" style={{ position: "relative" }}>
        <span className="vd-kicker" style={{ display: "block", marginBottom: "16px" }}>
          Pronto para começar?
        </span>
        <h2
          className="lp-section-title"
          style={{ maxWidth: "600px", margin: "0 auto 16px" }}
        >
          Sua adega vendendo pelo WhatsApp com vitrine própria.
        </h2>
        <p
          style={{
            color: "var(--vd-muted)",
            fontSize: "16px",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.65,
          }}
        >
          Comece com 30 dias grátis. Sem cartão. Cancele quando quiser.
        </p>

        <div className="lp-cta-actions">
          <a
            href="https://app.venddup.com.br/cadastro"
            className="vd-btn primary"
            rel="noopener"
            style={{ padding: "16px 32px", fontSize: "16px" }}
          >
            Começar teste grátis
            <IconArrow />
          </a>
          <a
            href="https://demo.venddup.com.br"
            className="vd-btn ghost"
            rel="noopener"
          >
            <IconLink />
            Ver exemplo de vitrine
          </a>
        </div>

        <p
          style={{
            marginTop: "18px",
            color: "var(--vd-faint)",
            fontSize: "13px",
            fontFamily: "var(--vd-font-mono)",
          }}
        >
          Sem marketplace. Sem checkout complicado. Seu cliente escolhe, sua adega confirma.
        </p>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="lp-footer">
      <div className="vd-shell">
        <div className="lp-footer-inner">
          <Link href="/" className="lp-logo" aria-label="Venddup — página inicial">
            <VenddupSymbol size={24} idPrefix="footer" />
            <span className="lp-logo-text" style={{ fontSize: "16px" }}>Venddup</span>
          </Link>

          <nav className="lp-footer-links" aria-label="Links do rodapé">
            <a href="https://app.venddup.com.br/politicas/privacidade" rel="noopener">
              Privacidade
            </a>
            <a href="https://app.venddup.com.br/politicas/termos" rel="noopener">
              Termos de uso
            </a>
            <a href="https://app.venddup.com.br/suporte" rel="noopener">
              Suporte
            </a>
          </nav>

          <span className="lp-footer-copy">
            © {year} Venddup. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ── Página principal ────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section id="hero" className="lp-hero">
          <div className="vd-shell">
            <div className="lp-hero-grid">
              {/* Coluna esquerda: copy */}
              <div className="lp-hero-copy">
                <div className="vd-pill lp-badge">
                  <span className="vd-dot" />
                  Venddup Starter · R$97/mês
                </div>

                <h1 className="lp-headline">
                  Sua adega vendendo pelo WhatsApp com{" "}
                  <em>vitrine própria</em> e pedidos organizados.
                </h1>

                <p className="lp-sub">
                  Crie uma vitrine online para sua adega, cadastre produtos e kits, receba pedidos completos e feche tudo pelo WhatsApp da loja.
                </p>

                <div className="lp-actions">
                  <a
                    href="https://app.venddup.com.br/cadastro"
                    className="vd-btn primary"
                    rel="noopener"
                  >
                    Começar teste grátis
                    <IconArrow />
                  </a>
                  <a
                    href="https://demo.venddup.com.br"
                    className="vd-btn ghost"
                    rel="noopener"
                  >
                    <IconLink />
                    Ver exemplo de vitrine
                  </a>
                </div>

                <p className="lp-microcopy">
                  Sem marketplace. Sem checkout complicado. Seu cliente escolhe, sua adega confirma.
                </p>
              </div>

              {/* Coluna direita: visual */}
              <HeroStage />
              <HeroStageMobile />
            </div>
          </div>
        </section>

        {/* ── Trust bar ── */}
        <TrustBar />

        {/* ── Como funciona ── */}
        <HowItWorks />

        <div className="lp-divider" />

        {/* ── Funcionalidades ── */}
        <Features />

        <div className="lp-divider" />

        {/* ── Copy de conversão ── */}
        <ConversionCopy />

        <div className="lp-divider" />

        {/* ── Preço ── */}
        <PricingSection />

        <div className="lp-divider" />

        {/* ── FAQ ── */}
        <FAQ />

        {/* ── CTA Final ── */}
        <CTAFinal />
      </main>

      <Footer />
    </>
  );
}
