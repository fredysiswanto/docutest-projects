import { defineConfig } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./app/tests/",
  timeout: 30000,
  workers: 1,
  // globalSetup: './setup/global-setup.ts',
  // projects: [
  //   {
  //     name: "admin-setup",
  //     testDir: "./app/setup",
  //     testMatch: "admin-setup.ts",
  //     use: {
  //       baseURL: process.env.BASE_URL_ADMIN || "https://localhost:3001",
  //     },
  //   },
  //   {
  //     name: "admin",
  //     testDir: "./app/tests/ui/admin",
  //     use: {
  //       baseURL: process.env.BASE_URL_ADMIN || "https://localhost:3001",
  //       storageState: "storage/admin.json",
  //     },
  //     dependencies: ["admin-setup"],
  //   },
  //   {
  //     name: "client-setup",
  //     testDir: "./app/setup",
  //     testMatch: "client-setup.ts",
  //   },

  //   {
  //     name: "client",
  //     testDir: "./app/tests/ui/client",
  //     use: {
  //       baseURL: process.env.CLIENT_BASE_URL || "https://localhost:3000",
  //       storageState: "storage/client.json",
  //     },
  //     dependencies: ["client-setup"],
  //     teardown: "teardown",
  //   },
  //   {
  //     name: "api",
  //     testDir: "./app/tests/api",
  //     teardown: "teardown",
  //   },
  //   {
  //     name: "teardown",
  //     testDir: "./app/setup",
  //     testMatch: "remove-data.teardown.ts",
  //   },
  // ],

  use: {
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      "Content-Type": "application/json",
    },
    trace: "retain-on-failure",
    viewport: { width: 1920, height: 1080 },
  },

  reporter: [["list"], ["html", { outputFolder: "reports", open: "never" }]],
});
