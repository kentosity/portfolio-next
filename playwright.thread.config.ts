import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;

export default defineConfig({
  ...baseConfig,
  testMatch: "**/thread.spec.ts",
  use: {
    ...baseConfig.use,
    launchOptions: executablePath ? { executablePath } : {},
  },
});
