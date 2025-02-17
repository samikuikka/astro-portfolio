import type { Post } from "~/types";
import type { CollectionEntry } from "astro:content";
import { getCollection, render } from "astro:content";
import {
  cleanSlug,
  trimSlash,
  POST_PERMALINK_PATTERN,
  BLOG_BASE,
} from "./permalinks";
import type { PaginateFunction } from "astro";

const generatePermalink = async ({
  id,
  slug,
  publishDate,
}: {
  id: string;
  slug: string;
  publishDate: Date;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, "0");
  const month = String(publishDate.getMonth() + 1).padStart(2, "0");
  const day = String(publishDate.getDate()).padStart(2, "0");
  const hour = String(publishDate.getHours()).padStart(2, "0");
  const minute = String(publishDate.getMinutes()).padStart(2, "0");
  const second = String(publishDate.getSeconds()).padStart(2, "0");

  const permalink = POST_PERMALINK_PATTERN.replace("%slug%", slug)
    .replace("%id%", id)
    .replace("%year%", year)
    .replace("%month%", month)
    .replace("%day%", day)
    .replace("%hour%", hour)
    .replace("%minute%", minute)
    .replace("%second%", second);

  return permalink
    .split("/")
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");
};

const load = async function (): Promise<Array<Post>> {
  const posts = await getCollection("post");
  const normalizedPosts = posts.map(
    async (post) => await getNormalizedPost(post)
  );

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _posts: Array<Post>;

export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts;
};

export const getStaticPathsBlogList = async ({
  paginate,
}: {
  paginate: PaginateFunction;
}) => {
  const posts = await fetchPosts();
  const paths = paginate(posts, {
    params: { blog: BLOG_BASE || undefined, locale: "en" },
    pageSize: 10,
  });

  return paths.map((path) => ({
    params: {
      ...path.params,
      locale: "en",
    },
    props: path.props,
  }));
};

export const getStaticPathsBlogPost = async () => {
  const posts = await fetchPosts();
  return posts.flatMap((post) => {
    const fullPermalink = post.permalink.replace("%locale%", "en");
    const blogPath = fullPermalink.replace(/^\/?en\//, "");
    return {
      params: {
        blog: "/" + blogPath, // e.g., "blog/post2"
        locale: "en",
      },
      props: { post },
    };
  });
};

const getNormalizedPost = async (
  post: CollectionEntry<"post">
): Promise<Post> => {
  const { id, data } = post;
  const { Content, remarkPluginFrontmatter } = await render(post);

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    author,
    draft = false,
  } = data;

  const slug = cleanSlug(id);
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({
      id,
      slug,
      publishDate,
    }),
    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,
    author: author,
    draft: draft,
    Content: Content,
    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};
