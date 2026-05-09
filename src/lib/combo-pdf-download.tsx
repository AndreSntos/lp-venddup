import { pdf } from "@react-pdf/renderer";
import { ComboDiagnosticPDF } from "../components/pdf/combo-diagnostic-pdf";
import type { ComboResult } from "./combo-calculator";

interface DownloadComboDiagnosticParams {
  comboName: string;
  result: ComboResult;
  precoVenda: number;
  tips: string[];
}

export async function downloadComboDiagnosticPDF(params: DownloadComboDiagnosticParams): Promise<void> {
  const { comboName, result, precoVenda, tips } = params;

  const logoSrc = typeof window !== "undefined"
    ? `${window.location.origin}/venddup-logo-icon.svg`
    : undefined;

  const blob = await pdf(
    <ComboDiagnosticPDF
      comboName={comboName}
      result={result}
      precoVenda={precoVenda}
      tips={tips}
      generatedAt={new Date()}
      logoSrc={logoSrc}
    />
  ).toBlob();

  const safeName = (comboName || "combo")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .slice(0, 30);

  const filename = safeName
    ? `diagnostico-${safeName}-venddup.pdf`
    : "diagnostico-combo-venddup.pdf";

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}