import { trim } from "~/utils/utils";

export const trimSlash = (s: string) => trim(trim(s, "/"));

const BASE_PATHNAME = "/";

export const getAsset = (path: string): string =>
  "/" +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");
