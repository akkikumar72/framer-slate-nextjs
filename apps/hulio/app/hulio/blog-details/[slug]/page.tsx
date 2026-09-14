import { notFound } from 'next/navigation';
import { asset } from '@/lib/assets';
import { blogs } from '@/lib/collections';
import { hulioMetadata } from '@/lib/metadata';
import { SectionLabel } from '@/components/shared';
import { BlogGrid } from '@/components/collections/grids';
import { RichContent } from '@/components/collections/rich-content';
import styles from '@/components/collections/collections.module.css';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return blogs.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blog = blogs.find(item => item.slug === slug);
  return blog ? hulioMetadata(blog.title, `/hulio/blog-details/${slug}`, blog.description) : {};
}
export default async function BlogDetail({ params }: Props) {
  const { slug } = await params;
  const blog = blogs.find(item => item.slug === slug);
  if (!blog) notFound();
  return <>
    <article className={`container ${styles.blogDetail}`}>
      <header className={styles.blogTop}><div className={styles.detailIntro}><h1>{blog.title}</h1><p>{blog.description}</p></div><div className={styles.articleMeta}><span className={styles.author}><img src={asset(blog.authorImage)} alt={blog.author} width={40} height={40} />{blog.author}</span><i aria-hidden="true"/><span>{blog.date}</span><i aria-hidden="true"/><span>{blog.readTime}</span></div></header>
      <figure className={styles.blogHero}><img src={asset(blog.image)} alt={blog.title} width={1150} height={560} fetchPriority="high" /></figure>
      <div className={styles.articleBody}>{blog.parts.map((part, index) => part.kind === 'images' ? <div className={styles.articleImages} key={index}>{part.images?.map((image, imageIndex) => <img key={image} src={asset(image)} alt={`${blog.title}, article image ${imageIndex + 1}`} width={369} height={450} loading="lazy" />)}</div> : part.kind === 'quote' ? <blockquote className={styles.quote} key={index}><RichContent blocks={part.blocks ?? []} /></blockquote> : <RichContent key={index} blocks={part.blocks ?? []} />)}</div>
      <div className={styles.share}><span>Share Post:</span><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><img src={asset('C6lPZPzFOVY730nksFLVljZF88.svg')} alt="" width={24} height={24} /></a><a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X"><img src={asset('YoAHYmZlqXI6daDjtTwpGz0A8pE.svg')} alt="" width={24} height={24} /></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><img src={asset('N9hcBAfeeoQbqPC5iSanYLg.svg')} alt="" width={24} height={24} /></a></div>
    </article>
    <section className={styles.related}><div className={styles.relatedHeading}><SectionLabel>Latest New &amp; Blogs</SectionLabel><h2>Related Blog Post</h2></div><BlogGrid limit={3} slugs={blog.related} /></section>
  </>;
}
