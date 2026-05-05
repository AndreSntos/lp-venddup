import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-ui",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Crie uma vitrine online para sua adega, cadastre produtos e kits, receba pedidos completos e feche tudo pelo WhatsApp da loja. Plano Starter por R$97/mês.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://venddup.com.br"
  ),
  title: "Venddup — Sua adega vendendo pelo WhatsApp",
  description,
  icons: {
    icon: [{ url: "/brand/venddup-symbol.svg", type: "image/svg+xml" }],
    shortcut: "/brand/venddup-symbol.svg",
    apple: [{ url: "/brand/venddup-symbol.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Venddup — Sua adega vendendo pelo WhatsApp",
    description,
    siteName: "Venddup",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venddup — Sua adega vendendo pelo WhatsApp",
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <div className="vd-grid-bg" aria-hidden="true" />
        <div className="vd-noise" aria-hidden="true" />
        <div className="vd-scanline" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
