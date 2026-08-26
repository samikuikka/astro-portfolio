import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

import { fetchPosts } from "./blog";

const WIDTH = 1200;
const HEIGHT = 630;

// Prepared backgrounds are pure build artifacts, cached inside node_modules
// so they never show up in git or in the deployed output.
const BG_CACHE_DIR = "node_modules/.og-image-bg";

const rawPostFiles = import.meta.glob<string>("../data/post/**/index.{md,mdx}", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Pull `image: "./cover.png"` out of a post's frontmatter without a YAML parser.
const frontmatterImage = (raw: string): string | undefined =>
  raw.match(/^image:\s*["']?\.\/([^"'\n]+?)["']?\s*$/m)?.[1];

// Map each post directory to its frontmatter cover file. Keys come from the
// glob, whose format varies (`/src/data/post/...` vs `../data/post/...`), so
// match on the tail. Content-layer ids are lowercased folder names, which is
// why the map is keyed lowercased while keeping the original dir for the fs path.
const coversByPostId = new Map<string, { dir: string; cover: string }>();
for (const [key, raw] of Object.entries(rawPostFiles)) {
  const dir = key.match(/data\/post\/(.+)\/index\.(?:md|mdx)$/)?.[1];
  const cover = frontmatterImage(raw);
  if (dir && cover) coversByPostId.set(dir.toLowerCase(), { dir, cover });
}

// Dark scrim so white title text stays readable over any cover image
// (several post covers are light matplotlib charts).
const scrimSvg = Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="s" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#04030a" stop-opacity="0.97"/>
      <stop offset="0.45" stop-color="#04030a" stop-opacity="0.88"/>
      <stop offset="1" stop-color="#04030a" stop-opacity="0.62"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#s)"/>
</svg>`);

// Lighter scrim for intrinsically dark covers (diagrams on navy/black):
// brighten the cover first, then only shade the title zone instead of the
// whole card — otherwise the share card reads as a black rectangle in
// dark-mode chats.
const scrimSvgLight = Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="s" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#04030a" stop-opacity="0.90"/>
      <stop offset="0.45" stop-color="#04030a" stop-opacity="0.68"/>
      <stop offset="1" stop-color="#04030a" stop-opacity="0.34"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#s)"/>
</svg>`);

const prepareBackground = async (
  coverAbsPath: string,
  slug: string
): Promise<string | undefined> => {
  const outPath = path.join(BG_CACHE_DIR, `${slug}.png`);
  try {
    // Adaptive treatment: dark covers get brightened and the lighter scrim;
    // light covers keep the full-strength scrim for title contrast.
    const { channels } = await sharp(coverAbsPath).stats();
    const mean =
      (channels[0].mean + channels[1].mean + channels[2].mean) / 3;
    const dark = mean < 70;

    let pipeline = sharp(coverAbsPath).resize(WIDTH, HEIGHT, { fit: "cover" });
    if (dark) pipeline = pipeline.modulate({ brightness: 1.5 });

    await pipeline
      .composite([{ input: dark ? scrimSvgLight : scrimSvg }])
      .png()
      .toFile(outPath);
    return outPath;
  } catch {
    return undefined;
  }
};

export interface OgPage {
  title: string;
  excerpt?: string;
  bg?: string;
}

export const buildOgPages = async (): Promise<Record<string, OgPage>> => {
  const posts = await fetchPosts();
  await mkdir(BG_CACHE_DIR, { recursive: true });

  const pages: Record<string, OgPage> = {};
  for (const post of posts) {
    const found = coversByPostId.get(post.id.toLowerCase());
    let bg: string | undefined;
    if (found) {
      bg = await prepareBackground(
        path.resolve("src/data/post", found.dir, found.cover),
        post.slug
      );
    }

    pages[post.slug] = {
      title: post.title,
      excerpt:
        post.excerpt && post.excerpt.length > 160
          ? `${post.excerpt.slice(0, 157).trimEnd()}…`
          : post.excerpt,
      bg,
    };
  }
  return pages;
};
