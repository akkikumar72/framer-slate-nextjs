import Link from 'next/link';
import type { ReactNode } from 'react';
import { asset } from '@/lib/assets';
export { Counter, Reveal } from './motion';
export function Arrow() { return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
export function Button({ href, children, variant = 'dark', className = '' }: {
    href: string;
    children: ReactNode;
    variant?: 'dark' | 'outline' | 'blue';
    className?: string;
}) { return <Link className={`button button-${variant} ${className}`} href={href}><span className="button-text">{children}</span><Arrow /></Link>; }
export function SectionLabel({ children }: {
    children: ReactNode;
}) { return <p className="section-label"><span />{children}</p>; }
export function PageIntro({ title, description }: {
    title: string;
    description?: string;
}) { return <header className="page-intro container"><h1>{title}</h1>{description && <p>{description}</p>}</header>; }
export function VideoBlock() { return <div className="video-block"><img src={asset('Naa84TV8rTRyxAz9PuubcrYl4g.jpg')} alt="The Hulio team collaborating in their studio" width="2402" height="1602" loading="lazy"/><a href="https://www.youtube.com/watch?v=Qbt4JJ-3jUc" target="_blank" rel="noreferrer" className="video-play"><span className="play-icon" aria-hidden="true">▶</span><span>Hear from Andy<small>Co-Founder of Hulio Agency</small></span></a></div>; }
const team = [['Jake Miller', 'Product Lead', 'QPQ1yPB9xU4hkNBz5pwxdCi95E.png'], ['Devid Miller', 'UI/UX Designer', 'yK2IDuFgOuCaU9r92smZgGc9afU.png'], ['Liam Reed', 'Marketing Head', 'RWyv9sl0N3Wi92PRqC1ISYt5yUM.png'], ['Alan Begham', 'Frontend Dev', '7jBWOrn15b3peKACmZlC3Da14.png'], ['Windra Kelium', 'Product Designer', 'NfIyL7qYuIOBv1bPjKCKHecKMs.png'], ['Olivia Kethrin', 'Content Writer', '8UBPqshNDzU0slKRbpsEYgjJK2A.png']];
const social = [['YouTube', 'https://youtube.com/', 'BgXUCG014dk4TVCEN9jaHtGi8.svg'], ['Facebook', 'https://facebook.com/', 'C6lPZPzFOVY730nksFLVljZF88.svg'], ['X', 'https://x.com/', 'YoAHYmZlqXI6daDjtTwpGz0A8pE.svg'], ['LinkedIn', 'https://linkedin.com/', 'N9hcBAfeeoQbqPC5iSanYLg.svg']];
export function TeamCard({ index }: {
    index: number;
}) { const [name, role, photo] = team[index]; return <article className="team-card"><div className="team-image"><img src={asset(photo)} alt={name} width="960" height="1024" loading="lazy"/><div className="team-socials">{social.map(([label, url, icon]) => <a key={label} aria-label={`${name} on ${label}`} href={url} target="_blank" rel="noreferrer"><img src={asset(icon)} alt="" width="24" height="24"/></a>)}</div></div><h4>{name}</h4><p>{role}</p></article>; }
export function TeamGrid({ limit = 6 }: {
    limit?: number;
}) { return <div className="team-grid">{team.slice(0, limit).map((person, i) => <TeamCard key={person[0]} index={i}/>)}</div>; }
const ctaImages = ['g3CTapWBdXndGzI5Q7JTzDLSc.png', '1oD9hPC9h5r2tIIDalJhzz79gcQ.png', 'Q3MKYeNjIcQU0JcGUWSWnpdDwA.png', 'VpRMmsIKXydHjb7M2PHGnACJTc.png', 'jUYrrOtoCAT0kbYTOuZCl5xEQI.png', '79uBxSiDgEGQXVqWqTIk5814Iw.png'];
export function BuildCTA() { return <section className="build-cta"><div className="container build-cta-inner">{ctaImages.map((src, i) => <img key={src} className={`cta-image cta-image-${i}`} src={asset(src)} alt="" width="200" height="150" loading="lazy"/>)}<div className="cta-copy"><h2>Let&apos;s Build Something<br />Amazing Together</h2><p>Partner with us to turn your creative ideas into reality.</p><Button href="/hulio/contact" variant="blue">Let&apos;s Start a Project</Button></div></div></section>; }
