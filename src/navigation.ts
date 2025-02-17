import { getBlogPermalink } from "./utils/permalinks";

export const headerData = {
  links: [
    {
      text: "Blog",
      href: getBlogPermalink(),
    },
  ],
};
