import data from './collection-data.json';

export type RichNode = string | { tag: string; children: RichNode[]; href?: string };
export type Project = {
  slug: string; title: string; author: string; tags: string[]; image: string; description: string;
  overview: RichNode[]; details: { label: string; value: string }[]; context: RichNode[];
  process: { number: string; title: string; text: string }[]; gallery: string[]; result: RichNode[];
};
export type Blog = {
  slug: string; title: string; summary: string; description: string; image: string;
  author: string; authorImage: string; date: string; readTime: string;
  parts: { kind: string; blocks?: RichNode[]; images?: string[] }[]; related: string[];
};
export const projects = data.projects as Project[];
export const blogs = data.blogs as Blog[];
