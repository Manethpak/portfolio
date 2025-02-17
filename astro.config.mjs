import { defineConfig, passthroughImageService } from "astro/config";

import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    isr: {
      expiration: 600,
    },
  }),
  image: {
    service: passthroughImageService(),
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
