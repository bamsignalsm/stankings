import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: [
      "src/**/*.test.ts",
      "src/**/*.spec.ts",
      "packages/**/*.test.ts",
      "packages/**/*.spec.ts",
    ],
    reporters: ["default"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@stankings/core": path.resolve(__dirname, "./packages/core/src/index.ts"),
      "@stankings/platform-sdk": path.resolve(__dirname, "./packages/platform-sdk/src/index.ts"),
    },
  },
});
