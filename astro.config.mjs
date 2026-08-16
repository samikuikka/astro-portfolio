// @ts-check
import { defineConfig, envField } from "astro/config";
import { fileURLToPath } from "url";
import path from "path";

import { unified } from "@astrojs/markdown-remark";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

import icon from "astro-icon";

import mdx from "@astrojs/mdx";

import rehypeSlug from "rehype-slug";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  // Vercel serves the site at www.samikuikka.com (apex 308-redirects to www),
  // so www must be the canonical origin for sitemap/RSS/canonical URLs.
  site: "https://www.samikuikka.com",
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
      redirectToDefaultLocale: true,
    },
  },
  // Astro 7 defaults to 'jsx' whitespace handling; 'true' keeps the Astro 5 output
  compressHTML: true,
  // Sätteri (the Astro 7 default) does not run remark/rehype plugins;
  // unified() keeps the rehype-slug heading anchors working for MDX
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeSlug],
    }),
    // github-dark ships #6a737d comments, which fail contrast on the dark
    // page background; github-dark-default uses #8b949e instead
    shikiConfig: { theme: "github-dark-default" },
  },
  integrations: [react(), sitemap(), icon({
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