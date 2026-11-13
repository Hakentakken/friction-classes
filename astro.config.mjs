import { defineConfig } from "astro/config";
import { site } from "./src/config.mjs";

export default defineConfig({
  output: "static",
  site: new URL(site.siteUrl).origin,
  base: site.basePath,
  trailingSlash: "always",
  build: { format: "directory" },
});
