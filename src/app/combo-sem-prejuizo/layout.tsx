import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Combo Sem Prejuízo — Calcule a margem do seu combo",
  description:
    "Calcule o custo real do seu combo, descubra sua margem e veja o preço mínimo para não vender no escuro.",
};

export default function ComboLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}