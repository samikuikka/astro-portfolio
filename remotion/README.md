# Remotion covers

Renders animated MP4 covers + matching poster PNGs for blog posts. This folder
is its own pnpm workspace on purpose — the site's dependencies (and Vercel
installs) stay free of Remotion's weight.

## Usage

```sh
pnpm install

# Full animation -> post folder (seamless loop, muted, autoplaying hero)
pnpm render                       # writes out/loop.mp4

# Poster frame (used as the static `image` for cards + OG/share cards)
pnpm still                        # writes out/loop.png
```

Copy the outputs into the post's folder (e.g.
`src/data/post/principles-of-loop-engineering/`), then declare them in the
post frontmatter:

```yaml
image: "./loop.png"   # poster: listing cards + OG (must stay a static image)
video: "./loop.mp4"   # optional: animated hero on the post page
```

The video hero is wired up in `src/utils/postMedia.ts` + `SinglePost.astro`;
the poster keeps working everywhere else (cards, RSS, OG) untouched.

## Notes

- Uses the system chromium (`remotion.config.ts`), no Chrome Headless Shell
  download needed.
- Loop math: composition length must be an exact multiple of the animation
  cycle (currently 240 frames = 2 × 120-frame cycles @ 30fps) so frame N
  wraps seamlessly to frame 0.
