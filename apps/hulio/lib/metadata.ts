import type { Metadata } from 'next';
export function hulioMetadata(title: string, path: string, description = 'Hulio is a creative digital agency crafting thoughtful brands, digital experiences, and lasting connections.'): Metadata {
    return { title: `${title} | Hulio`, description, alternates: { canonical: path }, openGraph: { title: `${title} | Hulio`, description, url: path, images: ['/hulio/hero-image-U35vkZ36iBOOSSG0KzgO0Ajdm0.png'] } };
}
