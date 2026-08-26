import { OGImageRoute } from "astro-og-canvas";

import { buildOgPages } from "~/utils/ogImages";

export const { getStaticPaths, GET } = await OGImageRoute({
  // One image per published post, e.g. /og/closing-the-loop.png
  pages: {
    // Fallback card for non-post pages (homepage, blog list, tags…),
    // which CommonMeta points at when a page has no image of its own.
    default: {
      title: "Sami Kuikka",
      excerpt:
        "AI engineer building agentic systems — writing about agents, prompt optimization, RAG, and LLM evaluation",
    },
    ...await buildOgPages(),
  },

  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.excerpt,
    // Posts with a cover: pre-darkened 1200x630 version of their own image.
    bgImage: page.bg ? { path: page.bg, fit: "none" } : undefined,
    // Posts without a cover: the site's "wave" palette.
    bgGradient: page.bg ? undefined : [[32, 0, 82], [10, 8, 51], [0, 1, 14]],
    logo: { path: "./src/assets/images/profile-pic.png", size: [56] },
    border: { color: [109, 40, 217], width: 12 },
    padding: 60,
    font: {
      title: {
        color: [255, 255, 255],
        size: page.title.length > 70 ? 52 : 62,
        weight: "bold",
        lineHeight: 1.15,
        families: ["Inter Variable"],
      },
      description: {
        color: [203, 203, 216],
        size: 30,
        weight: "normal",
        lineHeight: 1.35,
        families: ["Inter Variable"],
      },
    },
    fonts: [
      "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
    ],
  }),
});
