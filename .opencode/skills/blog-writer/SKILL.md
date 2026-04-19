---
name: blog-writer
description: >
  REQUIRED when writing, editing, or creating blog posts in src/data/post/.
  Defines the author's authentic voice, grammar rules, filler word bans,
  sentence structure, and conclusion patterns. Ensures posts match the
  established writing style: curious, honest, project-driven, and polished.
  Triggers: new blog post creation, editing existing posts, rewriting sections,
  drafting outlines, proofreading blog content.
---

# Blog Writer Skill

Write and edit blog posts in `src/data/post/**/*.mdx` that match the author's authentic voice while eliminating common mistakes.

## When This Skill MUST Be Used

**ALWAYS invoke this skill when:**

- Creating new blog posts in `src/data/post/`
- Editing or rewriting existing blog post content
- Drafting blog post outlines or sections
- Proofreading or reviewing blog posts
- Generating excerpts or summaries for blog posts

## Authentic Voice (Protect These)

These patterns define the author's genuine voice. Keep them.

### Curiosity-First Openings

Start from real confusion or genuine surprise, not authority. The best hooks are honest questions:

- "I still didn't understand why such a tiny prompt change makes such a big difference"
- "the random subset baseline performed far better than I thought it would"
- "this is something I still struggle with my implementation"

Never open as an expert delivering a lecture. Open as someone who got curious.

### Honesty About Surprises and Failures

When results surprise you, say so. When something was harder than expected, say so. When the implementation still has issues, say so. These moments build more trust than any polished conclusion.

Examples from past posts:
- "this is something I still struggle with"
- "the difference between the prefix and a random subset was much smaller than I expected"
- "my first iterations without memory blocks and worse system prompt, the agent had problem of not storing the information proactively"

### Project-Driven Narrative

Ground abstract concepts in the travel app or other real projects. The travel app (planchinatrips.com) and Chinese attractions dataset (10,000 attractions) are recurring anchors. This continuity between posts is a strength most tech bloggers lack.

### Earned Enthusiasm

Excitement reads authentic when tied to concrete results. "Over 60% improvement to the baseline!" works because it follows actual data. Never hype without evidence.

### Conversational Transitions

These keep readers engaged. Use them:
- "But here's also a catch!"
- "So how do we make sure..."
- "Let's stop for a moment and think..."
- "What's great about this is..."

## Grammar and Mechanics (Enforce These)

### Articles

Always include articles where needed:

| Wrong | Right |
|-------|-------|
| "I created simple tools" | "I created **a** simple tool" |
| "we have list of candidates" | "we have **a** list of candidates" |
| "creating queries to the database" | "creating **the** queries to the database" |
| "each thought needs its own LLM call" | "each thought needs **its own** LLM call" |

### Subject-Verb Agreement

- "these prompt optimization platforms knows" -> "these prompt optimization platforms **know**"
- "the basic idea...are" -> "the basic idea...**is**"
- "there's multiple" -> "there **are** multiple"

### Possessives and Contractions

- "models internal state" -> "model**'s** internal state"
- "its own" (possessive, no apostrophe) vs "it's own" (wrong)
- "user's" (singular possessive) vs "users'" (plural possessive)

### Missing Words

Common pattern to watch for: dropped prepositions and helper verbs.
- "I tried a fun experiment" not "I tried fun experiment"
- "it also needs **a** way" not "it also needs way"
- "what I have found" not "what I found" (when referring to ongoing discoveries)

### Spelling Watch List

These are recurring typos. Catch every instance:

| Typo | Correct |
|------|---------|
| suprise | surprise |
| improtant | important |
| visbility | visibility |
| continuouysly | continuously |
| disportionate | disproportionate |
| proejct | project |
| hallucainted | hallucinated |
| retreiving | retrieving |
| acheive | achieve |
| seperate | separate |
| acheive | achieve |
| implmentation | implementation |
| continous | continuous |
| optimizaiton | optimization |
| acheived | achieved |

### No Em Dashes

Do not use em dashes (—) in prose. The author never uses them. Instead of em dashes, use:
- A period to split into two sentences
- A colon for explanations ("The reason is simple: ...")
- Parentheses for asides (sparingly)
- A comma where appropriate

| Wrong | Right |
|-------|-------|
| "my users are predictable — and that's a problem" | "my users are predictable. And that's a problem." |
| "the cache hit rate — 40% — was surprising" | "the cache hit rate (40%) was surprising" |
| "semantic caching — unlike exact-match — works on meaning" | "semantic caching, unlike exact-match, works on meaning" |

### Run-on Sentences

Break long chains of clauses. If a sentence has more than 3 clauses connected by "and" or commas, split it.

## Filler Words (Remove These)

### Banned: "Basically"

Almost never needed. Delete it. If the sentence still works, it was filler. If it doesn't, reword.

- "Basically, we have prompt templates" -> "We have prompt templates"
- "Basically, it is just creating winner sets" -> "It creates winner sets"

### Banned: "So" at Sentence Start

Use sparingly. Maximum 2-3 per entire post. Allowed when genuinely transitioning to a consequence. Banned when used as a verbal tic.

- "So the basic idea is to..." -> "The idea is to..."
- "So what happened was..." -> "What happened was..."
- "So we can conclude..." -> "We can conclude..."

### Banned: "In this blog I will/went over"

Never summarize the blog in the conclusion by restating what you covered. Instead, give the reader one memorable idea.

### Reduce: "quite"

Used too often as a hedge. Be direct:
- "quite good" -> "good" or "effective"
- "quite challenging" -> "challenging"
- "quite interesting" -> "interesting"

### Reduce: "also"

Appears in nearly every paragraph. Keep it when genuinely adding to a previous point. Cut it when redundant.

## Sentence Structure

### Vary Sentence Length

Mix long explanatory sentences with short punchy ones. Short sentences create emphasis after longer passages.

Good pattern:
> "But here's also a catch! Stabilizing the trajectory doesn't mean that it is the correct one."

Bad pattern (all same length):
> "The first step is to understand the system. The second step is to implement the changes. The third step is to evaluate the results."

### Use Standalone Lines for Emphasis

Break key ideas into their own short paragraphs (1-2 sentences):

> Much less progress has been made on how agents **remember**.

This pattern works. Use it deliberately for the most important ideas in each section.

### Front-Load the Point

Start paragraphs with the claim, then explain. Not the reverse.

Good: "The random subset almost matched the prefix. The explanation is pretty simple: my attractions cluster semantically."

Bad: "My attractions cluster semantically, the model is overparameterized, and Recall@10 doesn't care about exact ranking, so as long as the random slice keeps enough coarse information it performs fine, which explains why the random subset almost matched the prefix."

## Conclusions

### Never Open With "In this blog I..."

Banned phrases:
- "In this blog I went over..."
- "In this post I demonstrated how..."
- "In this blog I will explain..."

### End on a Sharp Thought

The best conclusions give the reader one idea to remember. Not a summary of everything covered.

Good examples:
- "Thinking is only half the problem. If we want agents that improve, memory has to be treated as a first-class concern."
- "The infrastructure exists. The challenge now is making it work in practice."
- "Prompt optimization moves from research workflow to runtime infrastructure."

Bad example:
- "In this blog I went over Matryoshka Representation Learning and applied it to my own use case. Modern embedding models already use this technique and it really does let us shrink vectors without losing much performance."

### Three Good Conclusion Patterns

1. **The unsolved problem**: Name what's still open or hard.
2. **The reframing**: Give the reader a new way to think about the topic.
3. **The practical takeaway**: One concrete thing the reader can do differently.

## Post Structure

### Recommended Flow

1. **Hook** (genuine curiosity or surprise, 2-4 sentences)
2. **The Problem** (why this matters, what's hard about it)
3. **Background / Theory** (only what's needed, no textbook dumps)
4. **Implementation** (real code, real project, real results)
5. **What Surprised Me** (honest reflections on what didn't go as expected)
6. **Conclusion** (one sharp thought, not a summary)

### Section Transitions

Use questions or contrast statements to move between sections:
- "But here's also a catch!"
- "So how do we fix this?"
- "What ToT does differently is..."
- "This still stops short of actual optimization."

## Tone Calibration

### Sound Like This

A smart developer explaining something to a colleague over coffee. Enthusiastic about results, honest about struggles, genuinely curious about why things work.

### Don't Sound Like This

- A textbook or academic paper
- A marketing blog selling a product
- A tutorial that pretends everything works perfectly
- An authoritative expert who knew the answer all along

### Code Examples

Show real code from real projects. Include comments only when they explain non-obvious decisions. Code should be runnable snippets, not pseudocode.

### Numbers and Results

Always include concrete metrics when discussing improvements:
- "improvement was from the baseline score 0.4295 to 0.7081"
- "4 million tokens, under a dollar"
- "10,000 attractions classified in less than 10 minutes"

Vague claims like "significant improvement" or "much faster" should be replaced with actual numbers whenever possible.
