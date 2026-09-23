import type { Metadata } from "next";
import { ButtonLink, Reveal, Section, SectionHeading } from "@/components/ui";
import {
  About,
  Services,
  Experience,
  Stacks,
} from "@/components/home-sections";
import { FAQ, Testimonials } from "@/components/home-interactions";
import { Contact } from "@/components/contact";
import { asset } from "@/lib/assets";
import { projects } from "@/lib/projects";
export const metadata: Metadata = { alternates: { canonical: "/nue" } };
export default function Home() {
  return (
    <>
      <Section id="hero" className="nue-hero">
        <div className="nue-identity">
          <Reveal name="hero-avatar" scale={0.6} y={0} duration={0.6}>
            <div className="nue-avatar">
              <img
                src={asset("31DUr09z5lA3tZ2uZXQF26YxcU.jpg")}
                alt="Portfolio hero profile image"
                width="54"
                height="54"
              />
            </div>
          </Reveal>
          <div>
            <div className="nue-name">
              <Reveal name="hero-name" delay={0.2} duration={0.4} bounce={0.2}>
                <h1>David Simmons</h1>
              </Reveal>
              <Reveal
                name="hero-checkmark"
                delay={0.2}
                scale={0.5}
                y={0}
                duration={0.6}
              >
                <svg
                  className="nue-verified"
                  viewBox="0 0 17 17"
                  aria-label="Verified"
                >
                  <path
                    fill="#1d9bf0"
                    d="M17 8.5c-.033-1.192-.736-2.264-1.816-2.77.409-1.121.149-2.376-.672-3.242-.866-.821-2.122-1.081-3.242-.671C10.768.734 9.694.029 8.5 0 7.309.031 6.238.735 5.738 1.817c-.55-.202-1.146-.246-1.72-.127-.575.118-1.105.394-1.53.798-.821.866-1.078 2.123-.663 3.242C.742 6.234.035 7.306 0 8.5c.037 1.194.742 2.265 1.825 2.77-.413 1.119-.156 2.375.663 3.242.867.818 2.121 1.078 3.242.672C6.236 16.264 7.308 16.967 8.5 17c1.193-.031 2.266-.734 2.77-1.816 1.118.442 2.392.178 3.242-.672.85-.85 1.114-2.124.672-3.242C16.264 10.764 16.967 9.692 17 8.5ZM7.29 11.983 4.188 8.882l1.17-1.178 1.874 1.874 3.98-4.337 1.219 1.128Z"
                  />
                </svg>
              </Reveal>
            </div>
            <Reveal name="hero-role" delay={0.4} duration={0.6}>
              <p className="nue-role">Web Designer</p>
            </Reveal>
          </div>
        </div>
        <Reveal name="hero-intro" delay={0.6}>
          <p className="nue-intro">
            Crafting interactive, user-centered experiences that bring ideas to
            life through thoughtful design and seamless digital execution.
          </p>
        </Reveal>
        <div className="nue-actions">
          <Reveal name="hero-remix" delay={0.8} scale={0.8} y={0}>
            <ButtonLink
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Next.js
            </ButtonLink>
          </Reveal>
          <Reveal name="hero-works" delay={0.9} duration={1} x={-10} y={0}>
            <ButtonLink variant="light" href="#project">
              View Works
            </ButtonLink>
          </Reveal>
        </div>
      </Section>
      <Section id="project">
        <Reveal name="selected-heading" delay={1.1}>
          <SectionHeading>Selected works</SectionHeading>
        </Reveal>
        <div className="nue-project-list">
          {projects.map(({ slug, title, category, thumbnail }, index) => (
            <Reveal
              name={`project-card-${slug}`}
              scale
              key={slug}
              delay={index === 0 ? 0.2 : 0}
            >
              <a className="nue-project-card" href={`/nue/projects/${slug}`}>
                <div className="nue-project-cover">
                  <img
                    src={asset(thumbnail)}
                    alt={`${title} project cover`}
                    loading={index === 0 ? "eager" : "lazy"}
                    width="1600"
                    height="1120"
                  />
                </div>
                <div className="nue-project-caption">
                  <h3>{title}</h3>
                  <i aria-hidden="true" />
                  <span>{category}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>
      <About />
      <Services />
      <Testimonials />
      <Experience />
      <Stacks />
      <FAQ />
      <Contact />
    </>
  );
}
