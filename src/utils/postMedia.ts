// Resolves a post's co-located cover video (frontmatter `video: "./loop.mp4"`)
// to a build URL. Astro's image() schema handles posters; videos need manual
// resolution, so mirror the import.meta.glob trick used by ogImages.ts.
const videoUrls = import.meta.glob<string>("../data/post/**/*.{mp4,webm}", {
  query: "?url",
  import: "default",
  eager: true,
});

// Content-layer ids are lowercased folder names, so key and compare lowercased.
export const getPostVideoUrl = (
  postId: string,
  video: string
): string | undefined => {
  const file = video.replace(/^\.\//, "");
  for (const [key, url] of Object.entries(videoUrls)) {
    const match = key.match(/data\/post\/([^/]+)\/([^/]+)\.(?:mp4|webm)$/);
    if (
      match &&
      match[1].toLowerCase() === postId.toLowerCase() &&
      `${match[2]}.${key.split(".").pop()}` === file
    ) {
      return url;
    }
  }
  return undefined;
};
