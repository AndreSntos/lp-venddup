import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policy-layout";

export const metadata: Metadata = {
  title: "Termos de Uso — Venddup",
  description:
    "Termos e condições de uso do Venddup, plataforma SaaS para adegas venderem pelo WhatsApp com vitrine própria.",
};

const sections = [
  {
    title: "1. O que é o Venddup",
    body: "O Venddup é uma plataforma de software (SaaS) que permite a adegas criarem uma vitrine digital própria, cadastrarem produtos, montarem kits e receberem pedidos organizados via WhatsApp. Não somos um marketplace, não intermediamos pagamentos e não realizamos entregas.",
  },
  {
    title: "2. Natureza dos pedidos",
    body: "Cada pedido gerado pelo Venddup é uma solicitação de compra enviada ao WhatsApp da adega. A plataforma não confirma automaticamente disponibilidade, preço ou entrega — isso é responsabilidade exclusiva da adega. O pedido precisa ser confirmado manualmente pela adega via WhatsApp antes de qualquer compromisso de venda.",
  },
  {
    title: "3. Responsabilidade da adega",
    body: "A adega contratante é inteiramente responsável pelo cumprimento de todas as leis aplicáveis à sua operação, incluindo: licenças comerciais, alvarás de funcionamento, legislação sobre venda de bebidas alcoólicas, confirmação de maioridade dos clientes (18+), condições de entrega e qualidade dos produtos.",
  },
  {
    title: "4. Uso permitido",
    body: "A plataforma deve ser usada exclusivamente para a venda legal de bebidas alcoólicas, não-alcoólicas e itens complementares (gelo, snacks, acessórios). É proibido usar o Venddup para vender produtos ilegais, produtos de vape, tabaco ou qualquer item proibido pela legislação brasileira.",
  },
  {
    title: "5. Assinatura e cobrança",
    body: "O Venddup é oferecido como assinatura mensal (Starter) ou em outros planos disponíveis na página de preços. A cobrança é processada via Stripe. O período de teste gratuito não é cobrado. Após o início da cobrança, não realizamos reembolso proporcional por cancelamento antecipado dentro do mês vigente.",
  },
  {
    title: "6. Cancelamento",
    body: "A assinatura pode ser cancelada a qualquer momento pelo painel da adega, sem fidelidade mínima. Após o cancelamento, a vitrine ficará inativa e os dados permanecerão armazenados por 30 dias antes da exclusão permanente.",
  },
  {
    title: "7. Dados e privacidade",
    body: "O Venddup coleta e processa apenas os dados necessários para o funcionamento da plataforma, conforme descrito na Política de Privacidade. Os dados dos clientes finais captados via pedidos são de responsabilidade da adega.",
  },
  {
    title: "8. Suspensão por uso indevido",
    body: "O Venddup se reserva o direito de suspender ou encerrar contas que violem estes termos, realizem uso inadequado da plataforma, cadastrem produtos proibidos, ou cujo comportamento coloque em risco outros usuários ou a integridade da plataforma. Em casos graves, o encerramento pode ocorrer sem aviso prévio.",
  },
  {
    title: "9. Limitação de responsabilidade",
    body: "O Venddup não se responsabiliza por prejuízos decorrentes do uso inadequado da plataforma, problemas na entrega de pedidos, reclamações de clientes finais ou descumprimento de leis por parte da adega.",
  },
];

export default function TermsPage() {
  return (
    <PolicyLayout>
      <div className="vd-shell">
        <span className="vd-kicker">Legal</span>
        <h1 className="lp-legal-title">Termos de Uso</h1>
        <p className="lp-legal-updated">Vigente a partir de janeiro de 2025</p>

        <p className="lp-legal-intro">
          Ao criar uma conta no Venddup, você concorda com estes termos. Leia com atenção
          antes de usar a plataforma. Em caso de dúvida, entre em contato com nosso suporte.
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
            Dúvidas sobre os termos? Entre em contato:{" "}
            <a href="mailto:suporte@venddup.com.br" className="lp-legal-link">
              suporte@venddup.com.br
            </a>
          </p>
        </div>
      </div>
    </PolicyLayout>
  );
}
