import React from "react";
import { Document, Page, Text, View, StyleSheet, Link, Svg, Path, G } from "@react-pdf/renderer";
import type { ComboResult, ComboStatus } from "../../lib/combo-calculator";
import { formatCurrencyBRL, formatPercentBR } from "../../lib/combo-calculator";

const VenddupPDFLogo = () => (
  <Svg viewBox="0 0 500 500" style={styles.logo}>
    <G fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M95 100 L250 252 L405 100" stroke="#38BDF8" strokeWidth="74" />
      <Path d="M112 214 L250 341 L388 214" stroke="#2563EB" strokeWidth="58" />
      <Path d="M112 302 L250 430 L388 302" stroke="#1D4ED8" strokeWidth="58" />
    </G>
  </Svg>
);

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const GRID_SIZE = 48;

const PDFBackgroundGrid = () => {
  const verticalLines = Array.from({ length: Math.ceil(PAGE_WIDTH / GRID_SIZE) + 1 }, (_, i) => i * GRID_SIZE);
  const horizontalLines = Array.from({ length: Math.ceil(PAGE_HEIGHT / GRID_SIZE) + 1 }, (_, i) => i * GRID_SIZE);

  return (
    <View style={styles.gridContainer} fixed>
      {verticalLines.map((x) => (
        <View key={`v${x}`} style={[styles.gridLineVertical, { left: x }]} />
      ))}
      {horizontalLines.map((y) => (
        <View key={`h${y}`} style={[styles.gridLineHorizontal, { top: y }]} />
      ))}
      <View style={styles.gridCircle1} />
      <View style={styles.gridCircle2} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#030712",
    fontFamily: "Helvetica",
    padding: 24,
  },
  gridContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  gridLineVertical: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "#081C2C",
  },
  gridLineHorizontal: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#081C2C",
  },
  gridCircle1: {
    position: "absolute",
    top: 60,
    right: 40,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#0B2638",
    opacity: 0.6,
  },
  gridCircle2: {
    position: "absolute",
    bottom: 80,
    left: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#0B2638",
    opacity: 0.4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#07111F",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 28,
    height: 28,
  },
  logoText: {
    color: "#38BDF8",
    fontSize: 14,
    fontWeight: 700,
  },
  logoTextOnly: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#07111F",
    borderRadius: 4,
  },
  logoTextHidden: {
    display: "none",
  },
  headerBadge: {
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  headerBadgeText: {
    color: "#F8FBFF",
    fontSize: 8,
    fontWeight: 600,
  },
  headerRight: {
    color: "#627792",
    fontSize: 8,
  },
  hero: {
    marginBottom: 16,
  },
  comboName: {
    color: "#F8FBFF",
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 10,
  },
  statusText: {
    color: "#030712",
    fontSize: 10,
    fontWeight: 600,
  },
  impactText: {
    fontSize: 11,
    marginBottom: 4,
  },
  impactPositive: {
    color: "#25D366",
  },
  impactNegative: {
    color: "#FB7185",
    fontStyle: "italic",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    backgroundColor: "#0A1628",
    borderRadius: 6,
    padding: 10,
    width: "48%",
    borderWidth: 1,
    borderColor: "#16415C",
  },
  metricLabel: {
    color: "#9FB4D0",
    fontSize: 8,
    marginBottom: 4,
  },
  metricValue: {
    color: "#F8FBFF",
    fontSize: 12,
    fontWeight: 600,
  },
  metricValueNegative: {
    color: "#FB7185",
  },
  metricValuePositive: {
    color: "#25D366",
  },
  tipsSection: {
    marginBottom: 16,
  },
  tipsTitle: {
    color: "#F8FBFF",
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 10,
  },
  tipCard: {
    flexDirection: "row",
    backgroundColor: "#07111F",
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    gap: 10,
  },
  tipNumber: {
    color: "#38BDF8",
    fontSize: 10,
    fontWeight: 700,
    width: 24,
  },
  tipText: {
    color: "#9FB4D0",
    fontSize: 9,
    flex: 1,
    lineHeight: 1.4,
  },
  ctaSection: {
    backgroundColor: "#07111F",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#38BDF8",
  },
  ctaTitle: {
    color: "#F8FBFF",
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
  },
  ctaText: {
    color: "#9FB4D0",
    fontSize: 9,
    marginBottom: 12,
    lineHeight: 1.4,
  },
  ctaButton: {
    backgroundColor: "#38BDF8",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  ctaButtonText: {
    color: "#030712",
    fontSize: 10,
    fontWeight: 600,
  },
  ctaLink: {
    color: "#38BDF8",
    fontSize: 9,
    fontWeight: 600,
    marginTop: 8,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#0A1628",
    paddingTop: 10,
  },
  footerText: {
    color: "#627792",
    fontSize: 7,
    fontStyle: "italic",
    marginBottom: 4,
  },
  footerUrl: {
    color: "#9FB4D0",
    fontSize: 7,
  },
});

const getStatusColor = (status: ComboStatus): string => {
  switch (status) {
    case "prejuizo": return "#FB7185";
    case "perigoso": return "#F59E0B";
    case "aceitavel": return "#38BDF8";
    case "saudavel": return "#25D366";
    default: return "#38BDF8";
  }
};

const safeFormat = (value: number, type: "currency" | "percent"): string => {
  if (!Number.isFinite(value) || isNaN(value)) return "—";
  if (type === "currency") return formatCurrencyBRL(value);
  return formatPercentBR(value);
};

interface ComboDiagnosticPDFProps {
  comboName: string;
  result: ComboResult;
  precoVenda: number;
  tips: string[];
  generatedAt: Date;
}

export const ComboDiagnosticPDF: React.FC<ComboDiagnosticPDFProps> = ({
  comboName,
  result,
  precoVenda,
  tips,
  generatedAt,
}) => {
  const dateStr = generatedAt.toLocaleDateString("pt-BR");
  const statusColor = getStatusColor(result.status);
  const isProfit = result.lucroEstimado >= 0;

  const metrics = [
    { label: "Preço de venda", value: safeFormat(precoVenda, "currency") },
    { label: "Custo total", value: safeFormat(result.custoTotal, "currency"), isNegative: true },
    { label: "Taxa estimada", value: safeFormat(result.taxaPagamento, "currency"), isNegative: true },
    { label: "Lucro estimado", value: safeFormat(result.lucroEstimado, "currency"), isNegative: result.lucroEstimado < 0 },
    { label: "Margem real", value: safeFormat(result.margemPercentual, "percent"), isNegative: result.margemPercentual < 0 },
    { label: "Preço mínimo", value: result.precoMinimoSugerido > 0 ? safeFormat(result.precoMinimoSugerido, "currency") : "—" },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PDFBackgroundGrid />
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <VenddupPDFLogo />
            <View>
              <Text style={styles.logoText}>Venddup</Text>
              <View style={styles.headerBadge}>
                <Text style={styles.headerBadgeText}>Diagnóstico do Combo</Text>
              </View>
            </View>
          </View>
          <Text style={styles.headerRight}>Gerado em {dateStr}</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.comboName}>{comboName || "Combo sem nome"}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{result.statusText}</Text>
          </View>
          <Text style={[styles.impactText, isProfit ? styles.impactPositive : styles.impactNegative]}>
            {isProfit
              ? `Cada combo vendido deixa aproximadamente ${safeFormat(result.lucroEstimado, "currency")} de lucro.`
              : `Você perde aproximadamente ${safeFormat(Math.abs(result.lucroEstimado), "currency")} por combo vendido.`}
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          {metrics.map((metric, index) => {
            const valueStyle = [
              styles.metricValue,
              metric.isNegative ? styles.metricValueNegative : null,
              !metric.isNegative && index === 3 && result.lucroEstimado > 0 ? styles.metricValuePositive : null,
            ].filter(Boolean) as (typeof styles.metricValue | typeof styles.metricValueNegative | typeof styles.metricValuePositive)[];
            return (
              <View key={index} style={styles.metricCard}>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <Text style={valueStyle}>
                  {metric.isNegative && metric.value !== "—" ? "− " : ""}{metric.value}
                </Text>
              </View>
            );
          })}
        </View>

        {tips.length > 0 && (
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>Dicas para melhorar</Text>
            {tips.slice(0, 3).map((tip, index) => (
              <View key={index} style={styles.tipCard}>
                <Text style={styles.tipNumber}>{String(index + 1).padStart(2, "0")}</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Agora transforme esse combo em pedido organizado.</Text>
          <Text style={styles.ctaText}>
            Com a Venddup, sua adega cadastra produtos e kits, configura entrega e recebe pedidos completos pelo WhatsApp.
          </Text>
          <View style={styles.ctaButton}>
            <Link src="https://app.venddup.com.br/register">
              <Text style={styles.ctaButtonText}>Criar minha vitrine na Venddup</Text>
            </Link>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Este diagnóstico é uma estimativa operacional. O objetivo é evitar promoção no escuro.
          </Text>
          <Text style={styles.footerUrl}>venddup.com.br</Text>
        </View>
      </Page>
    </Document>
  );
};