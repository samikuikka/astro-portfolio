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
      tags: z.array(z.string()).optional(),

      author: z.string().optional(),
    }),
});

export const collections = {
  post,
};
