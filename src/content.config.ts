import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const post = defineCollection({
  loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./src/data/post" }),
  schema: ({ image }) =>
    z.object({
      publishDate: z.date().optional(),
      updateDate: z.date().optional(),
      draft: z.boolean().optional(),

      title: z.string(),
      excerpt: z.string().optional(),
      image: image().optional(),
      // Co-located cover video, e.g. "./loop.mp4" (resolved by
      // src/utils/postMedia.ts). Rendered as an autoplaying muted hero on the
      // post page; `image` stays the static poster for cards and OG.
      video: z.string().optional(),
      tags: z.array(z.string()).optional(),

      author: z.string().optional(),
    }),
});

export const collections = {
  post,
};
