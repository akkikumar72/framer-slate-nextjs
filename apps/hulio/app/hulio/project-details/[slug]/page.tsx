import { notFound } from 'next/navigation';
import { asset } from '@/lib/assets';
import { projects } from '@/lib/collections';
import { hulioMetadata } from '@/lib/metadata';
import { Reveal } from '@/components/shared';
import { RichContent } from '@/components/collections/rich-content';
import styles from '@/components/collections/collections.module.css';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return project ? hulioMetadata(project.title, `/hulio/project-details/${slug}`, project.description) : {};
}
export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  return <article className={`container ${styles.projectDetail}`}>
    <header className={styles.detailIntro}><h1>{project.title}</h1><p>{project.description}</p></header>
    <figure className={styles.projectHero}><img src={asset(project.image)} alt={project.title} width={1150} height={660} fetchPriority="high" /><div className={styles.heroTags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></figure>
    <div className={styles.projectBody}>
      <div className={styles.projectOverview}>
        <RichContent blocks={project.overview} />
        <dl className={styles.projectFacts}>{project.details.map(detail => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}</dl>
        <div className={styles.process}><RichContent blocks={project.context} /><div className={styles.processGrid}>{project.process.map(step => <Reveal key={step.number}><section><span>{step.number}</span><h2>{step.title}</h2><p>{step.text}</p></section></Reveal>)}</div></div>
      </div>
      <div className={styles.projectGallery}>{project.gallery.map((image, index) => <img key={image} src={asset(image)} alt={`${project.title}, project view ${index + 1}`} width={index === 0 ? 1000 : 485} height={500} loading="lazy" />)}</div>
      <RichContent blocks={project.result} />
    </div>
  </article>;
}
