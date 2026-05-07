import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policy-layout";

export const metadata: Metadata = {
  title: "Política de Privacidade — Venddup",
  description:
    "Como o Venddup coleta, usa e protege os dados da sua adega. Conformidade com a LGPD.",
};

const sections = [
  {
    title: "1. Dados coletados",
    body: "Coletamos os dados mínimos necessários para o funcionamento do serviço: nome, e-mail e senha do usuário (dono da adega); informações da loja (nome, slug, WhatsApp, endereço); dados dos pedidos recebidos via vitrine (nome, telefone e endereço do cliente final informados no pedido).",
  },
  {
    title: "2. Finalidade do uso dos dados",
    body: "Os dados da adega são usados para: operar a plataforma, gerar a vitrine pública, processar a assinatura via Stripe e enviar comunicações de suporte. Os dados dos pedidos são usados para gerar a mensagem do WhatsApp e registrar o histórico no painel — não usamos esses dados para nenhuma outra finalidade.",
  },
  {
    title: "3. Base legal (LGPD)",
    body: "O tratamento de dados segue a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018). A base legal para o tratamento é a execução do contrato de prestação de serviço (art. 7º, V) e o consentimento do usuário no momento do cadastro.",
  },
  {
    title: "4. Compartilhamento de dados",
    body: "Não vendemos dados. Os dados podem ser compartilhados com: Stripe (processamento de pagamento da assinatura), provedores de infraestrutura (hospedagem e banco de dados) e ferramentas de analytics para medir uso da plataforma e da landing page. Todos os parceiros seguem políticas de privacidade equivalentes.",
  },
  {
    title: "5. Analytics e rastreamento",
    body: "Utilizamos PostHog para analytics de uso da landing page e da plataforma. Os dados coletados incluem eventos de navegação, UTMs de origem e comportamento geral — nunca dados pessoais sensíveis como telefone, endereço ou chave Pix. Você pode optar por não ser rastreado desativando scripts em seu navegador.",
  },
  {
    title: "6. Armazenamento e segurança",
    body: "Os dados são armazenados em servidores seguros com criptografia em trânsito (HTTPS/TLS) e em repouso. As senhas são armazenadas com hash bcrypt. Nunca armazenamos dados de cartão de crédito — o processamento é feito integralmente pelo Stripe.",
  },
  {
    title: "7. Seus direitos como titular",
    body: "Você tem direito a: acessar seus dados, corrigir informações incorretas, solicitar a exclusão dos seus dados, portar seus dados para outra plataforma e revogar o consentimento. Para exercer esses direitos, entre em contato via suporte@venddup.com.br.",
  },
  {
    title: "8. Retenção e exclusão",
    body: "Os dados são mantidos enquanto a conta estiver ativa. Após o cancelamento da conta, os dados são excluídos em até 30 dias, exceto quando a retenção for exigida por obrigação legal.",
  },
];

export default function PrivacyPage() {
  return (
    <PolicyLayout>
      <div className="vd-shell">
        <span className="vd-kicker">Legal</span>
        <h1 className="lp-legal-title">Política de Privacidade</h1>
        <p className="lp-legal-updated">Vigente a partir de janeiro de 2025</p>

        <p className="lp-legal-intro">
          O Venddup respeita sua privacidade e trata seus dados com responsabilidade.
          Esta política explica quais dados coletamos, como os usamos e quais são seus direitos
          como titular, em conformidade com a LGPD.
        </p>

        <div className="lp-legal-body">
          {sections.map((s) => (
            <div key={s.title} className="lp-legal-section">
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>

        <div className="lp-legal-contact">
          <p>
            Dúvidas sobre privacidade? Entre em contato:{" "}
            <a href="mailto:suporte@venddup.com.br" className="lp-legal-link">
              suporte@venddup.com.br
            </a>
          </p>
        </div>
      </div>
    </PolicyLayout>
  );
}
