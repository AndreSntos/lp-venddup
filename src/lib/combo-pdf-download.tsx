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
  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error("PDF download is only available in the browser.");
  }

  const { comboName, result, precoVenda, tips } = params;

  const blob = await pdf(
    <ComboDiagnosticPDF
      comboName={comboName}
      result={result}
      precoVenda={precoVenda}
      tips={tips}
      generatedAt={new Date()}
    />
  ).toBlob();

  if (!blob) {
    throw new Error("Failed to generate PDF blob.");
  }

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

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}