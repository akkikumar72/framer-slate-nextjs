import type { Metadata } from 'next';
import { Hero, Testimonials, Pricing, Comparison, FAQ } from '@/components/home';
import { Features, Benefits, HowItWorks, Integrations } from '@/components/landing-sections';
import { BlogPreview } from '@/components/blog';
import { NewsletterCTA, SectionHeading } from '@/components/shared';
export const metadata: Metadata = { alternates: {canonical:'/alytics'} };
export default function AlyticsHome(){return <main id="main-content"><Hero/><Features/><Benefits/><HowItWorks/><Integrations/><Testimonials/><Pricing/><Comparison/><FAQ/><section className="section"><div className="container"><SectionHeading label="Blogs" title="Helpful Insights To Help You Grow" description="Explore our latest articles to help your SaaS product succeed and scale smarter."/><div className="home-blog-preview"><BlogPreview/></div></div></section><NewsletterCTA/></main>}
