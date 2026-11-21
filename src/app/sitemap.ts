import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { site } from "@/lib/site";

const pages = ["", "/about", "/articles", "/publications", "/projects", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}` })),
    ...articles.map((article) => ({ url: `${site.url}/articles/${article.slug}` })),
  ];
}
