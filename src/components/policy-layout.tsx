import Link from "next/link";

/* Símbolo Venddup inline — evita dependência circular com page.tsx */
function VenddupMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      viewBox="0 0 500 500"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="pl-top" x1="95" y1="100" x2="405" y2="255" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#27E8E5" />
          <stop offset="50%"  stopColor="#1CC8F2" />
          <stop offset="100%" stopColor="#1595FF" />
        </linearGradient>
        <linearGradient id="pl-blue" x1="110" y1="205" x2="390" y2="430" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#2A91FF" />
          <stop offset="50%"  stopColor="#176BFF" />
          <stop offset="100%" stopColor="#0E4FFF" />
        </linearGradient>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M95 100 L250 252 L405 100"  stroke="url(#pl-top)"  strokeWidth="74" />
        <path d="M112 214 L250 341 L388 214" stroke="url(#pl-blue)" strokeWidth="58" />
        <path d="M112 302 L250 430 L388 302" stroke="url(#pl-blue)" strokeWidth="58" />
      </g>
    </svg>
  );
}

export function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="vd-grid-bg"  aria-hidden="true" />
      <div className="vd-noise"    aria-hidden="true" />

      <header className="lp-legal-header">
        <div className="vd-shell lp-legal-header-inner">
          <Link href="/" className="lp-logo" aria-label="Venddup — página inicial">
            <VenddupMark />
            <span className="lp-logo-text">Venddup</span>
          </Link>
          <Link href="/" className="lp-legal-back">
            ← Início
          </Link>
        </div>
      </header>

      <main className="lp-legal-main">
        {children}
      </main>

      <footer className="lp-legal-footer">
        <div className="vd-shell lp-legal-footer-inner">
          <nav className="lp-legal-footer-links" aria-label="Links legais">
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos de uso</Link>
            <Link href="/suporte">Suporte</Link>
          </nav>
          <span className="lp-footer-copy">© {year} Venddup. Todos os direitos reservados.</span>
        </div>
      </footer>
    </>
  );
}
