import rss from "@astrojs/rss";
import { fetchPosts } from "~/utils/blog";
import { getPermalink } from "~/utils/permalinks";

export async function GET(context) {
  const posts = (await fetchPosts()).slice(0, 10);
  const locale = "en";

  return rss({
    title: "Sami Kuikka — Writing",
    description:
      "Notes on agents, evals, prompt optimization, and building things from scratch.",
    site: context.site ?? "https://samikuikka.com",
    items: posts.map((post) => ({
      title: post.title,
      description: post.excerpt ?? "",
      pubDate: post.publishDate,
      link: getPermalink(
        post.permalink.replace("%locale%", locale),
        "post",
        locale
      ),
      categories: (post.tags ?? []).map((tag) => tag.title),
    })),
    customData: `<language>en-us</language>`,
  });
}
