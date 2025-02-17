import { trim } from "~/utils/utils";
import slugify from "limax";
import dotenv from "dotenv";

dotenv.config();

export const trimSlash = (s: string) => trim(trim(s, "/"));

export const cleanSlug = (text = "") =>
  trimSlash(text)
    .split("/")
    .map((slug) => slugify(slug))
    .join("/");

const BASE_PATHNAME = "/";
const APP_BLOG = {
  list: { pathname: "blog" },
  category: { pathname: "%locale%/category" },
  tag: { pathname: "%locale%/tag" },
  post: { permalink: "%locale%/blog/%slug%" },
};
export const BLOG_BASE = cleanSlug(APP_BLOG?.list?.pathname);
export const CATEGORY_BASE = cleanSlug(APP_BLOG?.category?.pathname);
export const TAG_BASE = cleanSlug(APP_BLOG?.tag?.pathname) || "tag";
export const POST_PERMALINK_PATTERN = trimSlash(
  APP_BLOG?.post?.permalink || `${BLOG_BASE}/%slug%`
);

const SITE = {
  site: process.env.PUBLIC_SITE_URL,
  trailingSlash: true,
};

const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");
  return "/" + paths + (SITE.trailingSlash && paths ? "/" : "");
};

export const getCanonical = (path = ""): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash == false && path && url.endsWith("/")) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith("/")) {
    return url + "/";
  }
  return url;
};

export const getAsset = (path: string): string =>
  "/" +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");

export const getPermalink = (
  slug = "",
  type = "page",
  locale = "en"
): string => {
  let permalink: string;

  if (
    slug.startsWith("https://") ||
    slug.startsWith("http://") ||
    slug.startsWith("://") ||
    slug.startsWith("#") ||
    slug.startsWith("javascript:")
  ) {
    return slug;
  }

  switch (type) {
    case "home":
      permalink = "/";
      break;

    case "blog":
      permalink = "%locale%/blog".replace("%locale%", locale);
      break;

    case "asset":
      permalink = getAsset(slug);
      break;

    case "category":
      permalink = createPath(
        CATEGORY_BASE.replace("%locale%", locale),
        trimSlash(slug)
      );
      break;

    case "tag":
      permalink = createPath(
        TAG_BASE.replace("%locale%", locale),
        trimSlash(slug)
      );
      break;

    case "post":
      permalink = createPath(trimSlash(slug));
      break;

    case "page":
    default:
      permalink = createPath(slug);
      break;
  }

  return definitivePermalink(permalink.replace("%locale%", locale));
};

export const getHomePermalink = (locale = "en"): string =>
  getPermalink("/", "home", locale);
export const getBlogPermalink = (locale = "en"): string =>
  getPermalink("%locale%/blog".replace("%locale%", locale), "blog", locale);

const definitivePermalink = (permalink: string): string =>
  createPath(BASE_PATHNAME, permalink);
