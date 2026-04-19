import Giscus from "@giscus/react";

interface CommentsProps {
  repo: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
  mapping?: string;
  theme?: string;
  lang?: string;
}

export default function Comments({
  repo,
  repoId,
  category,
  categoryId,
  mapping = "pathname",
  theme = "dark",
  lang = "en",
}: CommentsProps) {
  return (
    <div class="mt-16 pt-8 border-t border-gray-700">
      <h3 class="text-2xl font-bold mb-8 dark:text-white">
        Discussion
      </h3>
      <Giscus
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping={mapping}
        theme={theme}
        lang={lang}
        reactionsEnabled="1"
        emitMetadata="0"
      />
    </div>
  );
}
