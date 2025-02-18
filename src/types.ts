import type { HTMLAttributes } from "astro/types";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export interface Post {
  id: string;
  /** A post’s unique slug – part of the post’s URL based on its name, i.e. a post called “My Sample Page” has a slug “my-sample-page”. */
  slug: string;
  permalink: string;
  publishDate: Date;
  updateDate?: Date;
  title: string;
  /** Optional summary of post content. */
  excerpt?: string;
  image?: any;
  author?: string;
  draft?: boolean;
  Content?: AstroComponentFactory;
  content?: string;
  readingTime?: number;
  tags?: Taxonomy[];
}

export interface Taxonomy {
  slug: string;
  title: string;
}

export interface CallToAction extends Omit<HTMLAttributes<"a">, "slot"> {
  variant?: "primary" | "secondary" | "tertiary" | "link";
  text?: string;
  icon?: string;
  classes?: Record<string, string>;
  type?: "button" | "submit" | "reset";
}
