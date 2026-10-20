import { blogPosts } from "@/lib/site-data";
import publishedArticles from "./published-articles.json";

export type ArticleBlock = { type: string; text?: string; items?: string[] };
const listingImages = ["xfRqUBEwWre3EugH67J0zW90I.jpg", "Vqnnf2c8TUMDaPweZTzLwKmHec.jpg", "RjA8XHOIA8k7J1fnQYlwcM8FJE.jpg", "snVr8e30vWzyuWwIse849voEUZQ.jpg", "DubX211MjQXoVbiY3wBvbHWIyo.jpg", "detofD77GgrFx4z2p5Hme5s12c.jpg", "EhbPZDnfZ0GPCwniRRydyxCEM.jpg"];

// Published CMS fields override the older seed metadata while retaining the shared route inventory.
export const articles = blogPosts.map((post, index) => {
  const published = publishedArticles.find((article) => article.slug === post.slug)!;
  return { ...post, ...published, image: listingImages[index], blocks: published.blocks as ArticleBlock[] };
});
export type Article = (typeof articles)[number];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
