import { rewrite } from "@vercel/edge";

export default function middleware(request: Request) {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    return rewrite(new URL("/en", request.url));
  }
}

export const config = { matcher: "/" };
