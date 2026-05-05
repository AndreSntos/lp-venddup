/** Nomes canônicos dos eventos rastreados na landing page. */
export const LP_EVENTS = {
  LP_VIEWED:         "lp_viewed",
  LP_CTA_CLICKED:    "lp_cta_clicked",
  LP_PRICING_CLICKED:"lp_pricing_clicked",
  LP_FAQ_CLICKED:    "lp_faq_clicked",
  SIGNUP_STARTED:    "signup_started",
  SIGNUP_COMPLETED:  "signup_completed",
} as const;

export type LPEventName = (typeof LP_EVENTS)[keyof typeof LP_EVENTS];

/** Propriedades padrão para eventos de CTA. */
export interface CtaEventProperties {
  cta_label?: string;
  cta_location?: string;
  cta_destination?: string;
  pathname?: string;
  referrer?: string;
  [key: string]: unknown;
}
