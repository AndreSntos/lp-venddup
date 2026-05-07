import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policy-layout";

export const metadata: Metadata = {
  title: "Suporte — Venddup",
  description:
    "Precisa de ajuda com sua vitrine, assinatura ou pedidos? Entre em contato com o suporte Venddup.",
};

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const faqs = [
  {
    q: "Como cancelo minha assinatura?",
    a: "Acesse o painel do Venddup → Configurações → Assinatura → Cancelar. Sem burocracia, sem ligação.",
  },
  {
    q: "Minha vitrine não está abrindo. O que faço?",
    a: "Verifique se a vitrine está publicada no painel (Minha Vitrine → Publicar). Se ainda não funcionar, entre em contato pelo e-mail abaixo.",
  },
  {
    q: "Posso mudar meu link de vitrine?",
    a: "Sim. Acesse o painel → Configurações da loja → Slug. O link será atualizado imediatamente.",
  },
  {
    q: "Não recebi a notificação de pedido no WhatsApp.",
    a: "Confirme que o número de WhatsApp da loja está correto no painel → Configurações → WhatsApp. O número deve estar no formato internacional (+5511...).",
  },
  {
    q: "Como reporto um problema de cobrança?",
    a: "Envie um e-mail para suporte@venddup.com.br com o assunto 'Contestação de cobrança' e o mês referente. Respondemos em até 2 dias úteis.",
  },
];

export default function SupportPage() {
  return (
    <PolicyLayout>
      <div className="vd-shell">
        <span className="vd-kicker">Ajuda</span>
        <h1 className="lp-legal-title">Suporte Venddup</h1>
        <p className="lp-legal-updated">Estamos aqui para ajudar</p>

        <p className="lp-legal-intro">
          Precisa de ajuda com sua vitrine, assinatura ou pedidos?
          Entre em contato com o suporte Venddup pelos canais abaixo.
        </p>

        {/* Canais de contato */}
        <div className="lp-support-channels">
          <a
            href="mailto:suporte@venddup.com.br"
            className="lp-support-card"
          >
            <div className="lp-support-icon cyan">
              <IconMail />
            </div>
            <div>
              <p className="lp-support-label">E-mail</p>
              <p className="lp-support-value">suporte@venddup.com.br</p>
              <p className="lp-support-note">Resposta em até 1 dia útil</p>
            </div>
          </a>

          <a
            href="https://wa.me/5511999999999?text=Olá! Preciso de suporte com minha conta Venddup."
            target="_blank"
            rel="noopener noreferrer"
            className="lp-support-card lp-support-card-wa"
          >
            <div className="lp-support-icon green">
              <IconWhatsApp />
            </div>
            <div>
              <p className="lp-support-label">WhatsApp</p>
              <p className="lp-support-value">Resposta rápida</p>
              <p className="lp-support-note">Dias úteis das 9h às 18h</p>
            </div>
          </a>
        </div>

        {/* FAQ */}
        <div className="lp-legal-body" style={{ marginTop: "48px" }}>
          <h2 className="lp-support-faq-title">Perguntas frequentes</h2>

          {faqs.map((item) => (
            <div key={item.q} className="lp-legal-section">
              <h2>{item.q}</h2>
              <p>{item.a}</p>
            </div>
          ))}
        </div>

        <div className="lp-legal-contact">
          <p>
            Não encontrou o que precisava?{" "}
            <a href="mailto:suporte@venddup.com.br" className="lp-legal-link">
              Mande um e-mail
            </a>{" "}
            e te ajudamos.
          </p>
        </div>
      </div>
    </PolicyLayout>
  );
}
