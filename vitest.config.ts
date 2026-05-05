import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    pool: "vmForks",
    testTimeout: 30000,
    setupFiles: ["./src/tests/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/lib/**/*.{ts,tsx}"],
      exclude: [
        "src/tests/**",
        "src/app/**",
        "src/**/*.d.ts",
        "src/**/*.config.ts",
        /* PostHog e Provider dependem de browser/React — excluídos de cobertura */
        "src/lib/tracking/posthog-client.ts",
        "src/lib/tracking/posthog-provider.tsx",
        /* Apenas constantes e tipos — sem lógica executável */
        "src/lib/tracking/events.ts",
      ],
      thresholds: {
        statements: 85,
        branches: 80,
        functions: 85,
        lines: 85,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
