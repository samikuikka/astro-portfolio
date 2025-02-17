// @ts-check
import { defineConfig, envField } from "astro/config";
import { fileURLToPath } from "url";
import path from "path";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import icon from "astro-icon";

import mdx from "@astrojs/mdx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({
        context: "server",
        access: "public"
      })
    }
  },
  i18n: {
    locales: ["en", "zh-CN"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [tailwind(), react(), icon({
    include: {
      tabler: ['*'],
      'flat-color-icons': [
        'template',
        'gallery',
        'approval',
        'document',
        'advertising',
        'currency-exchange',
        'voice-presentation',
        'business-contact',
        'database',
      ],
    },
  }), mdx()],
  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});