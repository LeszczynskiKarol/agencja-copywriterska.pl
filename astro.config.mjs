import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.agencja-copywriterska.pl",
  integrations: [sitemap()],
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
});
