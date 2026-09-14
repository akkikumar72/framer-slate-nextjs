'use client';

import { useState } from 'react';
import Link from 'next/link';
import { asset } from '@/lib/assets';
import { blogs, projects, type Blog, type Project } from '@/lib/collections';
import { Arrow, Reveal } from '@/components/shared';
import styles from './collections.module.css';

export function ProjectCard({ project }: { project: Project }) {
  return <Link className={styles.projectCard} href={`/hulio/project-details/${project.slug}`}>
    <div className={styles.projectImage} onPointerMove={event => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`); event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`); }}>
      <img src={asset(project.image)} alt={project.title} width={1120} height={1040} loading="lazy" />
      <div className={styles.projectTags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <span className={styles.projectArrow} aria-hidden="true"><Arrow /></span>
    </div>
    <div className={styles.projectText}>
      <div className={styles.projectMeta}><span>{project.title}</span><i aria-hidden="true" /><span>{project.author}</span></div>
      <h3>{project.title}</h3>
    </div>
  </Link>;
}

export function BlogCard({ blog }: { blog: Blog }) {
  return <Link className={styles.blogCard} href={`/hulio/blog-details/${blog.slug}`}>
    <div className={styles.blogImage}>
      <img src={asset(blog.image)} alt={blog.title} width={720} height={412} loading="lazy" />
      <span className={styles.cardAuthor}><img src={asset(blog.authorImage)} alt={blog.author} width={60} height={60} loading="lazy" /></span>
    </div>
    <div className={styles.blogText}>
      <div><p className={styles.readTime}>{blog.readTime}</p><h3>{blog.title}</h3></div>
      <p>{blog.summary}</p>
    </div>
  </Link>;
}

export function ProjectGrid({ limit = projects.length, loadMore = false }: { limit?: number; loadMore?: boolean }) {
  const [visible, setVisible] = useState(loadMore ? 4 : limit);
  return <><div className={styles.projectGrid}>{projects.slice(0, visible).map(project => <Reveal key={project.slug}><ProjectCard project={project} /></Reveal>)}</div>
    {loadMore && visible < projects.length && <div className={styles.loadMore}><button type="button" onClick={() => setVisible(value => value + 4)}>Load More <Arrow /></button></div>}</>;
}

export function BlogGrid({ limit = blogs.length, loadMore = false, slugs }: { limit?: number; loadMore?: boolean; slugs?: string[] }) {
  const items = slugs ? slugs.map(slug => blogs.find(blog => blog.slug === slug)).filter((blog): blog is Blog => Boolean(blog)) : blogs;
  const [visible, setVisible] = useState(loadMore ? 6 : limit);
  return <><div className={styles.blogGrid}>{items.slice(0, visible).map(blog => <Reveal key={blog.slug}><BlogCard blog={blog} /></Reveal>)}</div>
    {loadMore && visible < items.length && <div className={styles.loadMore}><button type="button" onClick={() => setVisible(value => value + 6)}>Load More <Arrow /></button></div>}</>;
}
