import { defineConfig, passthroughImageService } from "astro/config";

import tailwind from "@astrojs/tailwind";

const site = process.env.SITE_URL ?? process.env.PUBLIC_URL;

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [tailwind()],
  output: "static",
  image: {
    service: passthroughImageService(),
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
