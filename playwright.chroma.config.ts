import { defineConfig, devices } from "@playwright/test";

const previewUrl = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/full-chroma.spec.ts",
  fullyParallel: true,
  workers: 2,
  reporter: [
    ["list"],
    ["json", { outputFile: "/tmp/aide-proto/full-chroma-test-results.json" }],
  ],
  use: {
    baseURL: previewUrl ?? "http://127.0.0.1:3134",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    launchOptions: { chromiumSandbox: true },
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: previewUrl
    ? undefined
    : {
        command: "npm run start -- --hostname 127.0.0.1 --port 3134",
        url: "http://127.0.0.1:3134/lab/full/chroma/en",
        reuseExistingServer: !process.env.CI,
        timeout: 30000,
      },
});
